import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common'
import { NewUserDto } from 'src/user/dto/new-user.dto'
import { AuthService } from './auth.service'
import { Response } from 'express'
import { ExistingUserDto } from 'src/user/dto/existing-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: NewUserDto) {
    return this.authService.register(dto)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() user: ExistingUserDto,
  ): Promise<{ token: string }> {
    const token = (await this.authService.login(user)).token

    return this.authService.setCookie(res, token)
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ token: string }> {
    return this.authService.logout(res)
  }
}
