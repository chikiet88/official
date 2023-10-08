import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDanhmucProductDto } from './dto/create-danhmuc-product.dto';
import { UpdateDanhmucProductDto } from './dto/update-danhmuc-product.dto';
import { DanhmucProductEntity } from './entities/danhmuc-product.entity';

@Injectable()
export class DanhmucProductService {
  constructor(
    @InjectRepository(DanhmucProductEntity)
    private DanhmucProductRepository: Repository<DanhmucProductEntity>
  ) {}
  async create(CreateDanhmucProductDto: CreateDanhmucProductDto) {
    this.DanhmucProductRepository.create(CreateDanhmucProductDto);
    return await this.DanhmucProductRepository.save(CreateDanhmucProductDto);
  }

  async findAll() {
    return await this.DanhmucProductRepository.find({
      relations:['Products']

    });
  }

  async findOne(slug: string) {
    return await this.DanhmucProductRepository.findOne({
      where: { Slug: slug },
      relations:['Products']

    });
  }
  async findid(data: any) {
    return await this.DanhmucProductRepository.findOne({
      where: { id: data.id },
    });
  }
  async update(id: string, UpdateDanhmucProductDto: UpdateDanhmucProductDto) {
    this.DanhmucProductRepository.save(UpdateDanhmucProductDto);
    return await this.DanhmucProductRepository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    console.error(id)
    await this.DanhmucProductRepository.delete(id);
    return { deleted: true };
  }
}
