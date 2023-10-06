import { PartialType } from '@nestjs/swagger';
import { CreateDanhmucDto } from './create-danhmuc.dto';

export class UpdateDanhmucDto extends PartialType(CreateDanhmucDto) {}
