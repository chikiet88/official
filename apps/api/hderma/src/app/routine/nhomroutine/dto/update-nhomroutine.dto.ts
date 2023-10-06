import { PartialType } from '@nestjs/swagger';
import { CreateNhomroutineDto } from './create-nhomroutine.dto';

export class UpdateNhomroutineDto extends PartialType(CreateNhomroutineDto) {}
