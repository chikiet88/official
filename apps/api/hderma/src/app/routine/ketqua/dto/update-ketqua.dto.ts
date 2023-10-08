import { PartialType } from '@nestjs/swagger';
import { CreateKetquaDto } from './create-ketqua.dto';

export class UpdateKetquaDto extends PartialType(CreateKetquaDto) {}
