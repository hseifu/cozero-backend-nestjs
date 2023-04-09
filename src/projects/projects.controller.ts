import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { Project } from '@prisma/client';
import { CreateProjectDto, UpdateProjectDto } from './dto';

@Controller('api/projects')
@ApiTags('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async addProject(@Body() createProjectDto: CreateProjectDto) {
    const prod = await this.projectsService.addProject({
      name: createProjectDto.name,
      description: createProjectDto.description,
      amount: createProjectDto.amount,
      status: createProjectDto.status,
      owner: {
        connect: {
          id: createProjectDto.ownerId
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
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto
  ) {
    return await this.projectsService.updateProject({
      where: { id },
      data: {
        name: updateProjectDto.name,
        description: updateProjectDto.description,
        amount: updateProjectDto.amount,
        status: updateProjectDto.status
      }
    });
  }

  @Delete(':id')
  async removeProject(@Param('id') id: Project['id']) {
    return await this.projectsService.removeProject({ where: { id } });
  }
}
