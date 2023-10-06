import { Injectable } from '@nestjs/common';
import { CreatePhanloaidaDto } from './dto/create-phanloaida.dto';
import { UpdatePhanloaidaDto } from './dto/update-phanloaida.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhanloaidaEntity } from './entities/phanloaida.entity';
@Injectable()
export class PhanloaidaService {
  constructor(
    @InjectRepository(PhanloaidaEntity)
    private PhanloaidaRepository: Repository<PhanloaidaEntity>
  ) {}
  async create(CreatePhanloaidaDto: CreatePhanloaidaDto) {
    this.PhanloaidaRepository.create(CreatePhanloaidaDto);
    return await this.PhanloaidaRepository.save(CreatePhanloaidaDto);
  }

  async findAll() {
    return await this.PhanloaidaRepository.find({

    });
  }
  async findPagina(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return await this.PhanloaidaRepository.findAndCount({ skip, take: limit });
  }
  async findslug(slug: string) {
    return await this.PhanloaidaRepository.findOne({
      where: { Slug: slug },
    });
  }
  async findid(id: any) {
    return await this.PhanloaidaRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: string, UpdatePhanloaidaDto: UpdatePhanloaidaDto) {
    this.PhanloaidaRepository.save(UpdatePhanloaidaDto);
    return await this.PhanloaidaRepository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    await this.PhanloaidaRepository.delete(id);
    return { deleted: true };
  }
}