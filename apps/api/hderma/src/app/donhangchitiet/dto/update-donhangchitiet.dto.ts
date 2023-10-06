import { PartialType } from '@nestjs/swagger';
import { CreateDonhangchitietDto } from './create-donhangchitiet.dto';

export class UpdateDonhangchitietDto extends PartialType(CreateDonhangchitietDto) {}
