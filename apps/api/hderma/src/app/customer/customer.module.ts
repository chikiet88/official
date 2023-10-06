import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { CauhinhHoahongEntity } from '../cauhinh_hoahong/entities/cauhinh_hoahong.entity';
import { CustomerDiemEntity } from '../customer_diem/entities/customer_diem.entity';
import { DonhangEntity } from '../donhang/entities/donhang.entity';
import { UsersEntity } from '../users/entities/user.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerEntity,CauhinhHoahongEntity,CustomerDiemEntity,DonhangEntity,UsersEntity]),
],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
