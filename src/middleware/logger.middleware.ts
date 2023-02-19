import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    logger.info('logger-middleware', 'request came in', {
      body: req.body,
      endpoint: req.originalUrl
    });
    next();
  }
}
