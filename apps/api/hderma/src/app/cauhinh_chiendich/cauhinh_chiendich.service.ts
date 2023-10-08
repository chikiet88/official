import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCauhinhChiendichDto } from './dto/create-cauhinh_chiendich.dto';
import { UpdateCauhinhChiendichDto } from './dto/update-cauhinh_chiendich.dto';
import { CauhinhChiendichEntity } from './entities/cauhinh_chiendich.entity';

@Injectable()
export class CauhinhChiendichService {
  constructor(
    @InjectRepository(CauhinhChiendichEntity)
    private CauhinhChiendichRepository: Repository<CauhinhChiendichEntity>,
  ) {}
  async create(createCauhinhChiendichDto: CreateCauhinhChiendichDto) {
    this.CauhinhChiendichRepository.create(createCauhinhChiendichDto);
    const result = await this.CauhinhChiendichRepository.save(createCauhinhChiendichDto);
    console.error(result);
    return result
  }
  async findAll() {
    return await this.CauhinhChiendichRepository.find();
  }
  async findOne(id: string) {
    return await this.CauhinhChiendichRepository.find({where:{id:id}});
  }
  async update(id: string, updateCauhinhChiendichDto: UpdateCauhinhChiendichDto) {
    await this.CauhinhChiendichRepository.update(id,updateCauhinhChiendichDto);
    return await this.findAll();
  }
  async remove(id: string) {
    await this.CauhinhChiendichRepository.delete(id);
    return { deleted: true };
  }
}
