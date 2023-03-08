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
import { UserDocument } from '../user/schemas/user.schema'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a user' })
  async register(@Body() dto: NewUserDto) {
    const user = await this.authService.register(dto)

    return { message: 'registered!' }
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login user',
    description: 'adds accessToken onto cookies',
  })
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() tryingUser: ExistingUserDto,
  ) {
    console.log({ res })
    console.log({ tryingUser })

    const { token, user } = await this.authService.login(tryingUser)

    this.authService.setCookie(res, token)
    return { message: 'Welcome back!', user }
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
