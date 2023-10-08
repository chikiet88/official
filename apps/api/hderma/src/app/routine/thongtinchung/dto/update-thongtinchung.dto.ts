import { PartialType } from '@nestjs/swagger';
import { CreateThongtinchungDto } from './create-thongtinchung.dto';

export class UpdateThongtinchungDto extends PartialType(CreateThongtinchungDto) {}
