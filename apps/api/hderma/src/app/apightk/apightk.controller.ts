import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApightkService } from './apightk.service';
import { CreateApightkDto } from './dto/create-apightk.dto';
import { UpdateApightkDto } from './dto/update-apightk.dto';

@Controller('hderma-apightk')
export class ApightkController {
  constructor(private readonly apightkService: ApightkService) {}

  @Post()
  create(@Body() createApightkDto: CreateApightkDto) {
    return this.apightkService.create(createApightkDto);
  }
  @Post('phiship')
  getToken(@Body() data: any) {
    return this.apightkService.getphiship(data);
  }
  @Get()
  findAll() {
    return this.apightkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apightkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApightkDto: UpdateApightkDto) {
    return this.apightkService.update(+id, updateApightkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apightkService.remove(+id);
  }
}
