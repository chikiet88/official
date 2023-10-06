import { Injectable } from '@nestjs/common';
import { CreateThongtinchungDto } from './dto/create-thongtinchung.dto';
import { UpdateThongtinchungDto } from './dto/update-thongtinchung.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThongtinchungEntity } from './entities/thongtinchung.entity';
@Injectable()
export class ThongtinchungService {
  constructor(
    @InjectRepository(ThongtinchungEntity)
    private ThongtinchungRepository: Repository<ThongtinchungEntity>
  ) {}
  async create(CreateThongtinchungDto: CreateThongtinchungDto) {
    this.ThongtinchungRepository.create(CreateThongtinchungDto);
    return await this.ThongtinchungRepository.save(CreateThongtinchungDto);
  }

  async findAll() {
    return await this.ThongtinchungRepository.find({

    });
  }
  async findPagina(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return await this.ThongtinchungRepository.findAndCount({ skip, take: limit });
  }
  async findslug(slug: string) {
    return await this.ThongtinchungRepository.findOne({
      where: { Slug: slug },
    });
  }
  async findid(id: any) {
    return await this.ThongtinchungRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: string, UpdateThongtinchungDto: UpdateThongtinchungDto) {
    this.ThongtinchungRepository.save(UpdateThongtinchungDto);
    return await this.ThongtinchungRepository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    await this.ThongtinchungRepository.delete(id);
    return { deleted: true };
  }
}