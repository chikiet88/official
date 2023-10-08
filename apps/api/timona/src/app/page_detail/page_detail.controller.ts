import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PageDetailService } from './page_detail.service';
import { CreatePageDetailDto } from './dto/create-page_detail.dto';
import { UpdatePageDetailDto } from './dto/update-page_detail.dto';

@Controller('timona-page-detail')
export class PageDetailController {
  constructor(private readonly pageDetailService: PageDetailService) {}

  @Post()
  create(@Body() createPageDetailDto: CreatePageDetailDto) {
    return this.pageDetailService.create(createPageDetailDto);
  }

  @Get()
  findAll() {
    return this.pageDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pageDetailService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePageDetailDto: UpdatePageDetailDto) {
    return this.pageDetailService.update(id, updatePageDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pageDetailService.remove(id);
  }
}
