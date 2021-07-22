import {HttpStatus, Injectable, MiddlewareFunction, NestMiddleware} from '@nestjs/common';

@Injectable()
export class ResponseVariablesMiddleware implements NestMiddleware {
    resolve(...args: any[]): MiddlewareFunction {
        return (req, res, next) => {
            res.locals.isAuth = req.session.isAuthenticated;
            res.locals.csrf = req.csrfToken();
            next();
        };
    }
}

