import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CauhinhService } from './cauhinh.service';
import { CreateCauhinhDto } from './dto/create-cauhinh.dto';
import { UpdateCauhinhDto } from './dto/update-cauhinh.dto';

@Controller('hderma-cauhinh')
export class CauhinhController {
  constructor(private readonly cauhinhService: CauhinhService) {}

  @Post()
  create(@Body() createCauhinhDto: CreateCauhinhDto) {
    return this.cauhinhService.create(createCauhinhDto);
  }
  @Get()
  findAll() {
    return this.cauhinhService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cauhinhService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCauhinhDto: UpdateCauhinhDto) {
    return this.cauhinhService.update(id, updateCauhinhDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cauhinhService.remove(id);
  }
}
