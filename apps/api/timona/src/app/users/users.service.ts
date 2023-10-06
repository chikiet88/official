import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UsersDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>
  ) {}

  async create(data: any) {
    const checkSDT = await this.findbySDT(data);
    const checkEmail = await this.findbyEmail(data);
    if (checkSDT) {
      return [false, 'Số Điện Thoại Đã Tồn Tại'];
    }
    if (checkEmail) {
      return [false, 'Email Đã Tồn Tại'];
    }
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    this.usersRepository.create(data);
    this.usersRepository.save(data);
    return [true, 'Đăng Ký Thành Công'];
  }
  async findAll() {
    return await this.usersRepository.find({
      // relations: ['Nhoms'],
    });
  }
  async read(id: string) {
    return await this.usersRepository.findOne({
      where: { id: id },
      // relations: ['Nhoms', 'Lophocs', 'Kythis','Phanquyens'],
    });
  }
  async findbyEmail(user: any) {
    return await this.usersRepository.findOne({ where: { email: user.email } });
  }
  async findbySDT(user: any) {
    return await this.usersRepository.findOne({
      where: { SDT: user.SDT },
      // relations: ['Nhoms', 'Lophocs', 'Kythis','Phanquyens','Phanquyens.Listphanquyen'],
    });
  }
  async update(id: string, data: Partial<UpdateUserDto>) {
    await this.usersRepository.save(data);
    return await this.read(id);
  }
  async remove(id: string) {
    await this.usersRepository.delete({ id });
    return { deleted: true };
  }

  async changepass(data: any): Promise<any> {
  
    const user = await this.read(data.user.id);
    if (!user) {
      throw new ConflictException('Tài Khoản Không Đúng');
    }
    const checkPass = await bcrypt.compare(data.oldpass, user.password);
    if (!checkPass) {
      throw new ConflictException('Mật Khẩu Không Trùng Khớp');
    }
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(data.newpass, salt);
    await this.usersRepository.update(user.id, user);
    return await this.usersRepository.save(user);
  }
}
