import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCustomerDiemDto } from "./dto/create-customer_diem.dto";
import { UpdateCustomerDiemDto } from "./dto/update-customer_diem.dto";
import { CustomerDiemEntity } from "./entities/customer_diem.entity";
import { DonhangEntity } from "../donhang/entities/donhang.entity";
import { UsersEntity } from "../users/entities/user.entity";
@Injectable()
export class CustomerDiemService {
  constructor(
    @InjectRepository(CustomerDiemEntity)
    private CustomerDiemRepository: Repository<CustomerDiemEntity>,
    @InjectRepository(UsersEntity)
    private UsersRepository: Repository<UsersEntity>,
    @InjectRepository(DonhangEntity)
    private DonhangsRepository: Repository<DonhangEntity>,
  ) {}
  async create(data: CreateCustomerDiemDto) {
    this.CustomerDiemRepository.create(data);
    const result = await this.CustomerDiemRepository.save(data);
    return result
  }
  async findAll() {
    const Diems = await this.CustomerDiemRepository.find();
    const Users = await this.UsersRepository.find();
    const result = Users.map(userObj => {
      const diemElements = Diems.filter(diemObj => diemObj.idUser === userObj.id);
      return {
        ...userObj,
        Diem: diemElements,
      };
    });
    return result
  }
  async findOne(id: string) {
    const Diems = await this.CustomerDiemRepository.find({ where: { idUser: id } });
    const Users = await this.UsersRepository.findOne({ where: { id: id } });
    const Donhangs = await this.DonhangsRepository.find({ where: { idKH: id } });
    const result = Diems.map(v => {
      const ele = Donhangs.find(v2 => v2.id === v.idDonHang);
      return {
        ...v,
        Donhangs: ele,
      };
    });
    Users['Diem'] = result
    return Users
  }
  async update(id: string, data: Partial<UpdateCustomerDiemDto>) {
    await this.CustomerDiemRepository.update({ id }, data);
    return await this.CustomerDiemRepository.findOne({ id });
  }
  async remove(id: string) {
    await this.CustomerDiemRepository.delete({ id });
    return { deleted: true };
  }
}
