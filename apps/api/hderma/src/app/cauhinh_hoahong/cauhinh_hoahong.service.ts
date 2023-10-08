import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCauhinhHoahongDto } from './dto/create-cauhinh_hoahong.dto';
import { UpdateCauhinhHoahongDto } from './dto/update-cauhinh_hoahong.dto';
import { CauhinhHoahongEntity } from './entities/cauhinh_hoahong.entity';

@Injectable()
export class CauhinhHoahongService {
  constructor(
    @InjectRepository(CauhinhHoahongEntity)
    private CauhinhHoahongRepository: Repository<CauhinhHoahongEntity>,
  ) {}
  async create(createCauhinhHoahongDto: CreateCauhinhHoahongDto) {
    this.CauhinhHoahongRepository.create(createCauhinhHoahongDto);
    return await this.CauhinhHoahongRepository.save(createCauhinhHoahongDto);
  }
  async findAll() {
    return await this.CauhinhHoahongRepository.find();
  }
  async findOne(id: string) {
    return await this.CauhinhHoahongRepository.find({where:{id:id}});
  }
  async update(id: string, updateCauhinhHoahongDto: UpdateCauhinhHoahongDto) {
    await this.CauhinhHoahongRepository.update(id,updateCauhinhHoahongDto);
    return await this.findAll();
  }
  async remove(id: string) {
    await this.CauhinhHoahongRepository.delete(id);
    return { deleted: true };
  }
}
