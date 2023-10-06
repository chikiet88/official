import { PartialType } from '@nestjs/swagger';
import { CreateLienheDto } from './create-lienhe.dto';

export class UpdateLienheDto extends PartialType(CreateLienheDto) {}
