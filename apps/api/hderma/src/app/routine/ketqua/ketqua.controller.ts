import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { KetquaService } from './ketqua.service';
import { CreateKetquaDto } from './dto/create-ketqua.dto';
import { UpdateKetquaDto } from './dto/update-ketqua.dto';

@Controller('hderma-ketqua')
export class KetquaController {
  constructor(private readonly ketquaService: KetquaService) {}

  @Post()
  create(@Body() createKetquaDto: CreateKetquaDto) {
    return this.ketquaService.create(createKetquaDto);
  }

  @Get()
  findAll() {
    return this.ketquaService.findAll();
  }
  @Get('pagina')
  findPagina(@Query('page') page: number, @Query('limit') limit: number) {
    console.error();
    return this.ketquaService.findPagina(page,limit);
  }
  @Get('findslug/:slug')
  findslug(@Param('slug') slug: string) {
    return this.ketquaService.findslug(slug);
  }
  @Get('findid/:id')
  findid(@Param('id') id: any) {    
    return this.ketquaService.findid(id);
  }
  @Get('findidKH/:id')
  findByidUser(@Param('id') id: string) {
    return this.ketquaService.findidKH(id);
  }
  @Get('findsdt/:id')
  findBySDT(@Param('id') id: string) {
    return this.ketquaService.findBySDT(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKetquaDto: UpdateKetquaDto) {
    return this.ketquaService.update(id, updateKetquaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ketquaService.remove(id);
  }
}
