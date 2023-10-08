import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactEntity } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private ContactRepository: Repository<ContactEntity>
  ) {}
  async create(CreateContactDto: CreateContactDto) {
    this.ContactRepository.create(CreateContactDto);
    return await this.ContactRepository.save(CreateContactDto);
  }

  async findAll() {
    return await this.ContactRepository.find({

    });
  }
  async findOne(id: string) {
    return await this.ContactRepository.findOne({
      where: { id: id },
    });
  }
  async update(id: string, UpdateContactDto: UpdateContactDto) {
    this.ContactRepository.save(UpdateContactDto);
    return await this.ContactRepository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    await this.ContactRepository.delete(id);
    return { deleted: true };
  }
}
