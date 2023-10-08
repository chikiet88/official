import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenutypeService } from './menutype.service';
import { CreateMenutypeDto } from './dto/create-menutype.dto';
import { UpdateMenutypeDto } from './dto/update-menutype.dto';

@Controller('hderma-menutype')
export class MenutypeController {
  constructor(private readonly menutypeService: MenutypeService) {}

  @Post()
  create(@Body() createMenutypeDto: CreateMenutypeDto) {
    return this.menutypeService.create(createMenutypeDto);
  }

  @Get()
  findAll() {
    return this.menutypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menutypeService.findOne(id);
  }
  @Post('findid')
  findslug(@Body() data: any) {
    return this.menutypeService.findid(data);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenutypeDto: UpdateMenutypeDto) {
    return this.menutypeService.update(id, updateMenutypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menutypeService.remove(id);
  }
}
