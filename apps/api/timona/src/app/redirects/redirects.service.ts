import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRedirectDto } from './dto/create-redirect.dto';
import { UpdateRedirectDto } from './dto/update-redirect.dto';
import { RedirectsEntity } from "./entities/redirect.entity";
@Injectable()
export class RedirectsService {
  constructor(
    @InjectRepository(RedirectsEntity)
    private RedirectRepository: Repository<RedirectsEntity>
  ) {}
  async create(createRedirectDto: CreateRedirectDto) {
    this.RedirectRepository.create(createRedirectDto);
    const result = await this.RedirectRepository.save(createRedirectDto);
    return result
  }
  async findAll() {
    return await this.RedirectRepository.find();
  }
  async findOne(id: any) {
    return await this.RedirectRepository.findOne({ where: { id: id } });
  }
  async findSlug(data: any) {
    return await this.RedirectRepository.findOne({ where: { Oldlink: data.slug } });
  }
  async findByidUser(id: string) {
    return await this.RedirectRepository.findOne({ where: { idUser: id } });
  }
  async update(id: string, data: Partial<UpdateRedirectDto>) {
    await this.RedirectRepository.update({ id }, data);
    return await this.RedirectRepository.findOne({ id });
  }
  async remove(id: string) {
    await this.RedirectRepository.delete({ id });
    return { deleted: true };
  }
} 