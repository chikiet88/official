import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CauhinhHoahongService } from './cauhinh_hoahong.service';
import { CreateCauhinhHoahongDto } from './dto/create-cauhinh_hoahong.dto';
import { UpdateCauhinhHoahongDto } from './dto/update-cauhinh_hoahong.dto';

@Controller('cauhinh-hoahong')
export class CauhinhHoahongController {
  constructor(private readonly cauhinhHoahongService: CauhinhHoahongService) {}

  @Post()
  create(@Body() createCauhinhHoahongDto: CreateCauhinhHoahongDto) {
    return this.cauhinhHoahongService.create(createCauhinhHoahongDto);
  }

  @Get()
  findAll() {
    return this.cauhinhHoahongService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cauhinhHoahongService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCauhinhHoahongDto: UpdateCauhinhHoahongDto) {
    return this.cauhinhHoahongService.update(id, updateCauhinhHoahongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cauhinhHoahongService.remove(id);
  }
}
