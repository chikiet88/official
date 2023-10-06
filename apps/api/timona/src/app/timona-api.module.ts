import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BaivietModule } from './baiviet/baiviet.module';
import { DanhmucModule } from './danhmuc/danhmuc.module';
import { GiangvienModule } from './giangvien/giangvien.module';
import { SubcommentModule } from './subcomment/subcomment.module';
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';
import { PageModule } from './page/page.module';
import { PageDetailModule } from './page_detail/page_detail.module';
import { SitemapModule } from './sitemap/sitemap.module';
import { UploaddbModule } from './uploaddb/uploaddb.module';
import { SeotoolsModule } from './seotools/seotools.module';
import { RedirectsModule } from './redirects/redirects.module';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [BaivietModule, 
    DanhmucModule, 
    TicketsModule, 
    GiangvienModule, UsersModule, AuthModule, SubcommentModule, PageModule, PageDetailModule, 
    SitemapModule, UploaddbModule, SeotoolsModule, RedirectsModule
  ],

})
export class TimonaApiModule {}
