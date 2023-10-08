import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BaivietService } from './baiviet.service';
import { CreateBaivietDto } from './dto/create-baiviet.dto';
import { UpdateBaivietDto } from './dto/update-baiviet.dto';

@Controller('hderma-baiviet')
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
  @Get('pagina')
  findPagina(@Query('page') page: number, @Query('limit') limit: number) {
    console.error();
    return this.baivietService.findPagina(page,limit);
  }
  @Get('findslug/:slug')
  findslug(@Param('slug') slug: string) {
    return this.baivietService.findslug(slug);
  }
  @Get('findid/:id')
  findid(@Param('id') id: any) {    
    return this.baivietService.findid(id);
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
