import { Test, TestingModule } from '@nestjs/testing';
import { ProductionService } from './production.service';
import { DataSource, EntityManager } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('ProductionService', () => {
  let service: ProductionService;

  const mockDataSource: Partial<DataSource> = {
    transaction: jest.fn(),
    getRepository: jest.fn(),
  };

  function mockTransaction(manager: Partial<EntityManager>) {
    return jest
      .fn()
      .mockImplementation(
        async <T>(cb: (manager: EntityManager) => Promise<T>): Promise<T> => {
          return cb(manager as unknown as EntityManager);
        },
      );
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductionService,
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<ProductionService>(ProductionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw NotFoundException if product not found', async () => {
    mockDataSource.transaction = mockTransaction({
      findOne: jest.fn().mockResolvedValue(null),
      find: jest.fn(),
      save: jest.fn(),
    });

    await expect(service.produce('1', 5)).rejects.toThrow(NotFoundException);
  });

  it('should throw BadRequestException if stock is insufficient', async () => {
    const mockProduct = {
      id: '1',
      quantity: 10,
      productRawMaterials: [
        {
          quantityRequired: 2,
          rawMaterial: { id: 'rm1', name: 'Iron' },
        },
      ],
    };

    const mockRawMaterials = [
      {
        id: 'rm1',
        quantityAvailable: 1,
      },
    ];

    mockDataSource.transaction = mockTransaction({
      findOne: jest.fn().mockResolvedValue(mockProduct),
      find: jest.fn().mockResolvedValue(mockRawMaterials),
      save: jest.fn(),
    });

    await expect(service.produce('1', 5)).rejects.toThrow(BadRequestException);
  });

  it('should decrease raw material stock and increase product quantity', async () => {
    const mockProduct = {
      id: '1',
      quantity: 10,
      productRawMaterials: [
        {
          quantityRequired: 2,
          rawMaterial: { id: 'rm1', name: 'Iron' },
        },
      ],
    };

    const mockRawMaterials = [
      {
        id: 'rm1',
        quantityAvailable: 100,
      },
    ];

    const saveMock = jest.fn();

    mockDataSource.transaction = mockTransaction({
      findOne: jest.fn().mockResolvedValue(mockProduct),
      find: jest.fn().mockResolvedValue(mockRawMaterials),
      save: saveMock,
    });

    const result = await service.produce('1', 5);

    expect(mockRawMaterials[0].quantityAvailable).toBe(90);
    expect(mockProduct.quantity).toBe(15);
    expect(saveMock).toHaveBeenCalled();
    expect(result).toEqual({
      message: 'Production completed successfully',
    });
  });

  it('should return 0 capacity if product has no raw materials', async () => {
    const mockProducts = [
      {
        id: '1',
        name: 'Product A',
        productRawMaterials: [],
      },
    ];

    mockDataSource.getRepository = jest.fn().mockReturnValue({
      find: jest.fn().mockResolvedValue(mockProducts),
    });

    const result = await service.getProductionCapacity();

    expect(result[0].maxProducibleQuantity).toBe(0);
  });

  it('should calculate production capacity correctly', async () => {
    const mockProducts = [
      {
        id: '1',
        name: 'Product A',
        productRawMaterials: [
          {
            quantityRequired: 2,
            rawMaterial: { quantityAvailable: 10 },
          },
          {
            quantityRequired: 1,
            rawMaterial: { quantityAvailable: 5 },
          },
        ],
      },
    ];

    mockDataSource.getRepository = jest.fn().mockReturnValue({
      find: jest.fn().mockResolvedValue(mockProducts),
    });

    const result = await service.getProductionCapacity();

    expect(result[0].maxProducibleQuantity).toBe(5);
  });
});
