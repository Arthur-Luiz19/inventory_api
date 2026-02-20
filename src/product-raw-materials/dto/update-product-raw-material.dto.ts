import { PartialType } from '@nestjs/swagger';
import { CreateProductRawMaterialDto } from './create-product-raw-material.dto';

export class UpdateProductRawMaterialDto extends PartialType(
  CreateProductRawMaterialDto,
) {}
