import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DanhmucProductService } from './danhmuc-product.service';
import { CreateDanhmucProductDto } from './dto/create-danhmuc-product.dto';
import { UpdateDanhmucProductDto } from './dto/update-danhmuc-product.dto';

@Controller('hderma-danhmuc-product')
export class DanhmucProductController {
  constructor(private readonly danhmucProductService: DanhmucProductService) {}

  @Post()
  create(@Body() createDanhmucProductDto: CreateDanhmucProductDto) {
    return this.danhmucProductService.create(createDanhmucProductDto);
  }

  @Get()
  findAll() {
    return this.danhmucProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.danhmucProductService.findOne(id);
  }
  @Post('findid')
  findid(@Body() data: any) {  
    return this.danhmucProductService.findid(data);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDanhmucProductDto: UpdateDanhmucProductDto) {
    return this.danhmucProductService.update(id, updateDanhmucProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.danhmucProductService.remove(id);
  }
}
