import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { IRequest } from '../interfaces/req.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: IRequest, res: Response, next: NextFunction) {
    if (!req.session.isAuthenticated) {
      return res.status(401).json({
        message: 'Auth error!',
      });
    }
    next();
  }
}
