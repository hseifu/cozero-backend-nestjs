import { ApiProperty } from '@nestjs/swagger';

export default class CreateProjectDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  status: EnumProjectStatus;

  @ApiProperty()
  ownerId: string;
}

enum EnumProjectStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  ACTIVE = 'ACTIVE'
}
