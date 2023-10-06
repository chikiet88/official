import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerChiendichService } from './customer_chiendich.service';
import { CreateCustomerChiendichDto } from './dto/create-customer_chiendich.dto';
import { UpdateCustomerChiendichDto } from './dto/update-customer_chiendich.dto';

@Controller('hderma-customer-chiendich')
export class CustomerChiendichController {
  constructor(private readonly customerChiendichService: CustomerChiendichService) {}

  @Post()
  create(@Body() createCustomerChiendichDto: CreateCustomerChiendichDto) {
    return this.customerChiendichService.create(createCustomerChiendichDto);
  }

  @Get()
  findAll() {
    return this.customerChiendichService.findAll();
  }

  @Get('user/:id')
  findByidUser(@Param('id') id: string) {
    return this.customerChiendichService.findByidUser(id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerChiendichService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerChiendichDto: UpdateCustomerChiendichDto) {
    return this.customerChiendichService.update(id, updateCustomerChiendichDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerChiendichService.remove(id);
  }
}
