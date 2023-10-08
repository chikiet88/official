import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenutypeDto } from './dto/create-menutype.dto';
import { UpdateMenutypeDto } from './dto/update-menutype.dto';
import { MenutypeEntity } from './entities/menutype.entity';

@Injectable()
export class MenutypeService {
  constructor(
    @InjectRepository(MenutypeEntity)
    private MenutypeRepository: Repository<MenutypeEntity>
  ) {}
  async create(CreateMenutypeDto: CreateMenutypeDto) {
    this.MenutypeRepository.create(CreateMenutypeDto);
    return await this.MenutypeRepository.save(CreateMenutypeDto);
  }

  async findAll() {
    return await this.MenutypeRepository.find({
      relations:['Baiviets']
    });
  }

  async findOne(slug: string) {
    return await this.MenutypeRepository.findOne({
      where: { Slug: slug },

    });
  }
  async findid(data: any) {
    return await this.MenutypeRepository.findOne({
      where: { id: data.id },
    });
  }
  async update(id: string, UpdateMenutypeDto: UpdateMenutypeDto) {
    this.MenutypeRepository.save(UpdateMenutypeDto);
    return await this.MenutypeRepository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    console.error(id)
    await this.MenutypeRepository.delete(id);
    return { deleted: true };
  }
}