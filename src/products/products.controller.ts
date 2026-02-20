import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ProduceProductDto } from './dto/produce-product.dto';
import { ProductionService } from 'src/production/production.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productionService: ProductionService,
  ) {}

  @Post()
  create(@Body() createDto: CreateProductDto) {
    return this.productsService.create(createDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateProductDto) {
    return this.productsService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Get('capacity')
  getProductionCapacity() {
    return this.productionService.getProductionCapacity();
  }

  @Post(':id/produce')
  produce(@Param('id') id: string, @Body() produceDto: ProduceProductDto) {
    return this.productionService.produce(id, produceDto.quantity);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }
}
