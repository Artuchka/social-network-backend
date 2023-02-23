import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostController } from './post.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Post, PostSchema } from './post.schema'
import { UserModule } from 'src/user/user.module'

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    UserModule,
  ],
})
export class PostModule {}
