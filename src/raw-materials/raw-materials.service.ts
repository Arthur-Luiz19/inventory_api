import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RawMaterial } from './entities/raw-materials.entity';
import { Repository } from 'typeorm';
import { CreateRawMaterialsDto } from './dto/create-raw-materials.dto';
import { UpdateRawMaterialsDto } from './dto/update-raw-materials.dto';

@Injectable()
export class RawMaterialsService {
  constructor(
    @InjectRepository(RawMaterial)
    private readonly rawMaterialRepository: Repository<RawMaterial>,
  ) {}

  async create(createDto: CreateRawMaterialsDto) {
    const existing = await this.rawMaterialRepository.findOneBy({
      name: createDto.name,
    });

    if (existing) {
      throw new ConflictException('Raw material already exists');
    }

    const rawMaterial = this.rawMaterialRepository.create(createDto);
    return await this.rawMaterialRepository.save(rawMaterial);
  }

  async findall() {
    return await this.rawMaterialRepository.find();
  }

  async findOne(id: string) {
    const rawMaterial = await this.rawMaterialRepository.findOne({
      where: { id },
    });

    if (!rawMaterial) {
      throw new NotFoundException('Raw material not found');
    }
    return rawMaterial;
  }

  async update(id: string, updateDto: UpdateRawMaterialsDto) {
    const rawMaterial = await this.findOne(id);

    if (updateDto.name && updateDto.name !== rawMaterial.name) {
      const existing = await this.rawMaterialRepository.findOne({
        where: { name: updateDto.name },
      });

      if (existing) {
        throw new ConflictException(
          'Raw material with this name already exists',
        );
      }
    }
    Object.assign(rawMaterial, updateDto);
    return await this.rawMaterialRepository.save(rawMaterial);
  }

  async remove(id: string) {
    const rawMaterial = await this.findOne(id);
    return await this.rawMaterialRepository.remove(rawMaterial);
  }
}
