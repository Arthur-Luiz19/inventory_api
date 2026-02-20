import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionModule } from 'src/production/production.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ProductionModule],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
