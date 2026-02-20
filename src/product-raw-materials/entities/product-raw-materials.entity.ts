import { Product } from 'src/products/entities/products.entity';
import { RawMaterial } from 'src/raw-materials/entities/raw-materials.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_raw_materials')
export class ProductRawMaterial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.productRawMaterials, {
    onDelete: 'RESTRICT',
  })
  product: Product;

  @ManyToOne(
    () => RawMaterial,
    (rawMaterial) => rawMaterial.productRawMaterials,
    {
      onDelete: 'RESTRICT',
    },
  )
  rawMaterial: RawMaterial;

  @Column({
    type: 'int',
  })
  quantityRequired: number;
}
