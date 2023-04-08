import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Project, Prisma } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async addProject(data: Prisma.ProjectCreateInput): Promise<Project> {
    const result = await this.prisma.project.create({ data });
    return result;
  }
  async addProjects(data: Prisma.ProjectCreateManyInput) {
    const result = await this.prisma.project.createMany({ data });
    return result;
  }

  async getAllProjects({
    where,
    cursor,
    orderBy
  }: {
    where?: Prisma.ProjectWhereInput;
    cursor?: Prisma.ProjectWhereUniqueInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<Project[]> {
    const projects = await this.prisma.project.findMany({
      where,
      cursor,
      orderBy
    });
    return projects;
  }

  async getProject(where: Prisma.ProjectWhereUniqueInput): Promise<Project> {
    const prod = await this.prisma.project.findUnique({ where });
    return prod;
  }

  async updateProject({
    where,
    data
  }: {
    where: Prisma.ProjectWhereUniqueInput;
    data: Prisma.ProjectUpdateInput;
  }) {
    const result = await this.prisma.project.update({ where, data });
    return result;
  }

  async removeProject({ where }: { where: Prisma.ProjectWhereUniqueInput }) {
    const result = await this.prisma.project.delete({ where });
    return result;
  }
}
