import { PartialType } from '@nestjs/mapped-types';
import { CreateSubcommentDto } from './create-subcomment.dto';

export class UpdateSubcommentDto extends PartialType(CreateSubcommentDto) {}
