import { PartialType } from '@nestjs/swagger';
import { CreateRawMaterialsDto } from './create-raw-materials.dto';

export class UpdateRawMaterialsDto extends PartialType(CreateRawMaterialsDto) {}
