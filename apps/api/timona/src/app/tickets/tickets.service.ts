import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketEntity } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(TicketEntity)
    private TicketRepository: Repository<TicketEntity>
  ) {}
  async create(CreateTicketDto: CreateTicketDto) {
    this.TicketRepository.create(CreateTicketDto);
    return await this.TicketRepository.save(CreateTicketDto);
  }

  async findAll() {
    return await this.TicketRepository.find({

    });
  }

  async findOne(slug: string) {
    return await this.TicketRepository.findOne({
      where: { Slug: slug },
    });
  }

  async update(id: string, UpdateTicketDto: UpdateTicketDto) {
    this.TicketRepository.save(UpdateTicketDto);
    return await this.TicketRepository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    await this.TicketRepository.delete(id);
    return { deleted: true };
  }
}
