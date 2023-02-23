import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { PostDocument } from './post.schema'
import { NewPostDto } from './dto/new-post.dto'
import { UserService } from 'src/user/user.service'

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<PostDocument>,
    private readonly userService: UserService,
  ) {}

  async getAll() {
    const posts = await this.postModel.find()

    return posts
  }

  async create(dto: NewPostDto) {
    const { authorId, text } = dto

    const newPost = await this.postModel.create(dto)

    this.userService.addPost({ authorId, postId: newPost.id })

    return newPost
  }
}
