import { ProductRawMaterial } from 'src/product-raw-materials/entities/product-raw-materials.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('raw-materials')
export class RawMaterial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  quantityAvailable: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @OneToMany(
    () => ProductRawMaterial,
    (ProductRawMaterial) => ProductRawMaterial.rawMaterial,
  )
  productRawMaterials: ProductRawMaterial[];
}
