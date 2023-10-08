import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BaivietModule } from './baiviet/baiviet.module';
import { UsersModule } from './users/users.module';
import { DanhmucModule } from './danhmuc/danhmuc.module';
import { LienheModule } from './lienhe/lienhe.module';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports:[
    AuthModule,
    UsersModule,
    BaivietModule,
    DanhmucModule,
    LienheModule
  ]
})
export class TazagroupModule {}
