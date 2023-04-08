import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async addUser(data: Prisma.UserCreateInput): Promise<User> {
    const result = await this.prisma.user.create({ data });
    return result;
  }

  async getAllUsers({
    where,
    cursor,
    orderBy
  }: {
    where?: Prisma.UserWhereInput;
    cursor?: Prisma.UserWhereUniqueInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where,
      cursor,
      orderBy
    });
    return users;
  }

  async getUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const prod = await this.prisma.user.findUnique({ where });
    return prod;
  }

  async updateUser({
    where,
    data
  }: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }) {
    const result = await this.prisma.user.update({ where, data });
    return result;
  }

  async removeUser({ where }: { where: Prisma.UserWhereUniqueInput }) {
    const result = await this.prisma.user.delete({ where });
    return result;
  }
}
