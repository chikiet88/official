import { PartialType } from '@nestjs/mapped-types';
import { CreateUploaddbDto } from './create-uploaddb.dto';

export class UpdateUploaddbDto extends PartialType(CreateUploaddbDto) {}
