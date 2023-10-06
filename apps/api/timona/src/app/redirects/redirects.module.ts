import { Module } from '@nestjs/common';
import { RedirectsService } from './redirects.service';
import { RedirectsController } from './redirects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedirectsEntity } from './entities/redirect.entity';
@Module({
  imports: [TypeOrmModule.forFeature([RedirectsEntity])],
  controllers: [RedirectsController],
  providers: [RedirectsService]
})
export class RedirectsModule {}
