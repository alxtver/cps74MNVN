import {
    Controller,
    Get,
    Res,
    HttpStatus,
    Post,
    Body,
    Put,
    Query,
    NotFoundException,
    Delete,
    Param,
    Req
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    /**
     * Аутентификация пользователя
     * @param res
     * @param req
     */
    @Post('/login')
    async addCustomer(@Res() res, @Req() req) {
        const loginProbe = await this.authService.login(req);
        return res.status(HttpStatus.OK).json({message: loginProbe.message, user: loginProbe.user});
    }
}
