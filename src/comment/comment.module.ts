import { Module } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CommentController } from './comment.controller'
import { UserService } from '../user/services/user.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Comment, CommentSchema } from './comment.schema'
import { UserModule } from '../user/user.module'
import { PhotoModule } from '../photo/photo.module'
import { PostModule } from '../post/post.module'

@Module({
  providers: [CommentService],
  controllers: [CommentController],
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    UserModule,
    PhotoModule,
    PostModule,
  ],
})
export class CommentModule {}
