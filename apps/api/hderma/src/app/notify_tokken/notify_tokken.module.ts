import { Module } from '@nestjs/common';
import { NotifyTokkenService } from './notify_tokken.service';
import { NotifyTokkenController } from './notify_tokken.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotifyTokkenEntity } from './entities/notify_tokken.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotifyTokkenEntity])],
  controllers: [NotifyTokkenController],
  providers: [NotifyTokkenService]
})
export class NotifyTokkenModule {}
