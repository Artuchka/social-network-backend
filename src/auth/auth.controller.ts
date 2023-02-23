import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Response } from 'express'
import { NewUserDto } from './../user/dto/new-user.dto'
import { ExistingUserDto } from './../user/dto/existing-user.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a user' })
  register(@Body() dto: NewUserDto) {
    return this.authService.register(dto)
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login user',
    description: 'adds accessToken onto cookies',
  })
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() user: ExistingUserDto,
  ): Promise<{ token: string }> {
    const token = (await this.authService.login(user)).token

    return this.authService.setCookie(res, token)
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Logout user',
    description: 'wipes accessToken out of cookies',
  })
  async logout(
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ token: string }> {
    return this.authService.logout(res)
  }
}
