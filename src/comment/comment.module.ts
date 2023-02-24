import { Module } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CommentController } from './comment.controller'
import { UserService } from '../user/services/user.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Comment, CommentSchema } from './comment.schema'
import { UserModule } from '../user/user.module'

@Module({
  providers: [CommentService],
  controllers: [CommentController],
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    UserModule,
  ],
})
export class CommentModule {}
