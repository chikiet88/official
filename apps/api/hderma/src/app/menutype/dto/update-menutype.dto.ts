import { PartialType } from '@nestjs/swagger';
import { CreateMenutypeDto } from './create-menutype.dto';

export class UpdateMenutypeDto extends PartialType(CreateMenutypeDto) {}
