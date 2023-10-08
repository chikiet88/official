import { Module } from '@nestjs/common';
import { PhanloaidaService } from './phanloaida.service';
import { PhanloaidaController } from './phanloaida.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhanloaidaEntity } from './entities/phanloaida.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhanloaidaEntity])],
  controllers: [PhanloaidaController],
  providers: [PhanloaidaService]
})
export class PhanloaidaModule {}
