import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsController } from './projects.controller';
import { Projectschema } from './projects.model';
import { ProjectsService } from './projects.service';

describe('ProjectController', () => {
  let projectController: ProjectsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(
          'mongodb+srv://henok-mongodb:oWFausOeWJB7H19s@cluster0.lgs8n.mongodb.net/nestjs-backend?retryWrites=true&w=majority'
        ),
        MongooseModule.forFeature([{ name: 'Project', schema: Projectschema }])
      ],
      controllers: [ProjectsController],
      providers: [ProjectsService]
    }).compile();

    projectController = app.get<ProjectsController>(ProjectsController);
  });

  describe('Get all products', () => {
    it('should return an array with all products', async () => {
      expect(await projectController.getAllProjects()).toStrictEqual([]);
    });
  });
});
