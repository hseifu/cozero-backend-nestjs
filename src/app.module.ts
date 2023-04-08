import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ProjectsModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
