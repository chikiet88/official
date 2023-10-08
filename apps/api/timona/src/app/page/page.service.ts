import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePageDto } from "./dto/create-page.dto";
import { UpdatePageDto } from "./dto/update-page.dto";
import { PageEntity } from "./entities/page.entity";
@Injectable()
export class PageService {
  constructor(
    @InjectRepository(PageEntity)
    private PageRepository: Repository<PageEntity>
  ) {}
  async create(createPageDto: CreatePageDto) {
    this.PageRepository.create(createPageDto);
    const result = await this.PageRepository.save(createPageDto);
    return result
  }
  async findAll() {
    return await this.PageRepository.find();
  }
  async findOne(id: string) {
    return await this.PageRepository.findOne({ where: { id: id } });
  }
  async findByidUser(id: string) {
    return await this.PageRepository.findOne({ where: { idUser: id } });
  }
  async update(id: string, data: Partial<UpdatePageDto>) {
    await this.PageRepository.update({ id }, data);
    return await this.PageRepository.findOne({ id });
  }
  async remove(id: string) {
    await this.PageRepository.delete({ id });
    return { deleted: true };
  }
} 