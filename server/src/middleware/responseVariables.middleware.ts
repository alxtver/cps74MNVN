import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ResponseVariablesMiddleware implements NestMiddleware {
  use(...args: any[]) {
    return (req, res, next) => {
      res.locals.isAuth = req.session.isAuthenticated;
      res.locals.csrf = req.csrfToken();
      next();
    };
  }
}
