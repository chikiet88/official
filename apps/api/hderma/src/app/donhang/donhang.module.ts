import { Module } from '@nestjs/common';
import { DonhangService } from './donhang.service';
import { DonhangController } from './donhang.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonhangEntity } from './entities/donhang.entity';
import { UsersEntity } from '../users/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([DonhangEntity,UsersEntity])],
  controllers: [DonhangController],
  providers: [DonhangService]
})
export class DonhangModule {}
