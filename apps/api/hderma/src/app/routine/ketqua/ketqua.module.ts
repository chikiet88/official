import { Module } from '@nestjs/common';
import { KetquaService } from './ketqua.service';
import { KetquaController } from './ketqua.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KetquaEntity } from './entities/ketqua.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KetquaEntity])],
  controllers: [KetquaController],
  providers: [KetquaService]
})
export class KetquaModule {}
