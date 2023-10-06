import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CombosanphamService } from './combosanpham.service';
import { CreateCombosanphamDto } from './dto/create-combosanpham.dto';
import { UpdateCombosanphamDto } from './dto/update-combosanpham.dto';

@Controller('hderma-combosanpham')
export class CombosanphamController {
  constructor(private readonly combosanphamService: CombosanphamService) {}

  @Post()
  create(@Body() createCombosanphamDto: CreateCombosanphamDto) {
    return this.combosanphamService.create(createCombosanphamDto);
  }

  @Get()
  findAll() {
    return this.combosanphamService.findAll();
  }
  @Get('pagina')
  findPagina(@Query('page') page: number, @Query('limit') limit: number) {
    console.error();
    return this.combosanphamService.findPagina(page,limit);
  }
  @Get('findslug/:slug')
  findslug(@Param('slug') slug: string) {
    return this.combosanphamService.findslug(slug);
  }
  @Get('findid/:id')
  findid(@Param('id') id: any) {    
    return this.combosanphamService.findid(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCombosanphamDto: UpdateCombosanphamDto) {
    return this.combosanphamService.update(id, updateCombosanphamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.combosanphamService.remove(id);
  }
}
