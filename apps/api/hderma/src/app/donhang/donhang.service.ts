import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../product/entities/product.entity';
import { CreateDonhangDto } from './dto/create-donhang.dto';
import { UpdateDonhangDto } from './dto/update-donhang.dto';
import { DonhangEntity } from './entities/donhang.entity';
import { UsersEntity } from '../users/entities/user.entity';

@Injectable()
export class DonhangService {
  constructor(
    @InjectRepository(DonhangEntity)
    private DonhangRepository: Repository<DonhangEntity>,
    @InjectRepository(UsersEntity)
    private UsersRepository: Repository<UsersEntity>,
  ) { }
  async create(createDonhangDto: CreateDonhangDto) {
    this.DonhangRepository.create(createDonhangDto);
    return await this.DonhangRepository.save(createDonhangDto);
  }
  async findAll() {
  const Donhangs =  await this.DonhangRepository.find({
      relations: ['Donhangchitiets', 'Donhangchitiets.Product']
    })
  // const Users =  await this.UsersRepository.find()
  return Donhangs
    // return await this.DonhangRepository.find({
    //   relations: ['Donhangchitiets', 'Donhangchitiets.Product']

    // });
  }
  async findOne(id: string) {
    return await this.DonhangRepository.findOne({
      where: { id: id },
      relations: ['Donhangchitiets', 'Donhangchitiets.Product']
    });
  }
  async findByidKH(id: string) {
    const donhangkh = await this.DonhangRepository.find({
      where: { idKH: id },
      relations: ['Donhangchitiets', 'Donhangchitiets.Product']
    });
    return donhangkh
  }
  // async findByModule(id: string) {
  //   return await this.DonhangRepository.find({ where: { Module: id } });
  // }
  async update(id: string, updateDonhangDto: UpdateDonhangDto) {
    await this.DonhangRepository.update(id, updateDonhangDto);
    return await this.findOne(id)
  }
  async remove(id: string) {
    await this.DonhangRepository.delete(id);
    return { deleted: true };
  }
}
