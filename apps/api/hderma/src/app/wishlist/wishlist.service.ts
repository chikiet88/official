import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { WishlistEntity } from './entities/wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(WishlistEntity)
    private WishlistRepository: Repository<WishlistEntity>
  ) { }
  async create(CreateWishlistDto: CreateWishlistDto) {
    this.WishlistRepository.create(CreateWishlistDto);
    return await this.WishlistRepository.save(CreateWishlistDto);
  }

  async findAll() {
    return await this.WishlistRepository.find({
    });
  }

  async findOne(id: string) {
    return await this.WishlistRepository.findOne({
      where: { id: id },
      relations: ['Products']
    });
  }

  async update(id: string, UpdateWishlistDto: UpdateWishlistDto) {
    this.WishlistRepository.save(UpdateWishlistDto);
    return await this.WishlistRepository.findOne({ where: { id: id }, relations: ['Products'] });
  }

  async remove(id: string) {
    console.error(id)
    await this.WishlistRepository.delete(id);
    return { deleted: true };
  }
}
