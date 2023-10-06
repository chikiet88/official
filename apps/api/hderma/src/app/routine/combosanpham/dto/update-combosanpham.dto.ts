import { PartialType } from '@nestjs/swagger';
import { CreateCombosanphamDto } from './create-combosanpham.dto';

export class UpdateCombosanphamDto extends PartialType(CreateCombosanphamDto) {}
