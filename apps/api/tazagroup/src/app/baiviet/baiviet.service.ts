import { Injectable } from '@nestjs/common';
import { CreateBaivietDto } from './dto/create-baiviet.dto';
import { UpdateBaivietDto } from './dto/update-baiviet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaivietEntity } from './entities/baiviet.entity';
@Injectable()
export class BaivietService {
  constructor(
    @InjectRepository(BaivietEntity)
    private BaivietRepository: Repository<BaivietEntity>
  ) {}
  async create(CreateBaivietDto: CreateBaivietDto) {
    this.BaivietRepository.create(CreateBaivietDto);
    return await this.BaivietRepository.save(CreateBaivietDto);
  }
  async findAll() {
    return await this.BaivietRepository.find({
      relations:['Danhmuc']
    });
  }
  async findbySlug(slug: string) {
    return await this.BaivietRepository.findOne({
      where: { Slug: slug },
    });
  }
  async findbyId(id: string) {
    return await this.BaivietRepository.findOne({
      where: { id: id },
    });
  }
  async update(id: string, UpdateBaivietDto: UpdateBaivietDto) {
    this.BaivietRepository.save(UpdateBaivietDto);
    return await this.BaivietRepository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    await this.BaivietRepository.delete(id);
    return { deleted: true };
  }
}