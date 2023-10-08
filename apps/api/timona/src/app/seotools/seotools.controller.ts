import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeotoolsService } from './seotools.service';
import { CreateSeotoolDto } from './dto/create-seotool.dto';
import { UpdateSeotoolDto } from './dto/update-seotool.dto';

@Controller('seotools')
export class SeotoolsController {
  constructor(private readonly seotoolsService: SeotoolsService) {}

  @Post()
  create(@Body() createSeotoolDto: CreateSeotoolDto) {
    return this.seotoolsService.create(createSeotoolDto);
  }

  @Get()
  findAll() {
    return this.seotoolsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seotoolsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeotoolDto: UpdateSeotoolDto) {
    return this.seotoolsService.update(+id, updateSeotoolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seotoolsService.remove(+id);
  }
}
