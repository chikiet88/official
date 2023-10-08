import { Module } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { NotifyController } from './notify.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotifyEntity } from './entities/notify.entity';
import { UsersEntity } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotifyEntity,UsersEntity])],
  controllers: [NotifyController],
  providers: [NotifyService]
})
export class NotifyModule {}
