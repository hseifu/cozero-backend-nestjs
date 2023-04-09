import { PartialType } from '@nestjs/swagger';
import CreateProjectDto from './createProject.dto';

export default class UpdateProjectDto extends PartialType(CreateProjectDto) {}
