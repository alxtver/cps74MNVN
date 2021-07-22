import {HttpStatus, Injectable, MiddlewareFunction, NestMiddleware} from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    resolve(...args: any[]): MiddlewareFunction {
        return (req, res, next) => {
            if (!req.session.isAuthenticated) {
                return res.status(401).json({
                    message: 'Auth error!'
                });
            }
            next();
        };

    }
}

