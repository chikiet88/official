import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UploaddbService } from './uploaddb.service';
import { CreateUploaddbDto } from './dto/create-uploaddb.dto';
import { UpdateUploaddbDto } from './dto/update-uploaddb.dto';

@Controller('uploaddb')
export class UploaddbController {
  constructor(private readonly uploaddbService: UploaddbService) {}

  @Post()
  create(@Body() createUploaddbDto: CreateUploaddbDto) {
    return this.uploaddbService.create(createUploaddbDto);
  }

  @Get()
  findAll() {
    return this.uploaddbService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploaddbService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploaddbDto: UpdateUploaddbDto) {
    return this.uploaddbService.update(+id, updateUploaddbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploaddbService.remove(+id);
  }
}
