import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NhomroutineService } from './nhomroutine.service';
import { CreateNhomroutineDto } from './dto/create-nhomroutine.dto';
import { UpdateNhomroutineDto } from './dto/update-nhomroutine.dto';

@Controller('hderma-nhomroutine')
export class NhomroutineController {
  constructor(private readonly nhomroutineService: NhomroutineService) {}

  @Post()
  create(@Body() createNhomroutineDto: CreateNhomroutineDto) {
    return this.nhomroutineService.create(createNhomroutineDto);
  }

  @Get()
  findAll() {
    return this.nhomroutineService.findAll();
  }
  @Get('pagina')
  findPagina(@Query('page') page: number, @Query('limit') limit: number) {
    console.error();
    return this.nhomroutineService.findPagina(page,limit);
  }
  @Get('findslug/:slug')
  findslug(@Param('slug') slug: string) {
    return this.nhomroutineService.findslug(slug);
  }
  @Get('findid/:id')
  findid(@Param('id') id: any) {    
    return this.nhomroutineService.findid(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNhomroutineDto: UpdateNhomroutineDto) {
    return this.nhomroutineService.update(id, updateNhomroutineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nhomroutineService.remove(id);
  }
}
