import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductRawMaterialsService } from './product-raw-materials.service';
import { CreateProductRawMaterialDto } from './dto/create-product-raw-material.dto';
import { UpdateProductRawMaterialDto } from './dto/update-product-raw-material.dto';

@Controller('product-raw-materials')
export class ProductRawMaterialsController {
  constructor(
    private readonly productRawMaterialsService: ProductRawMaterialsService,
  ) {}

  @Post()
  create(@Body() createDto: CreateProductRawMaterialDto) {
    return this.productRawMaterialsService.create(createDto);
  }

  @Get()
  findAll() {
    return this.productRawMaterialsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productRawMaterialsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateProductRawMaterialDto,
  ) {
    return this.productRawMaterialsService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productRawMaterialsService.remove(id);
  }

  @Get('/product/:productId')
  findByProduct(@Param('productId') productId: string) {
    return this.productRawMaterialsService.findByProduct(productId);
  }
}
