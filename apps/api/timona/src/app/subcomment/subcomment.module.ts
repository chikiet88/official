import { Module } from '@nestjs/common';
import { SubcommentService } from './subcomment.service';
import { SubcommentController } from './subcomment.controller';
import { SubcommentEntity } from './entities/subcomment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SubcommentEntity])],

  controllers: [SubcommentController],
  providers: [SubcommentService],
})
export class SubcommentModule {}
