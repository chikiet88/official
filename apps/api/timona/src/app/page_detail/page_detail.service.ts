import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePageDetailDto } from "./dto/create-page_detail.dto";
import { UpdatePageDetailDto } from "./dto/update-page_detail.dto";
import { PageDetailEntity } from "./entities/page_detail.entity";
@Injectable()
export class PageDetailService {
  constructor(
    @InjectRepository(PageDetailEntity)
    private PageDetailRepository: Repository<PageDetailEntity>
  ) {}
  async create(createPageDetailDto: CreatePageDetailDto) {
    this.PageDetailRepository.create(createPageDetailDto);
    const result = await this.PageDetailRepository.save(createPageDetailDto);
    return result
  }
  async findAll() {
    return await this.PageDetailRepository.find();
  }
  async findOne(id: string) {
    return await this.PageDetailRepository.findOne({ where: { id: id } });
  }
  async findByidUser(id: string) {
    return await this.PageDetailRepository.findOne({ where: { idUser: id } });
  }
  async update(id: string, data: Partial<UpdatePageDetailDto>) {
    await this.PageDetailRepository.update({ id }, data);
    return await this.PageDetailRepository.findOne({ id });
  }
  async remove(id: string) {
    await this.PageDetailRepository.delete({ id });
    return { deleted: true };
  }
} 