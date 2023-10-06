import { Module } from '@nestjs/common';
import { VnpayService } from './vnpay.service';
import { VnpayController } from './vnpay.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VnpayEntity } from './entities/vnpay.entity';
import { DonhangModule } from '../donhang/donhang.module';

@Module({
  imports: [DonhangModule,TypeOrmModule.forFeature([VnpayEntity])],
  controllers: [VnpayController],
  providers: [VnpayService]
})
export class VnpayModule {}
