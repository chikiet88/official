import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LienheService } from './lienhe.service';
import { CreateLienheDto } from './dto/create-lienhe.dto';
import { UpdateLienheDto } from './dto/update-lienhe.dto';

@Controller('tazagroup-lienhe')
export class LienheController {
  constructor(private readonly lienheService: LienheService) {}

  @Post()
  create(@Body() createLienheDto: CreateLienheDto) {
    return this.lienheService.create(createLienheDto);
  }

  @Get()
  findAll() {
    return this.lienheService.findAll();
  }

  @Get('slug/:slug')
  findbySlug(@Param('slug') slug: string) {
    return this.lienheService.findbySlug(slug);
  }
  @Get('id/:id')
  findbyId(@Param('id') id: string) {
    return this.lienheService.findbyId(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLienheDto: UpdateLienheDto) {
    return this.lienheService.update(id, updateLienheDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lienheService.remove(id);
  }
}
