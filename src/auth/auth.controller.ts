import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Response } from 'express'
import { NewUserDto } from './../user/dto/new-user.dto'
import { ExistingUserDto } from './../user/dto/existing-user.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserService } from '../user/services/user.service'
import { JwtGuard } from './guards/jwt.guard'
import { User } from '../user/decorators/user.decorator'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register a user' })
  async register(@Body() dto: NewUserDto) {
    const user = await this.authService.register(dto)

    return { message: 'registered!' }
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login user',
    description: 'adds accessToken onto cookies + sends user details',
  })
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() tryingUser: ExistingUserDto,
  ) {
    console.log({ res })
    console.log({ tryingUser })

    const { token, user } = await this.authService.login(tryingUser)

    this.authService.setCookie(res, token)

    const pickedUser = this.userService._pickUser(user)

    return { message: 'Welcome back!', user: pickedUser }
  }

  @Post('loginJWT')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Login user by accessToken from cookies',
    description: 'updates accessToken onto cookies + sends user details',
  })
  async loginJWT(
    @Res({ passthrough: true }) res: Response,
    @User('id') userID: string,
  ) {
    console.log({ res })

    const { token, user } = await this.authService.loginJWT(userID)

    this.authService.setCookie(res, token)

    const pickedUser = this.userService._pickUser(user)

    return { message: 'Welcome back!', user: pickedUser }
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
