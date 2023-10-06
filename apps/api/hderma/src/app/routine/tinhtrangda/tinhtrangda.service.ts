import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TinhtrangdaEntity } from './entities/tinhtrangda.entity';
import { CreateTinhtrangdaDto } from './dto/create-tinhtrangda.dto';
import { UpdateTinhtrangdaDto } from './dto/update-tinhtrangda.dto';
@Injectable()
export class TinhtrangdaService {
  constructor(
    @InjectRepository(TinhtrangdaEntity)
    private tinhtrangdaRepository: Repository<TinhtrangdaEntity>
  ) {}
  async create(CreatetinhtrangdaDto: CreateTinhtrangdaDto) {
    this.tinhtrangdaRepository.create(CreatetinhtrangdaDto);
    return await this.tinhtrangdaRepository.save(CreatetinhtrangdaDto);
  }

  async findAll() {
    return await this.tinhtrangdaRepository.find();
  }
  async findPagina(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return await this.tinhtrangdaRepository.findAndCount({ skip, take: limit });
  }
  async findslug(slug: string) {
    return await this.tinhtrangdaRepository.findOne({
      where: { Slug: slug },
    });
  }
  async findid(id: any) {
    return await this.tinhtrangdaRepository.findOne({
      where: { id: id },
    });
  }
  async update(id: string, UpdatetinhtrangdaDto: UpdateTinhtrangdaDto) {
    this.tinhtrangdaRepository.save(UpdatetinhtrangdaDto);
    return await this.tinhtrangdaRepository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    await this.tinhtrangdaRepository.delete(id);
    return { deleted: true };
  }
}