import { Module } from '@nestjs/common';
import { CauhinhChiendichService } from './cauhinh_chiendich.service';
import { CauhinhChiendichController } from './cauhinh_chiendich.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CauhinhChiendichEntity } from './entities/cauhinh_chiendich.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CauhinhChiendichEntity])],
  controllers: [CauhinhChiendichController],
  providers: [CauhinhChiendichService]
})
export class CauhinhChiendichModule {}
