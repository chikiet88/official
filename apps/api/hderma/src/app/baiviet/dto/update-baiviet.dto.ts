import { PartialType } from '@nestjs/swagger';
import { CreateBaivietDto } from './create-baiviet.dto';

export class UpdateBaivietDto extends PartialType(CreateBaivietDto) {}
