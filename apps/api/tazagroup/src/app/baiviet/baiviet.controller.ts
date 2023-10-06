import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BaivietService } from './baiviet.service';
import { CreateBaivietDto } from './dto/create-baiviet.dto';
import { UpdateBaivietDto } from './dto/update-baiviet.dto';

@Controller('tazagroup-baiviet')
export class BaivietController {
  constructor(private readonly baivietService: BaivietService) {}

  @Post()
  create(@Body() createBaivietDto: CreateBaivietDto) {
    return this.baivietService.create(createBaivietDto);
  }

  @Get()
  findAll() {
    return this.baivietService.findAll();
  }
  @Get('slug/:slug')
  findbySlug(@Param('slug') slug: string) {
    return this.baivietService.findbySlug(slug);
  }
  @Get('id/:id')
  findbyId(@Param('id') id: string) {
    return this.baivietService.findbyId(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBaivietDto: UpdateBaivietDto) {
    return this.baivietService.update(id, updateBaivietDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.baivietService.remove(id);
  }
}
