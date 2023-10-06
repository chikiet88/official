import { PartialType } from '@nestjs/swagger';
import { CreateTinhtrangdaDto } from './create-tinhtrangda.dto';

export class UpdateTinhtrangdaDto extends PartialType(CreateTinhtrangdaDto) {}
