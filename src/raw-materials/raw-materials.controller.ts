import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RawMaterialsService } from './raw-materials.service';
import { CreateRawMaterialsDto } from './dto/create-raw-materials.dto';
import { UpdateRawMaterialsDto } from './dto/update-raw-materials.dto';

@Controller('raw-materials')
export class RawMaterialsController {
  constructor(private readonly rawMaterialsService: RawMaterialsService) {}

  @Post()
  create(@Body() createDto: CreateRawMaterialsDto) {
    return this.rawMaterialsService.create(createDto);
  }

  @Get()
  findAll() {
    return this.rawMaterialsService.findall();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rawMaterialsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateRawMaterialsDto) {
    return this.rawMaterialsService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rawMaterialsService.remove(id);
  }
}
