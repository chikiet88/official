import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NhomroutineEntity } from './entities/nhomroutine.entity';
import { CreateNhomroutineDto } from './dto/create-nhomroutine.dto';
import { UpdateNhomroutineDto } from './dto/update-nhomroutine.dto';
@Injectable()
export class NhomroutineService {
  constructor(
    @InjectRepository(NhomroutineEntity)
    private nhomroutineRepository: Repository<NhomroutineEntity>
  ) {}
  async create(CreatenhomroutineDto: CreateNhomroutineDto) {
    this.nhomroutineRepository.create(CreatenhomroutineDto);
    return await this.nhomroutineRepository.save(CreatenhomroutineDto);
  }

  async findAll() {
    return await this.nhomroutineRepository.find();
  }
  async findPagina(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return await this.nhomroutineRepository.findAndCount({ skip, take: limit });
  }
  async findslug(slug: string) {
    return await this.nhomroutineRepository.findOne({
      where: { Slug: slug },
    });
  }
  async findid(id: any) {
    return await this.nhomroutineRepository.findOne({
      where: { id: id },
    });
  }
  async update(id: string, UpdatenhomroutineDto: UpdateNhomroutineDto) {
    this.nhomroutineRepository.save(UpdatenhomroutineDto);
    return await this.nhomroutineRepository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    await this.nhomroutineRepository.delete(id);
    return { deleted: true };
  }
}