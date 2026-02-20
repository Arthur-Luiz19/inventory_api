import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateRawMaterialsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  quantityAvailable: number;
}
