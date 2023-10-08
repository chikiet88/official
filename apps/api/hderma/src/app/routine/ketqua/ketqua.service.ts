import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KetquaEntity } from './entities/ketqua.entity';
import { CreateKetquaDto } from './dto/create-ketqua.dto';
import { UpdateKetquaDto } from './dto/update-ketqua.dto';
@Injectable()
export class KetquaService {
  constructor(
    @InjectRepository(KetquaEntity)
    private ketquaRepository: Repository<KetquaEntity>
  ) {}
  async create(CreateketquaDto: CreateKetquaDto) {
    this.ketquaRepository.create(CreateketquaDto);
    return await this.ketquaRepository.save(CreateketquaDto);
  }

  async findAll() {
    return await this.ketquaRepository.find({

    });
  }
  async findPagina(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return await this.ketquaRepository.findAndCount({ skip, take: limit });
  }
  async findslug(slug: string) {
    return await this.ketquaRepository.findOne({
      where: { Slug: slug },
    });
  }
  async findid(id: any) {
    return await this.ketquaRepository.findOne({
      where: { id: id },
    });
  }
  async findidKH(id: any) {
    return await this.ketquaRepository.findOne({
      where: {
        idKH: id,
        Trangthai: 0
      },
    });
  }
  async findBySDT(SDT: any) {
   const result =  await this.ketquaRepository.find({
      where: {
        SDT: SDT,
        Trangthai: 1
      },
    });    
    return result
  }
  async update(id: string, UpdateketquaDto: UpdateKetquaDto) {
    this.ketquaRepository.save(UpdateketquaDto);
    return await this.ketquaRepository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    await this.ketquaRepository.delete(id);
    return { deleted: true };
  }
}