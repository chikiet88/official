import { Injectable } from '@nestjs/common';
import { CreateVnpayDto } from './dto/create-vnpay.dto';
import { UpdateVnpayDto } from './dto/update-vnpay.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VnpayEntity } from './entities/vnpay.entity';
@Injectable()
export class VnpayService {
  constructor(
    @InjectRepository(VnpayEntity)
    private VnpayRepository: Repository<VnpayEntity>
  ) {}
  async create(CreateVnpayDto: CreateVnpayDto) {
    this.VnpayRepository.create(CreateVnpayDto);
    return await this.VnpayRepository.save(CreateVnpayDto);
  }

  async findAll() {
    return await this.VnpayRepository.find({

    });
  }
  async findPagina(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return await this.VnpayRepository.findAndCount({ skip, take: limit });
  }
  async findslug(slug: string) {
    return await this.VnpayRepository.findOne({
      where: { Slug: slug },
    });
  }
  async findid(id: any) {
    return await this.VnpayRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: string, UpdateVnpayDto: UpdateVnpayDto) {
    this.VnpayRepository.save(UpdateVnpayDto);
    return await this.VnpayRepository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    await this.VnpayRepository.delete(id);
    return { deleted: true };
  }
}