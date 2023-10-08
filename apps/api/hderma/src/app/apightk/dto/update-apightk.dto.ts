import { PartialType } from '@nestjs/mapped-types';
import { CreateApightkDto } from './create-apightk.dto';

export class UpdateApightkDto extends PartialType(CreateApightkDto) {}
