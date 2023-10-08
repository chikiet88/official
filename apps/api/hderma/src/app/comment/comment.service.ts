import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { UsersEntity } from '../users/entities/user.entity';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private CommentRepository: Repository<CommentEntity>,
    @InjectRepository(UsersEntity)
    private UsersRepository: Repository<UsersEntity>
  ) {}
  async create(CreateCommentDto: CreateCommentDto) {
    this.CommentRepository.create(CreateCommentDto);
    return await this.CommentRepository.save(CreateCommentDto);
  }

  async findAll() {
    const comments = await this.CommentRepository.find({
      relations: ['Product'],
    });
    const Users = await this.UsersRepository.find();
    const result = comments.map((v) => {
      const user = Users.find((v1) => v1.id == v.idUser);
      v['Hoten'] = user.Hoten;
      return v;
    });
    return result;
    // return await this.CommentRepository.find({
    //   relations: ['Product', 'User']
    // });
  }

  async findOne(id: string) {
    return await this.CommentRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: string, UpdateCommentDto: UpdateCommentDto) {
    this.CommentRepository.save(UpdateCommentDto);
    return await this.CommentRepository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    await this.CommentRepository.delete(id);
    return { deleted: true };
  }
}
