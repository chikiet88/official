import { Injectable } from '@nestjs/common';
import { CreateCombosanphamDto } from './dto/create-combosanpham.dto';
import { UpdateCombosanphamDto } from './dto/update-combosanpham.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CombosanphamEntity } from './entities/combosanpham.entity';
@Injectable()
export class CombosanphamService {
  constructor(
    @InjectRepository(CombosanphamEntity)
    private CombosanphamRepository: Repository<CombosanphamEntity>
  ) {}
  async create(CreateCombosanphamDto: CreateCombosanphamDto) {
    this.CombosanphamRepository.create(CreateCombosanphamDto);
    return await this.CombosanphamRepository.save(CreateCombosanphamDto);
  }

  async findAll() {
    return await this.CombosanphamRepository.find({

    });
  }
  async findPagina(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return await this.CombosanphamRepository.findAndCount({ skip, take: limit });
  }
  async findslug(slug: string) {
    return await this.CombosanphamRepository.findOne({
      where: { Slug: slug },
    });
  }
  async findid(id: any) {
    return await this.CombosanphamRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: string, UpdateCombosanphamDto: UpdateCombosanphamDto) {
    this.CombosanphamRepository.save(UpdateCombosanphamDto);
    return await this.CombosanphamRepository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    await this.CombosanphamRepository.delete(id);
    return { deleted: true };
  }
}