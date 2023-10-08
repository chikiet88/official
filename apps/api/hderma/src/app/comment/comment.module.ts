import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { UsersEntity } from '../users/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity,UsersEntity])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
