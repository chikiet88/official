import { Injectable } from '@nestjs/common';
import { CreateSeotoolDto } from './dto/create-seotool.dto';
import { UpdateSeotoolDto } from './dto/update-seotool.dto';

@Injectable()
export class SeotoolsService {
  create(createSeotoolDto: CreateSeotoolDto) {
    return 'This action adds a new seotool';
  }

  findAll() {
    return `This action returns all seotools`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seotool`;
  }

  update(id: number, updateSeotoolDto: UpdateSeotoolDto) {
    return `This action updates a #${id} seotool`;
  }

  remove(id: number) {
    return `This action removes a #${id} seotool`;
  }
}
