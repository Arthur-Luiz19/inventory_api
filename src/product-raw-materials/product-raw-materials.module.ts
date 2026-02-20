import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRawMaterial } from './entities/product-raw-materials.entity';
import { ProductRawMaterialsService } from './product-raw-materials.service';
import { ProductRawMaterialsController } from './product-raw-materials.controller';
import { Product } from 'src/products/entities/products.entity';
import { RawMaterial } from 'src/raw-materials/entities/raw-materials.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRawMaterial, Product, RawMaterial]),
  ],
  providers: [ProductRawMaterialsService],
  controllers: [ProductRawMaterialsController],
})
export class ProductRawMaterialsModule {}
