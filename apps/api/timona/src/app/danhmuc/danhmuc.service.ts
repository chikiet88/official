import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDanhmucDto } from './dto/create-danhmuc.dto';
import { UpdateDanhmucDto } from './dto/update-danhmuc.dto';
import { DanhmucEntity } from './entities/danhmuc.entity';

@Injectable()
export class DanhmucService {
  constructor(
    @InjectRepository(DanhmucEntity)
    private DanhmucRepository: Repository<DanhmucEntity>
  ) {}
  async create(CreateDanhmucDto: CreateDanhmucDto) {
    this.DanhmucRepository.create(CreateDanhmucDto);
    return await this.DanhmucRepository.save(CreateDanhmucDto);
  }

  async findAll() {
    return await this.DanhmucRepository.find({
      relations:['Baiviets']
    });
  }

  async findOne(slug: string) {
    return await this.DanhmucRepository.findOne({
      where: { Slug: slug },
    });
  }

  async update(id: string, UpdateDanhmucDto: UpdateDanhmucDto) {
    this.DanhmucRepository.save(UpdateDanhmucDto);
    return await this.DanhmucRepository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    console.error(id)
    await this.DanhmucRepository.delete(id);
    return { deleted: true };
  }
}
