import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from "@nestjs/axios";
import { Hdermav2ApiModule } from './hdermav2-api.module';
import { environment } from 'apps/site/hderma/src/environments/environments';
@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot(environment.DB_USERS),
    TypeOrmModule.forRoot(environment.DB_HDERMA),
    Hdermav2ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
