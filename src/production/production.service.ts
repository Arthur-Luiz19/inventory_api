import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from 'src/products/entities/products.entity';
import { RawMaterial } from 'src/raw-materials/entities/raw-materials.entity';
import { DataSource, EntityManager, In } from 'typeorm';
import { ProductionCapacity } from './dto/production-capacity.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductionService {
  constructor(private readonly dataSource: DataSource) {}

  async produce(productId: string, quantity: number) {
    return this.dataSource.transaction(async (manager) => {
      const product = await this.loadProduct(manager, productId);

      const rawMaterials = await this.lockRawMaterials(manager, product);

      this.validateStock(product, rawMaterials, quantity);

      await this.decreaseStock(manager, product, rawMaterials, quantity);

      product.quantity += quantity;
      await manager.save(product);

      return { message: 'Production completed successfully' };
    });
  }

  private async loadProduct(manager: EntityManager, productId: string) {
    const product = await manager.findOne(Product, {
      where: { id: productId },
      relations: ['productRawMaterials', 'productRawMaterials.rawMaterial'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (!product.productRawMaterials.length) {
      throw new BadRequestException('Product has no raw materials associated');
    }

    return product;
  }

  private async lockRawMaterials(manager: EntityManager, product: Product) {
    const ids = product.productRawMaterials.map((item) => item.rawMaterial.id);

    return manager.find(RawMaterial, {
      where: { id: In(ids) },
      lock: { mode: 'pessimistic_write' },
    });
  }

  private validateStock(
    product: Product,
    rawMaterials: RawMaterial[],
    quantity: number,
  ) {
    const map = new Map(rawMaterials.map((rm) => [rm.id, rm]));

    for (const item of product.productRawMaterials) {
      const rawMaterial = map.get(item.rawMaterial.id);
      const required = item.quantityRequired * quantity;

      if (!rawMaterial || rawMaterial.quantityAvailable < required) {
        throw new BadRequestException(
          `Insufficient stock for ${item.rawMaterial.name}`,
        );
      }
    }
  }

  private async decreaseStock(
    manager: EntityManager,
    product: Product,
    rawMaterials: RawMaterial[],
    quantity: number,
  ) {
    const map = new Map(rawMaterials.map((rm) => [rm.id, rm]));

    for (const item of product.productRawMaterials) {
      const rawMaterial = map.get(item.rawMaterial.id);
      const required = item.quantityRequired * quantity;

      if (!rawMaterial) {
        throw new BadRequestException(
          'Raw material not found during production',
        );
      }

      rawMaterial.quantityAvailable -= required;
    }

    await manager.save(rawMaterials);
  }

  async getProductionCapacity(): Promise<ProductionCapacity[]> {
    const products = await this.dataSource.getRepository(Product).find({
      relations: ['productRawMaterials', 'productRawMaterials.rawMaterial'],
    });

    return products.map((product) => {
      if (
        !product.productRawMaterials ||
        product.productRawMaterials.length === 0
      ) {
        return {
          productId: product.id,
          productName: product.name,
          maxProducibleQuantity: 0,
        };
      }

      const capacities = product.productRawMaterials
        .map((item) => {
          if (!item.rawMaterial) {
            console.warn(
              `⚠️ RawMaterial não encontrada para productRawMaterial ID: ${item.id}`,
            );
            return Infinity;
          }

          const available = item.rawMaterial.quantityAvailable ?? 0;
          const required = item.quantityRequired ?? 1;

          if (required === 0) return Infinity;

          return Math.floor(available / required);
        })
        .filter((c) => c !== Infinity);

      const maxProducibleQuantity =
        capacities.length > 0 ? Math.min(...capacities) : 0;

      return plainToInstance(
        ProductionCapacity,
        {
          productId: product.id,
          productName: product.name,
          maxProducibleQuantity,
        },
        {
          excludeExtraneousValues: true,
        },
      );
    });
  }
}
