import { Module } from '@nestjs/common';
import { PageDetailService } from './page_detail.service';
import { PageDetailController } from './page_detail.controller';
import { PageDetailEntity } from './entities/page_detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([PageDetailEntity])],
  controllers: [PageDetailController],
  providers: [PageDetailService]
})
export class PageDetailModule {}
