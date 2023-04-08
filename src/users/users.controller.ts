import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(
    @Body('name') name: User['name'],
    @Body('email') email: User['email']
  ) {
    const prod = await this.usersService.addUser({
      name,
      email
    });
    return { id: prod.id };
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getAllUsers({});
    return users;
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.getUser({ id });
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: User['id'],
    @Body('name') name: User['name'],
    @Body('email') email: User['email']
  ) {
    return await this.usersService.updateUser({
      where: { id },
      data: { name, email }
    });
  }

  @Delete(':id')
  async removeUser(@Param('id') id: User['id']) {
    return await this.usersService.removeUser({ where: { id } });
  }
}
