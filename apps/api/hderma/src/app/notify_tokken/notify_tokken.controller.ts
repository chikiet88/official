import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotifyTokkenService } from './notify_tokken.service';
import { CreateNotifyTokkenDto } from './dto/create-notify_tokken.dto';
import { UpdateNotifyTokkenDto } from './dto/update-notify_tokken.dto';

@Controller('notify-tokken')
export class NotifyTokkenController {
  constructor(private readonly notifyTokkenService: NotifyTokkenService) {}

  @Post()
  create(@Body() createNotifyTokkenDto: CreateNotifyTokkenDto) {
    return this.notifyTokkenService.create(createNotifyTokkenDto);
  }

  @Get()
  findAll() {
    return this.notifyTokkenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notifyTokkenService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotifyTokkenDto: UpdateNotifyTokkenDto) {
    return this.notifyTokkenService.update(id, updateNotifyTokkenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notifyTokkenService.remove(id);
  }
}
