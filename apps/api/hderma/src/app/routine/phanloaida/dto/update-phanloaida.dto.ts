import { PartialType } from '@nestjs/swagger';
import { CreatePhanloaidaDto } from './create-phanloaida.dto';

export class UpdatePhanloaidaDto extends PartialType(CreatePhanloaidaDto) {}
