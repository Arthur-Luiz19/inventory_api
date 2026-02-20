import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const [items, totalItems] = await this.productRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      meta: {
        totalItems,
        totalPages,
        currentPage: page,
      },
    };
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: string) {
    const product = await this.findOne(id);

    return await this.productRepository.remove(product);
  }
}
