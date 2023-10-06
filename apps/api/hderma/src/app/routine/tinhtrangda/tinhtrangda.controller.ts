import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TinhtrangdaService } from './tinhtrangda.service';
import { CreateTinhtrangdaDto } from './dto/create-tinhtrangda.dto';
import { UpdateTinhtrangdaDto } from './dto/update-tinhtrangda.dto';

@Controller('hderma-tinhtrangda')
export class TinhtrangdaController {
  constructor(private readonly tinhtrangdaService: TinhtrangdaService) {}

  @Post()
  create(@Body() createTinhtrangdaDto: CreateTinhtrangdaDto) {
    return this.tinhtrangdaService.create(createTinhtrangdaDto);
  }

  @Get()
  findAll() {
    return this.tinhtrangdaService.findAll();
  }
  @Get('pagina')
  findPagina(@Query('page') page: number, @Query('limit') limit: number) {
    console.error();
    return this.tinhtrangdaService.findPagina(page,limit);
  }
  @Get('findslug/:slug')
  findslug(@Param('slug') slug: string) {
    return this.tinhtrangdaService.findslug(slug);
  }
  @Get('findid/:id')
  findid(@Param('id') id: any) {    
    return this.tinhtrangdaService.findid(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTinhtrangdaDto: UpdateTinhtrangdaDto) {
    return this.tinhtrangdaService.update(id, updateTinhtrangdaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tinhtrangdaService.remove(id);
  }
}
