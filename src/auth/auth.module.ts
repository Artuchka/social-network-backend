import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { JwtGuard } from './guards/jwt.guard'
import { JwtStrategy } from './guards/jwt.strategy'
import { UserModule } from '../user/user.module'

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, JwtStrategy],
  imports: [
    UserModule,

    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: process.env.SECRET,
        signOptions: {
          expiresIn: '3600s',
        },
      }),
    }),
  ],
})
export class AuthModule {}
