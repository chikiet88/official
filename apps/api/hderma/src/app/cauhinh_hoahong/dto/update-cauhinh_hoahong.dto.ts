import { PartialType } from '@nestjs/mapped-types';
import { CreateCauhinhHoahongDto } from './create-cauhinh_hoahong.dto';

export class UpdateCauhinhHoahongDto extends PartialType(CreateCauhinhHoahongDto) {}
