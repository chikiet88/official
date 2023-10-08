import { PartialType } from '@nestjs/swagger';
import { CreateGiangvienDto } from './create-giangvien.dto';

export class UpdateGiangvienDto extends PartialType(CreateGiangvienDto) {}
