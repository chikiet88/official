import { Injectable } from '@nestjs/common';
import { CreateLienheDto } from './dto/create-lienhe.dto';
import { UpdateLienheDto } from './dto/update-lienhe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LienheEntity } from './entities/lienhe.entity';
@Injectable()
export class LienheService {
  constructor(
    @InjectRepository(LienheEntity)
    private LienheRepository: Repository<LienheEntity>
  ) {}
  async create(CreateLienheDto: CreateLienheDto) {
    this.LienheRepository.create(CreateLienheDto);
    return await this.LienheRepository.save(CreateLienheDto);
  }
  async findAll() {
    return await this.LienheRepository.find();
  }
  async findbySlug(slug: string) {
    return await this.LienheRepository.findOne({
      where: { Slug: slug },
    });
  }
  async findbyId(id: string) {
    return await this.LienheRepository.findOne({
      where: { id: id },
    });
  }
  async update(id: string, UpdateLienheDto: UpdateLienheDto) {
    this.LienheRepository.save(UpdateLienheDto);
    return await this.LienheRepository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    await this.LienheRepository.delete(id);
    return { deleted: true };
  }
}