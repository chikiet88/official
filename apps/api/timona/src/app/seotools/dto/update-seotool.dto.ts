import { PartialType } from '@nestjs/mapped-types';
import { CreateSeotoolDto } from './create-seotool.dto';

export class UpdateSeotoolDto extends PartialType(CreateSeotoolDto) {}
