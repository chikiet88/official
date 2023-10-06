import { PartialType } from '@nestjs/swagger';
import { CreateCauhinhDto } from './create-cauhinh.dto';

export class UpdateCauhinhDto extends PartialType(CreateCauhinhDto) {}
