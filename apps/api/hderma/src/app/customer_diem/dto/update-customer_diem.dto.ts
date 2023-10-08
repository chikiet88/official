import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDiemDto } from './create-customer_diem.dto';

export class UpdateCustomerDiemDto extends PartialType(CreateCustomerDiemDto) {}
