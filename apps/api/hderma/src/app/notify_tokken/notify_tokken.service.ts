import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateNotifyTokkenDto } from "./dto/create-notify_tokken.dto";
import { UpdateNotifyTokkenDto } from "./dto/update-notify_tokken.dto";
import { NotifyTokkenEntity } from "./entities/notify_tokken.entity";
@Injectable()
export class NotifyTokkenService {
  constructor(
    @InjectRepository(NotifyTokkenEntity)
    private NotifyTokkenRepository: Repository<NotifyTokkenEntity>,
  ) {}
  async create(createNotifyTokkenDto: CreateNotifyTokkenDto) {
    this.NotifyTokkenRepository.create(createNotifyTokkenDto);
    const result = await this.NotifyTokkenRepository.save(createNotifyTokkenDto);
    return result
  }
  async findAll() {
    return await this.NotifyTokkenRepository.find();
  }
  async findOne(id: string) {
    return await this.NotifyTokkenRepository.findOne({ where: { id: id } });
  }
  async findByidUser(id: string) {
    return await this.NotifyTokkenRepository.find({ where: { idUser: id } });
  }
  async update(id: string, data: Partial<UpdateNotifyTokkenDto>) {
    await this.NotifyTokkenRepository.update({ id }, data);
    return await this.NotifyTokkenRepository.findOne({ id });
  }
  async remove(id: string) {
    await this.NotifyTokkenRepository.delete({ id });
    return { deleted: true };
  }
}  