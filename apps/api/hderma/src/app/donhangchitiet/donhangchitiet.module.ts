import { Module } from '@nestjs/common';
import { DonhangchitietService } from './donhangchitiet.service';
import { DonhangchitietController } from './donhangchitiet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonhangchitietEntity } from './entities/donhangchitiet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DonhangchitietEntity])],
  controllers: [DonhangchitietController],
  providers: [DonhangchitietService]
})
export class DonhangchitietModule {}
