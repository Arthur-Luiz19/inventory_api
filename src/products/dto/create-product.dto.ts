import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsInt,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)
  quantity: number;
}
