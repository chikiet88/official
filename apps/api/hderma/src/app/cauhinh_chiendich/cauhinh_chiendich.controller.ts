import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CauhinhChiendichService } from './cauhinh_chiendich.service';
import { CreateCauhinhChiendichDto } from './dto/create-cauhinh_chiendich.dto';
import { UpdateCauhinhChiendichDto } from './dto/update-cauhinh_chiendich.dto';
@Controller('hderma-cauhinh-chiendich')
export class CauhinhChiendichController {
  constructor(private readonly cauhinhChiendichService: CauhinhChiendichService) {}

  @Post()
  create(@Body() createCauhinhChiendichDto: CreateCauhinhChiendichDto) {
    return this.cauhinhChiendichService.create(createCauhinhChiendichDto);
  }

  @Get()
  findAll() {
    return this.cauhinhChiendichService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cauhinhChiendichService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCauhinhChiendichDto: UpdateCauhinhChiendichDto) {
    return this.cauhinhChiendichService.update(id, updateCauhinhChiendichDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cauhinhChiendichService.remove(id);
  }
}
