import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuEntity } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private MenuRepository: Repository<MenuEntity>
  ) {}
  async create(CreateMenuDto: CreateMenuDto) {
    this.MenuRepository.create(CreateMenuDto);
    return await this.MenuRepository.save(CreateMenuDto);
  }

  async findAll() {
    return await this.MenuRepository.find({
      relations:['Baiviets']
    });
  }

  async findOne(slug: string) {
    return await this.MenuRepository.findOne({
      where: { Slug: slug },

    });
  }
  async findid(data: any) {
    return await this.MenuRepository.findOne({
      where: { id: data.id },
    });
  }
  async update(id: string, UpdateMenuDto: UpdateMenuDto) {
    this.MenuRepository.save(UpdateMenuDto);
    return await this.MenuRepository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    console.error(id)
    await this.MenuRepository.delete(id);
    return { deleted: true };
  }
}