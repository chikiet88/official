import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UsersDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('timona-user-khachhang')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("dangky")
  create(@Body() createUserDto: UsersDTO) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.read(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  @Post('changepass')
  changepass(@Body() data: any)
  {
    return this.usersService.changepass(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
