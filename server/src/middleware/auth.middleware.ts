import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const session: any = req.session;
    if (!session.isAuthenticated) {
      return res.status(401).json({
        message: 'Auth error!',
      });
    }
    next();
  }
}
