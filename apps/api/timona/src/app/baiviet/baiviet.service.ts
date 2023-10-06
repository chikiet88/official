import { Injectable } from '@nestjs/common';
import { CreateBaivietDto } from './dto/create-baiviet.dto';
import { UpdateBaivietDto } from './dto/update-baiviet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaivietEntity } from './entities/baiviet.entity';
@Injectable()
export class BaivietService {
  constructor(
    @InjectRepository(BaivietEntity)
    private BaivietRepository: Repository<BaivietEntity>
  ) {}

  async getPaginatedProducts(page: number, limit: number): Promise<[any[], number]> {
    const startIndex = (page - 1) * limit;
    const [data, total] = await this.BaivietRepository.findAndCount({
      skip: startIndex,
      take: limit,
    });
    return [data, total];
  }

  async create(CreateBaivietDto: CreateBaivietDto) {
    this.BaivietRepository.create(CreateBaivietDto);
    return await this.BaivietRepository.save(CreateBaivietDto);
  }
  async findAll() {
    return await this.BaivietRepository.find({

    });
  }

  async findOne(slug: string) {
    return await this.BaivietRepository.findOne({
      where: { Slug: slug },
    });
  }

  async update(id: string, UpdateBaivietDto: UpdateBaivietDto) {
    this.BaivietRepository.save(UpdateBaivietDto);
    return await this.BaivietRepository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    await this.BaivietRepository.delete(id);
    return { deleted: true };
  }
}
