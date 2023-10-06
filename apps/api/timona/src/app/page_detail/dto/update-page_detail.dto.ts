import { PartialType } from '@nestjs/mapped-types';
import { CreatePageDetailDto } from './create-page_detail.dto';

export class UpdatePageDetailDto extends PartialType(CreatePageDetailDto) {}
