import { Module } from '@nestjs/common';
import { SitemapService } from './sitemap.service';
import { SitemapController } from './sitemap.controller';
import { SitemapEntity } from './entities/sitemap.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([SitemapEntity])],
  controllers: [SitemapController],
  providers: [SitemapService]
})
export class SitemapModule {}

