import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from "typeorm";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { CustomerEntity } from "./entities/customer.entity";
import { CustomerDiemEntity } from "../customer_diem/entities/customer_diem.entity";
import { CauhinhHoahongEntity } from "../cauhinh_hoahong/entities/cauhinh_hoahong.entity";
import { DonhangEntity } from "../donhang/entities/donhang.entity";
import { UsersEntity } from "../users/entities/user.entity";
@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private CustomerRepository: Repository<CustomerEntity>,
    @InjectRepository(CustomerDiemEntity)
    private CustomerDiemRepository: Repository<CustomerDiemEntity>,
    @InjectRepository(CauhinhHoahongEntity)
    private CauhinhHoahongRepository: Repository<CauhinhHoahongEntity>,
    @InjectRepository(DonhangEntity)
    private DonhangRepository: Repository<DonhangEntity>,
    @InjectRepository(UsersEntity)
    private UsersRepository: Repository<UsersEntity>,
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    this.CustomerRepository.create(createCustomerDto);
    const result = await this.CustomerRepository.save(createCustomerDto);    
    return result
  }
  async findAll() {
    return await this.CustomerRepository.find();
  }
  async findOne(id: string) {
    return await this.CustomerRepository.findOne({ where: { id: id } });
  }
  async findDiemByidUser(id: string) {
    const Tongdiem = await this.CustomerRepository.findOne({ where: { idUser: id } });
    const Chitiet = await this.CustomerDiemRepository.find({ where: { idUser: id } });
    const Donhangs = await this.DonhangRepository.find({ where: { idKH: id } });
    const donhangMap = new Map(Donhangs.map((item) => [item.id, item]));
    const mappedArray = Chitiet.map((item) => ({
      ...item,
      donhang: donhangMap.get(item.idDonHang)
    }));

    // const Hoahong = await this.CauhinhHoahongRepository.findOne(
    //    {where: {
    //        doanhthutu: LessThan(Tongdiem.TongDiemcap*10000), 
    //        doanhthuden: MoreThan(Tongdiem.TongDiemcap*10000),
    //     }}
    //   );
    // const result = {TongDiemCap:Tongdiem.TongDiemcap,TongDiemqua:Tongdiem.TongDiemqua,ChiTiet:mappedArray,Hoahong:Hoahong}

    // this.Hoahongs = data4
    // this.Level = data4.find(v=>this.Tichdiem.TongDiemcap*10000>=v.doanhthutu &&  this.Tichdiem.TongDiemcap*10000<  v.doanhthuden)
    // this.value = (this.Tichdiem.TongDiemcap/(this.Level.doanhthuden/10000))*100
    //return result
    return 'result'
  }
  async findByidUser(id: string) {
    const User = await this.CustomerRepository.findOne({ where: { idUser: id } });
    const Customs = await this.CustomerRepository.find();
    const Ref = await this.UsersRepository.find({ where: { ref_id: id } });
    const merged = Ref.map(Ref => {
      const userMatch = Customs.find(u => u.idUser == Ref.id);
      return {...Ref,...userMatch};
    });
    const result =  {...User,REF:merged}
    return result
  }
  async update(id: string, data: Partial<UpdateCustomerDto>) {
    await this.CustomerRepository.update({ id }, data);
    return await this.CustomerRepository.findOne({ id });
  }
  async remove(id: string) {
    await this.CustomerRepository.delete({ id });
    return { deleted: true };
  }
}
