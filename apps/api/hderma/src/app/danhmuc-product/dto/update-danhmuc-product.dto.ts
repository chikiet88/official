import { PartialType } from '@nestjs/swagger';
import { CreateDanhmucProductDto } from './create-danhmuc-product.dto';

export class UpdateDanhmucProductDto extends PartialType(CreateDanhmucProductDto) {}
