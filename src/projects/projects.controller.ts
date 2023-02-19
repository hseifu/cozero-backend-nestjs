import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete
} from '@nestjs/common';
import { IProject } from './projects.model';
import { ProjectsService } from './projects.service';

@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async addProduct(
    @Body('name') name: IProject['name'],
    @Body('description') description: IProject['description'],
    @Body('amount') amount: IProject['amount'],
    @Body('status') status: IProject['status']
  ) {
    const prodId = await this.projectsService.addProduct(
      name,
      description,
      amount,
      status
    );
    return { id: prodId };
  }

  @Get()
  async getAllProjects() {
    const projects = await this.projectsService.getAllProjects();
    return projects;
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return await this.projectsService.getProduct(id);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: IProject['id'],
    @Body('name') name: IProject['name'],
    @Body('description') description: IProject['description'],
    @Body('amount') amount: IProject['amount'],
    @Body('status') status: IProject['status']
  ) {
    return await this.projectsService.updateProduct(
      id,
      name,
      description,
      amount,
      status
    );
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: IProject['id']) {
    return await this.projectsService.removeProduct(id);
  }
}
