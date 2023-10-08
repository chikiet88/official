import { Module } from '@nestjs/common';
import { TinhtrangdaService } from './tinhtrangda.service';
import { TinhtrangdaController } from './tinhtrangda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TinhtrangdaEntity } from './entities/tinhtrangda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TinhtrangdaEntity])],
  controllers: [TinhtrangdaController],
  providers: [TinhtrangdaService]
})
export class TinhtrangdaModule {}
