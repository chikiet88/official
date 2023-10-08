import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerDiemService } from './customer_diem.service';
import { CreateCustomerDiemDto } from './dto/create-customer_diem.dto';
import { UpdateCustomerDiemDto } from './dto/update-customer_diem.dto';

@Controller('hderma-customer-diem')
export class CustomerDiemController {
  constructor(private readonly customerDiemService: CustomerDiemService) {}

  @Post()
  create(@Body() createCustomerDiemDto: CreateCustomerDiemDto) {
    return this.customerDiemService.create(createCustomerDiemDto);
  }

  @Get()
  findAll() {
    return this.customerDiemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerDiemService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDiemDto: UpdateCustomerDiemDto) {
    return this.customerDiemService.update(id, updateCustomerDiemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerDiemService.remove(id);
  }
}
