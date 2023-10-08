import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubcommentService } from './subcomment.service';
import { CreateSubcommentDto } from './dto/create-subcomment.dto';
import { UpdateSubcommentDto } from './dto/update-subcomment.dto';

@Controller('timona-comment')
export class SubcommentController {
  constructor(private readonly subcommentService: SubcommentService) {}

  @Post()
  create(@Body() createSubcommentDto: CreateSubcommentDto) {
    return this.subcommentService.create(createSubcommentDto);
  }

  @Get()
  findAll() {
    return this.subcommentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcommentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubcommentDto: UpdateSubcommentDto) {
    return this.subcommentService.update(id, updateSubcommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcommentService.remove(id);
  }
}
