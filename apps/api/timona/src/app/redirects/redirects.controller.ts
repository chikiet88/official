import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RedirectsService } from './redirects.service';
import { CreateRedirectDto } from './dto/create-redirect.dto';
import { UpdateRedirectDto } from './dto/update-redirect.dto';

@Controller('redirects')
export class RedirectsController {
  constructor(private readonly redirectsService: RedirectsService) {}
  @Post()
  create(@Body() createRedirectDto: CreateRedirectDto) {
    return this.redirectsService.create(createRedirectDto);
  }

  @Get()
  findAll() {
    return this.redirectsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.redirectsService.findOne(id);
  }
  @Post('slug')
  findSlug(@Body() data: any) {
    return this.redirectsService.findSlug(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRedirectDto: UpdateRedirectDto) {
    return this.redirectsService.update(id, updateRedirectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.redirectsService.remove(id);
  }
}
