import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DanhmucService } from './danhmuc.service';
import { CreateDanhmucDto } from './dto/create-danhmuc.dto';
import { UpdateDanhmucDto } from './dto/update-danhmuc.dto';

@Controller('hderma-danhmuc')
export class DanhmucController {
  constructor(private readonly danhmucService: DanhmucService) {}

  @Post()
  create(@Body() createDanhmucDto: CreateDanhmucDto) {
    return this.danhmucService.create(createDanhmucDto);
  }

  @Get()
  findAll() {
    return this.danhmucService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.danhmucService.findOne(id);
  }
  @Post('findid')
  findslug(@Body() data: any) {
    return this.danhmucService.findid(data);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDanhmucDto: UpdateDanhmucDto) {
    return this.danhmucService.update(id, updateDanhmucDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.danhmucService.remove(id);
  }
}
