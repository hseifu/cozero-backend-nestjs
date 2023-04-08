import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from '@prisma/client';

@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async addProject(
    @Body('name') name: Project['name'],
    @Body('description') description: Project['description'],
    @Body('amount') amount: Project['amount'],
    @Body('status') status: Project['status'],
    @Body('ownerId') ownerId: Project['ownerId']
  ) {
    const prod = await this.projectsService.addProject({
      name,
      description,
      amount,
      status,
      owner: {
        connect: {
          id: ownerId
        }
      }
    });
    return { id: prod.id };
  }

  @Get()
  async getAllProjects() {
    const projects = await this.projectsService.getAllProjects({});
    return projects;
  }

  @Get(':id')
  async getProject(@Param('id') id: string) {
    return await this.projectsService.getProject({ id });
  }

  @Patch(':id')
  async updateProject(
    @Param('id') id: Project['id'],
    @Body('name') name: Project['name'],
    @Body('description') description: Project['description'],
    @Body('amount') amount: Project['amount'],
    @Body('status') status: Project['status']
  ) {
    return await this.projectsService.updateProject({
      where: { id },
      data: { name, description, amount, status }
    });
  }

  @Delete(':id')
  async removeProject(@Param('id') id: Project['id']) {
    return await this.projectsService.removeProject({ where: { id } });
  }
}
