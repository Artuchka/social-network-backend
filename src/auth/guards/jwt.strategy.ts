import { Injectable } from '@nestjs/common'
import { AuthGuard, PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    })
  }

  async validate(payload: any) {
    console.log({ payload })

    return { ...payload.user }
  }
}

function cookieExtractor<JwtFromRequestFunction>(req) {
  let token = null

  if (req?.cookies) {
    token = req?.cookies?.accessToken
  }

  return token
}
