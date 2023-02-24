import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './schemas/user.schema'

import { UserService } from './services/user.service'
import { FriendService } from './services/friend.service'

@Module({
  controllers: [UserController],
  providers: [UserService, FriendService],
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  exports: [UserService],
})
export class UserModule {}
