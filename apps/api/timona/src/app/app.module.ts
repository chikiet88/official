import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from 'apps/site/hderma/src/environments/environments';
import { TimonaApiModule } from './timona-api.module';
import { HttpModule } from "@nestjs/axios";
@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot(environment.DB_USERS),
    TypeOrmModule.forRoot(environment.DB_TIMONA),
    TimonaApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
