import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import type { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';
import getAuth from '../config/auth';

const LOG_NAMESPACE = 'auth-middleware';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    logger.info(LOG_NAMESPACE, 'authenticating request', {
      body: req.body,
      endpoint: req.originalUrl
    });
    let token = req.headers['authorization'];
    if (!token) {
      logger.error(LOG_NAMESPACE, 'No token passed in', {
        headers: req.headers
      });
      return res.status(403).send({
        status: 403,
        message: 'No authentication provided'
      });
    }
    try {
      token = token.split('Bearer ')?.[1] || '';
      // const auth = await getAuth();
      // const decodedToken = await auth.verifyIdToken(token);
      // const uid = decodedToken.uid;
      // logger.info(LOG_NAMESPACE, 'authentication successfull', { uid });
      return next();
    } catch (error) {
      logger.error(LOG_NAMESPACE, 'Unable to authenticate', { error, token });
      return res.status(403).send({
        status: 403,
        message: `Authentication failed for token ${token}`
      });
    }
  }
}
