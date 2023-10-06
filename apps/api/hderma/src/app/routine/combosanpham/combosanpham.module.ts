import { Module } from '@nestjs/common';
import { CombosanphamService } from './combosanpham.service';
import { CombosanphamController } from './combosanpham.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CombosanphamEntity } from './entities/combosanpham.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CombosanphamEntity])],
  controllers: [CombosanphamController],
  providers: [CombosanphamService]
})
export class CombosanphamModule {}
