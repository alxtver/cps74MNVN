import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { IRequest } from '../interfaces/req.interface';

@Injectable()
export class ResponseVariablesMiddleware implements NestMiddleware {
  use(req: IRequest, res: Response, next: NextFunction) {
    res.locals.isAuth = req.session.isAuthenticated;
    res.locals.csrf = req.csrfToken();
    next();
  }
}
