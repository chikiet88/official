import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubcommentDto } from './dto/create-subcomment.dto';
import { UpdateSubcommentDto } from './dto/update-subcomment.dto';
import { SubcommentEntity } from './entities/subcomment.entity';

@Injectable()
export class SubcommentService {
  constructor(
    @InjectRepository(SubcommentEntity)
    private SubcommentRepository: Repository<SubcommentEntity>
  ) {}
  async create(CreateSubcommentDto: CreateSubcommentDto) {
    this.SubcommentRepository.create(CreateSubcommentDto);
    return await this.SubcommentRepository.save(CreateSubcommentDto);
  }

  async findAll() {
    return await this.SubcommentRepository.find({
    });
  }

  async findOne(id: string) {
    return await this.SubcommentRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: string, UpdateSubcommentDto: UpdateSubcommentDto) {
    this.SubcommentRepository.save(UpdateSubcommentDto);
    return await this.SubcommentRepository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    await this.SubcommentRepository.delete(id);
    return { deleted: true };
  }
}
