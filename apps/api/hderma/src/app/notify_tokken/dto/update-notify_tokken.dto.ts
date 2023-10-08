import { PartialType } from '@nestjs/mapped-types';
import { CreateNotifyTokkenDto } from './create-notify_tokken.dto';

export class UpdateNotifyTokkenDto extends PartialType(CreateNotifyTokkenDto) {}
