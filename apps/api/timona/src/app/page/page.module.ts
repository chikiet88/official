import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { PageEntity } from './entities/page.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([PageEntity])],
  controllers: [PageController],
  providers: [PageService]
})
export class PageModule {}
