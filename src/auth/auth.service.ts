import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'
import { UserService } from '../user/services/user.service'
import { NewUserDto } from '../user/dto/new-user.dto'
import { UserDetails } from '../user/user-details.interface'
import { ExistingUserDto } from '../user/dto/existing-user.dto'
import { UserDocument } from '../user/schemas/user.schema'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  }

  async register(dto: NewUserDto) {
    const { email, password } = dto

    const existingUser = await this.userService.getSingleByEmail(email)
    if (existingUser) {
      throw new BadRequestException('there is already a user with that email')
    }

    const hashed = await this.hashPassword(password)

    return this.userService.create({ email, password: hashed })
  }

  async isValidPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ userDetails; user }> {
    const user = await this.userService.getSingleByEmail(email)

    if (!user) {
      throw new NotFoundException('no such user with email: ' + email)
    }

    const isPassValid = await this.isValidPassword(password, user.password)
    if (!isPassValid) {
      throw new BadRequestException('bad password')
    }

    delete user.password
    const userDetails = this.userService._getUserDetails(user)
    return { userDetails, user }
  }

  async login(
    tryingUser: ExistingUserDto,
  ): Promise<{ user: UserDocument; token: string }> {
    const { email, password } = tryingUser
    const { user, userDetails } = await this.validateUser(email, password)

    const token = await this.jwtService.signAsync({
      user: userDetails,
    })

    return { user, token }
  }

  async logout(res: Response): Promise<{ token: string } | null> {
    res.clearCookie('accessToken')

    return { token: null }
  }

  async setCookie(
    res: Response,
    token: string,
  ): Promise<{ token: string } | null> {
    const oneDay = 1000 * 60 * 60 * 24

    res.cookie('accessToken', token, {
      expires: new Date(Date.now() + oneDay),
      // httpOnly: false,
      // secure: true,
      // sameSite: 'none',
    })

    return { token }
  }
}
