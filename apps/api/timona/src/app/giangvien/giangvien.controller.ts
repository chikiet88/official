import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GiangvienService } from './giangvien.service';
import { CreateGiangvienDto } from './dto/create-giangvien.dto';
import { UpdateGiangvienDto } from './dto/update-giangvien.dto';

@Controller('timona-giangvien')
export class GiangvienController {
  constructor(private readonly giangvienService: GiangvienService) {}

  @Post()
  create(@Body() createGiangvienDto: CreateGiangvienDto) {
    return this.giangvienService.create(createGiangvienDto);
  }

  @Get()
  findAll() {
    return this.giangvienService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.giangvienService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGiangvienDto: UpdateGiangvienDto) {
    return this.giangvienService.update(id, updateGiangvienDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.giangvienService.remove(id);
  }
}
