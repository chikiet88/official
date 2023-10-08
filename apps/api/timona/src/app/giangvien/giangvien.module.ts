import { Module } from '@nestjs/common';
import { GiangvienService } from './giangvien.service';
import { GiangvienController } from './giangvien.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiangvienEntity } from './entities/giangvien.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GiangvienEntity])],
  controllers: [GiangvienController],
  providers: [GiangvienService]
})
export class GiangvienModule {}
