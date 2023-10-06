import { Module } from '@nestjs/common';
import { BaivietService } from './baiviet.service';
import { BaivietController } from './baiviet.controller';
import { BaivietEntity } from './entities/baiviet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([BaivietEntity])],
  controllers: [BaivietController],
  providers: [BaivietService]
})
export class BaivietModule {}
