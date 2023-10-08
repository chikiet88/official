import { PartialType } from '@nestjs/mapped-types';
import { CreateCauhinhChiendichDto } from './create-cauhinh_chiendich.dto';

export class UpdateCauhinhChiendichDto extends PartialType(CreateCauhinhChiendichDto) {}
