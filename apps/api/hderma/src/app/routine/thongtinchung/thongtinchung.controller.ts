import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ThongtinchungService } from './thongtinchung.service';
import { CreateThongtinchungDto } from './dto/create-thongtinchung.dto';
import { UpdateThongtinchungDto } from './dto/update-thongtinchung.dto';

@Controller('hderma-thongtinchung')
export class ThongtinchungController {
  constructor(private readonly thongtinchungService: ThongtinchungService) {}

  @Post()
  create(@Body() createThongtinchungDto: CreateThongtinchungDto) {
    return this.thongtinchungService.create(createThongtinchungDto);
  }

  @Get()
  findAll() {
    return this.thongtinchungService.findAll();
  }
  @Get('pagina')
  findPagina(@Query('page') page: number, @Query('limit') limit: number) {
    console.error();
    return this.thongtinchungService.findPagina(page,limit);
  }
  @Get('findslug/:slug')
  findslug(@Param('slug') slug: string) {
    return this.thongtinchungService.findslug(slug);
  }
  @Get('findid/:id')
  findid(@Param('id') id: any) {    
    return this.thongtinchungService.findid(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThongtinchungDto: UpdateThongtinchungDto) {
    return this.thongtinchungService.update(id, updateThongtinchungDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.thongtinchungService.remove(id);
  }
}
