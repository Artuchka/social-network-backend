import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './schemas/user.schema'

import { UserService } from './services/user.service'
import { FriendService } from './services/friend.service'
import { UserEntriesService } from './services/user-entries.service'

@Module({
  controllers: [UserController],
  providers: [UserService, FriendService, UserEntriesService],
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  exports: [UserService, UserEntriesService],
})
export class UserModule {}
