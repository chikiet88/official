import { Module } from '@nestjs/common';
import { CustomerChiendichService } from './customer_chiendich.service';
import { CustomerChiendichController } from './customer_chiendich.controller';
import { CustomerChiendichEntity } from './entities/customer_chiendich.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerChiendichEntity])],
  controllers: [CustomerChiendichController],
  providers: [CustomerChiendichService]
})
export class CustomerChiendichModule {}
