import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCauhinhDto } from './dto/create-cauhinh.dto';
import { UpdateCauhinhDto } from './dto/update-cauhinh.dto';
import { CauhinhEntity } from './entities/cauhinh.entity';

@Injectable()
export class CauhinhService {
  constructor(
    @InjectRepository(CauhinhEntity)
    private CauhinhRepository: Repository<CauhinhEntity>,
  ) {}
  async create(createCauhinhDto: CreateCauhinhDto) {
    this.CauhinhRepository.create(createCauhinhDto);
    return await this.CauhinhRepository.save(createCauhinhDto);
  }
  async findAll() {
    return await this.CauhinhRepository.find();
  }
  async findOne(id: string) {
    return await this.CauhinhRepository.findOne({where:{id:id}});
  }
  async update(id: string, updateCauhinhDto: UpdateCauhinhDto) {
    await this.CauhinhRepository.update(id,updateCauhinhDto);
    return await this.findAll();
  }
  async remove(id: string) {
    await this.CauhinhRepository.delete(id);
    return { deleted: true };
  }
}
