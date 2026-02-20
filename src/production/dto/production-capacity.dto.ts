import { Expose } from 'class-transformer';

export class ProductionCapacity {
  @Expose()
  productId: string;

  @Expose()
  productName: string;

  @Expose()
  maxProducibleQuantity: number;
}
