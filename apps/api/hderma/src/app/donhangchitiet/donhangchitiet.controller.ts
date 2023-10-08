import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DonhangchitietService } from './donhangchitiet.service';
import { CreateDonhangchitietDto } from './dto/create-donhangchitiet.dto';
import { UpdateDonhangchitietDto } from './dto/update-donhangchitiet.dto';

@Controller('hderma-donhangchitiet')
export class DonhangchitietController {
  constructor(private readonly donhangchitietService: DonhangchitietService) {}

  @Post()
  create(@Body() createDonhangchitietDto: CreateDonhangchitietDto) {
    return this.donhangchitietService.create(createDonhangchitietDto);
  }

  @Get()
  findAll() {
    return this.donhangchitietService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donhangchitietService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDonhangchitietDto: UpdateDonhangchitietDto) {
    return this.donhangchitietService.update(id, updateDonhangchitietDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donhangchitietService.remove(id);
  }
}
