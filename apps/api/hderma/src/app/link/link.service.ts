import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { LinkEntity } from './entities/link.entity';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(LinkEntity)
    private LinkRepository: Repository<LinkEntity>
  ) {}
  async create(CreateLinkDto: CreateLinkDto) {
    this.LinkRepository.create(CreateLinkDto);
    return await this.LinkRepository.save(CreateLinkDto);
  }

  async findAll() {
    return await this.LinkRepository.find({

    });
  }
  async findOne(id: string) {
    return await this.LinkRepository.findOne({
      where: { id: id },
    });
  }
  async update(id: string, UpdateLinkDto: UpdateLinkDto) {
    this.LinkRepository.save(UpdateLinkDto);
    return await this.LinkRepository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    await this.LinkRepository.delete(id);
    return { deleted: true };
  }
}
