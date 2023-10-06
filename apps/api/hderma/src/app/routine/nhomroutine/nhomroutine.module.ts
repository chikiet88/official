import { Module } from '@nestjs/common';
import { NhomroutineService } from './nhomroutine.service';
import { NhomroutineController } from './nhomroutine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NhomroutineEntity } from './entities/nhomroutine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NhomroutineEntity])],
  controllers: [NhomroutineController],
  providers: [NhomroutineService]
})
export class NhomroutineModule {}
