import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TazagroupModule } from './tazagroup.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '@taza-base/environments';
import { HttpModule } from "@nestjs/axios";
@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot(environment.DB_TAZAGROUP),
    TazagroupModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
