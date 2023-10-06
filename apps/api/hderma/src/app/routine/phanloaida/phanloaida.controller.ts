import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PhanloaidaService } from './phanloaida.service';
import { CreatePhanloaidaDto } from './dto/create-phanloaida.dto';
import { UpdatePhanloaidaDto } from './dto/update-phanloaida.dto';

@Controller('hderma-phanloaida')
export class PhanloaidaController {
  constructor(private readonly phanloaidaService: PhanloaidaService) {}

  @Post()
  create(@Body() createPhanloaidaDto: CreatePhanloaidaDto) {
    console.error(createPhanloaidaDto);
    return this.phanloaidaService.create(createPhanloaidaDto);
  }
  @Get()
  findAll() {
    return this.phanloaidaService.findAll();
  }
  @Get('pagina')
  findPagina(@Query('page') page: number, @Query('limit') limit: number) {
    return this.phanloaidaService.findPagina(page,limit);
  }
  @Get('findslug/:slug')
  findslug(@Param('slug') slug: string) {
    return this.phanloaidaService.findslug(slug);
  }
  @Get('findid/:id')
  findid(@Param('id') id: any) {    
    return this.phanloaidaService.findid(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhanloaidaDto: UpdatePhanloaidaDto) {    
    return this.phanloaidaService.update(id, updatePhanloaidaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phanloaidaService.remove(id);
  }
}
