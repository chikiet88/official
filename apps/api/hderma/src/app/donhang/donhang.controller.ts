import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DonhangService } from './donhang.service';
import { CreateDonhangDto } from './dto/create-donhang.dto';
import { UpdateDonhangDto } from './dto/update-donhang.dto';

@Controller('hderma-donhang')
export class DonhangController {
  constructor(private readonly donhangService: DonhangService) {}

  @Post()
  create(@Body() createProductDto: CreateDonhangDto) {
    return this.donhangService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.donhangService.findAll();
  }
  // @Get()
  // async endpointHandler(@Query('madonhang') param1: string) {
  //   console.log(param1);
  // }
  @Get('madonhang/:id')
  async endpointHandler(@Param('id') id: string) {
    return this.donhangService.findByMaDH(id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donhangService.findOne(id);
  }
  @Get('user/:id')
  findbyidKH(@Param('id') id: string) {
    return this.donhangService.findByidKH(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateDonhangDto) {
    return this.donhangService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donhangService.remove(id);
  }
}
