import { Module } from '@nestjs/common';
import { ThongtinchungService } from './thongtinchung.service';
import { ThongtinchungController } from './thongtinchung.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThongtinchungEntity } from './entities/thongtinchung.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ThongtinchungEntity])],
  controllers: [ThongtinchungController],
  providers: [ThongtinchungService]
})
export class ThongtinchungModule {}
