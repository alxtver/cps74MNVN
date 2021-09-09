import { Controller, Res, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Аутентификация пользователя
   * @param res
   * @param req
   */
  @Post('/login')
  async auth(@Res() res, @Req() req) {
    const loginProbe = await this.authService.login(req);
    return res
      .status(HttpStatus.OK)
      .json({ message: loginProbe.message, user: loginProbe.user });
  }

  /**
   * Обновление пользователя
   * @param res
   * @param req
   */
  @Post('/updateUser')
  async updateUser(@Res() res, @Req() req) {
    const user = await this.authService.updateUser(req);
    return res.status(HttpStatus.OK).json(user);
  }
}
