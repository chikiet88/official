import { Module } from '@nestjs/common';
import { DanhmucProductService } from './danhmuc-product.service';
import { DanhmucProductController } from './danhmuc-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DanhmucProductEntity } from './entities/danhmuc-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DanhmucProductEntity])],
  controllers: [DanhmucProductController],
  providers: [DanhmucProductService]
})
export class DanhmucProductModule {}
