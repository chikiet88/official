import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BaivietService } from './baiviet.service';
import { CreateBaivietDto } from './dto/create-baiviet.dto';
import { UpdateBaivietDto } from './dto/update-baiviet.dto';

@Controller('timona-baiviet')
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
  @Get('pagination')
  async getProducts(@Query() paginationDto: any): Promise<{ data: any[]; total: number }> {
    const { page, limit } = paginationDto;
    const result = await this.baivietService.getPaginatedProducts(page, limit);
    return {
      data: result[0],
      total: result[1],
    };
  }
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.baivietService.findOne(slug);
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
