import { Module } from '@nestjs/common';
import { RawMaterialsController } from './raw-materials.controller';
import { RawMaterialsService } from './raw-materials.service';
import { RawMaterial } from './entities/raw-materials.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RawMaterial])],
  controllers: [RawMaterialsController],
  providers: [RawMaterialsService],
})
export class RawMaterialsModule {}
