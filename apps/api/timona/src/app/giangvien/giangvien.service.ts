import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGiangvienDto } from './dto/create-giangvien.dto';
import { UpdateGiangvienDto } from './dto/update-giangvien.dto';
import { GiangvienEntity } from './entities/giangvien.entity';

@Injectable()
export class GiangvienService {
  constructor(
    @InjectRepository(GiangvienEntity)
    private GiangvienRepository: Repository<GiangvienEntity>
  ) { }
  async create(CreateGiangvienDto: CreateGiangvienDto) {
    this.GiangvienRepository.create(CreateGiangvienDto);
    return await this.GiangvienRepository.save(CreateGiangvienDto);
  }

  async findAll() {
    return await this.GiangvienRepository.find({
      relations: ['Comments', 'Comments.User']
    });
  }

  async findOne(id: string) {
    return await this.GiangvienRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: string, UpdateGiangvienDto: UpdateGiangvienDto) {
    this.GiangvienRepository.save(UpdateGiangvienDto);
    return await this.GiangvienRepository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    await this.GiangvienRepository.delete(id);
    return { deleted: true };
  }
}
