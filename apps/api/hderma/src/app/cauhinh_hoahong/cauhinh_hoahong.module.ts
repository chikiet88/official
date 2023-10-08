import { Module } from '@nestjs/common';
import { CauhinhHoahongService } from './cauhinh_hoahong.service';
import { CauhinhHoahongController } from './cauhinh_hoahong.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CauhinhHoahongEntity } from './entities/cauhinh_hoahong.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CauhinhHoahongEntity])],
  controllers: [CauhinhHoahongController],
  providers: [CauhinhHoahongService]
})
export class CauhinhHoahongModule {}
