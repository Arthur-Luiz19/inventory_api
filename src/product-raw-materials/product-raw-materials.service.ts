import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRawMaterial } from './entities/product-raw-materials.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductRawMaterialDto } from './dto/create-product-raw-material.dto';
import { RawMaterial } from 'src/raw-materials/entities/raw-materials.entity';
import { Product } from 'src/products/entities/products.entity';
import { UpdateProductRawMaterialDto } from './dto/update-product-raw-material.dto';

@Injectable()
export class ProductRawMaterialsService {
  constructor(
    @InjectRepository(ProductRawMaterial)
    private readonly productRawMaterialRepository: Repository<ProductRawMaterial>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(RawMaterial)
    private readonly rawMaterialRepository: Repository<RawMaterial>,
  ) {}

  async create(ProductRawDto: CreateProductRawMaterialDto) {
    const product = await this.productRepository.findOne({
      where: { id: ProductRawDto.productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const rawMaterial = await this.rawMaterialRepository.findOne({
      where: { id: ProductRawDto.rawMaterialId },
    });

    if (!rawMaterial) {
      throw new NotFoundException('Raw material not found');
    }

    const exists = await this.productRawMaterialRepository.findOne({
      where: {
        product: { id: ProductRawDto.productId },
        rawMaterial: { id: ProductRawDto.rawMaterialId },
      },
    });

    if (exists) {
      throw new ConflictException('Association already exists');
    }

    const association = this.productRawMaterialRepository.create({
      product,
      rawMaterial,
      quantityRequired: ProductRawDto.quantityRequired,
    });

    return this.productRawMaterialRepository.save(association);
  }

  async findAll() {
    return this.productRawMaterialRepository.find({
      relations: ['product', 'rawMaterial'],
    });
  }

  async findOne(id: string) {
    const association = await this.productRawMaterialRepository.findOne({
      where: { id },
      relations: ['product', 'rawMaterial'],
    });
    if (!association) {
      throw new NotFoundException('Association not found');
    }
    return association;
  }

  async update(id: string, updateDto: UpdateProductRawMaterialDto) {
    const association = await this.findOne(id);
    if (updateDto.quantityRequired !== undefined) {
      if (updateDto.quantityRequired <= 0) {
        throw new BadRequestException('Quantity must be greater than zero');
      }

      association.quantityRequired = updateDto.quantityRequired;
    }

    return this.productRawMaterialRepository.save(association);
  }

  async remove(id: string) {
    const association = await this.findOne(id);

    await this.productRawMaterialRepository.remove(association);

    return {
      message: 'Association removed successfully',
    };
  }

  async findByProduct(productId: string) {
    const data = await this.productRawMaterialRepository.find({
      where: { product: { id: productId } },
      relations: ['product', 'rawMaterial'],
    });

    return {
      success: true,
      timestamp: new Date().toISOString(),
      data,
    };
  }
}
