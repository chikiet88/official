import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerChiendichDto } from './create-customer_chiendich.dto';

export class UpdateCustomerChiendichDto extends PartialType(CreateCustomerChiendichDto) {}
