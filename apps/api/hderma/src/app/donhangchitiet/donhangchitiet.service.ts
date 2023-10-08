import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDonhangchitietDto } from './dto/create-donhangchitiet.dto';
import { UpdateDonhangchitietDto } from './dto/update-donhangchitiet.dto';
import { DonhangchitietEntity } from './entities/donhangchitiet.entity';

@Injectable()
export class DonhangchitietService {
  constructor(
    @InjectRepository(DonhangchitietEntity)
    private DonhangchitietRepository: Repository<DonhangchitietEntity>
  ) {}
  async create(CreateDonhangchitietDto: CreateDonhangchitietDto) {
    this.DonhangchitietRepository.create(CreateDonhangchitietDto);
    return await this.DonhangchitietRepository.save(CreateDonhangchitietDto);
  }

  async findAll() {
    return await this.DonhangchitietRepository.find({
    });
  }

  async findOne(id: string) {
    return await this.DonhangchitietRepository.findOne({
      where: { id: id },
      relations:['Product']
    });
  }

  async update(id: string, UpdateDonhangchitietDto: UpdateDonhangchitietDto) {
    this.DonhangchitietRepository.save(UpdateDonhangchitietDto);
    return await this.DonhangchitietRepository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    console.error(id)
    await this.DonhangchitietRepository.delete(id);
    return { deleted: true };
  }
}
