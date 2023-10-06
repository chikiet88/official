import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private ProductRepository: Repository<ProductEntity>
  ) {}
  async create(CreateProductDto: CreateProductDto) {
    this.ProductRepository.create(CreateProductDto);
    return await this.ProductRepository.save(CreateProductDto);
  }

  async findAll() {
    return await this.ProductRepository.find(
      {relations:['Danhmuc', 'Tags']}
      );
  }
  async findOne(slug: string) {
    return await this.ProductRepository.findOne({
      where: { Slug: slug },
      relations:['Danhmuc', 'Tags']
    });
  }
  async findid(data: any) {
    return await this.ProductRepository.findOne({
      where: { id: data.id },
      relations:['Danhmuc', 'Tags']
    });
  }
  async update(id: string, UpdateProductDto: UpdateProductDto) {
    this.ProductRepository.save(UpdateProductDto);
    return await this.ProductRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.ProductRepository.delete(id);
    return { deleted: true };
  }
}
