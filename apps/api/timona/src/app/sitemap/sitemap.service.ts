import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSitemapDto } from "./dto/create-sitemap.dto";
import { UpdateSitemapDto } from "./dto/update-sitemap.dto";
import { SitemapEntity } from "./entities/sitemap.entity";
@Injectable()
export class SitemapService {
  constructor(
    @InjectRepository(SitemapEntity)
    private SitemapRepository: Repository<SitemapEntity>
  ) {}
  async create(createSitemapDto: CreateSitemapDto) {
    this.SitemapRepository.create(createSitemapDto);
    const result = await this.SitemapRepository.save(createSitemapDto);
    return result
  }
  async findAll() {
    return await this.SitemapRepository.find();
  }
  async findOne(id: string) {
    return await this.SitemapRepository.findOne({ where: { id: id } });
  }
  async findByidUser(id: string) {
    return await this.SitemapRepository.findOne({ where: { idUser: id } });
  }
  async update(id: string, data: Partial<UpdateSitemapDto>) {
    await this.SitemapRepository.update({ id }, data);
    return await this.SitemapRepository.findOne({ id });
  }
  async remove(id: string) {
    await this.SitemapRepository.delete({ id });
    return { deleted: true };
  }
} 
