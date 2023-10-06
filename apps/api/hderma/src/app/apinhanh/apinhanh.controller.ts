import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApinhanhService } from './apinhanh.service';
import { CreateApinhanhDto } from './dto/create-apinhanh.dto';
import { UpdateApinhanhDto } from './dto/update-apinhanh.dto';

@Controller('apinhanh')
export class ApinhanhController {
  constructor(private readonly apinhanhService: ApinhanhService) {}

  @Post()
  create(@Body() createApinhanhDto: CreateApinhanhDto) {
    return this.apinhanhService.create(createApinhanhDto);
  }
  @Post('gettoken')
  getToken(@Body() data: any) {
    console.error(data);
    return this.apinhanhService.getToken(data);
  }
  @Post('getsanpham')
  getSanpham(@Body() data: any) {
    console.error(data);
    return this.apinhanhService.getSanpham(data);
  }

  @Get()
  findAll() {
    return this.apinhanhService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apinhanhService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApinhanhDto: UpdateApinhanhDto) {
    return this.apinhanhService.update(+id, updateApinhanhDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apinhanhService.remove(+id);
  }
}
