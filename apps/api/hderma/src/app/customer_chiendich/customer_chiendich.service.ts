import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerChiendichDto } from './dto/create-customer_chiendich.dto';
import { UpdateCustomerChiendichDto } from './dto/update-customer_chiendich.dto';
import { CustomerChiendichEntity } from './entities/customer_chiendich.entity';


@Injectable()
export class CustomerChiendichService {
  constructor(
    @InjectRepository(CustomerChiendichEntity)
    private CustomerChiendichRepository: Repository<CustomerChiendichEntity>,
  ) {}
  async create(createCustomerChiendichDto: CreateCustomerChiendichDto) {
    this.CustomerChiendichRepository.create(createCustomerChiendichDto);
    return await this.CustomerChiendichRepository.save(createCustomerChiendichDto);
  }
  async findAll() {
    return await this.CustomerChiendichRepository.find();
  }
  async findByidUser(id: string) {
    return await this.CustomerChiendichRepository.find({where:{idUser:id}});
  }
  async findOne(id: string) {
    return await this.CustomerChiendichRepository.find({where:{id:id}});
  }
  async update(id: string, updateCustomerChiendichDto: UpdateCustomerChiendichDto) {
    await this.CustomerChiendichRepository.update(id,updateCustomerChiendichDto);
    return await this.findAll();
  }
  async remove(id: string) {
    await this.CustomerChiendichRepository.delete(id);
    return { deleted: true };
  }
}
