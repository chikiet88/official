import { Module } from '@nestjs/common';
import { VnpayService } from './vnpay.service';
import { VnpayController } from './vnpay.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VnpayEntity } from './entities/vnpay.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VnpayEntity])],
  controllers: [VnpayController],
  providers: [VnpayService]
})
export class VnpayModule {}
