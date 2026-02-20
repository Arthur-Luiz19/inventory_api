import { IsInt, IsUUID, Min } from 'class-validator';

export class CreateProductRawMaterialDto {
  @IsUUID()
  productId: string;

  @IsUUID()
  rawMaterialId: string;

  @IsInt()
  @Min(1)
  quantityRequired: number;
}
