import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserDetails } from '../user-details.interface'

type outputType = UserDetails | UserDetails[keyof UserDetails]

export const User = createParamDecorator<
  keyof UserDetails,
  ExecutionContext,
  outputType
>((data, ctx) => {
  const request = ctx.switchToHttp().getRequest()

  const user: UserDetails = request.user

  return data ? user?.[data] : user
})
