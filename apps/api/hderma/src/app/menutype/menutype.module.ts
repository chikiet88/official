import { Module } from '@nestjs/common';
import { MenutypeService } from './menutype.service';
import { MenutypeController } from './menutype.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenutypeEntity } from './entities/menutype.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenutypeEntity])],
  controllers: [MenutypeController],
  providers: [MenutypeService]
})
export class MenutypeModule {}
