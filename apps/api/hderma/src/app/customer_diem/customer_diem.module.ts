import { Module } from '@nestjs/common';
import { CustomerDiemService } from './customer_diem.service';
import { CustomerDiemController } from './customer_diem.controller';
import { CustomerDiemEntity } from './entities/customer_diem.entity';
import { DonhangEntity } from '../donhang/entities/donhang.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerDiemEntity,DonhangEntity,UsersEntity])],
  controllers: [CustomerDiemController],
  providers: [CustomerDiemService]
})
export class CustomerDiemModule {}
