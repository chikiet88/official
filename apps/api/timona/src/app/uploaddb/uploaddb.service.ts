import { Injectable } from '@nestjs/common';
import { CreateUploaddbDto } from './dto/create-uploaddb.dto';
import { UpdateUploaddbDto } from './dto/update-uploaddb.dto';

@Injectable()
export class UploaddbService {
  create(createUploaddbDto: CreateUploaddbDto) {
    return 'This action adds a new uploaddb';
  }

  findAll() {
    return `This action returns all uploaddb`;
  }

  findOne(id: number) {
    return `This action returns a #${id} uploaddb`;
  }

  update(id: number, updateUploaddbDto: UpdateUploaddbDto) {
    return `This action updates a #${id} uploaddb`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploaddb`;
  }
}
