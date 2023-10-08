import { PartialType } from '@nestjs/mapped-types';
import { CreateApinhanhDto } from './create-apinhanh.dto';

export class UpdateApinhanhDto extends PartialType(CreateApinhanhDto) {}
