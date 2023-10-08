import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagEntity } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagEntity)
    private TagRepository: Repository<TagEntity>
  ) {}
  async create(CreateTagDto: CreateTagDto) {
    this.TagRepository.create(CreateTagDto);
    return await this.TagRepository.save(CreateTagDto);
  }

  async findAll() {
    return await this.TagRepository.find({
      //relations:['Products', 'Products.Danhmuc'],
    });
  }
  async findAllWithProducts() {
    return await this.TagRepository.find({
      relations:['Products', 'Products.Danhmuc'],
    });
  }
  async findOne(id: string) {
    return await this.TagRepository.findOne({
      where: { id: id },
    });
  }
  async update(id: string, UpdateTagDto: UpdateTagDto) {
    this.TagRepository.save(UpdateTagDto);
    return await this.TagRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    await this.TagRepository.delete(id);
    return { deleted: true };
  }
}
