import { Body, Controller, Get, Post } from '@nestjs/common'
import { NewPostDto } from './dto/new-post.dto'
import { PostService } from './post.service'

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async getAll() {
    const posts = await this.postService.getAll()

    return {
      message: 'all posts',
      posts,
    }
  }

  @Post()
  async create(@Body() dto: NewPostDto) {
    const post = await this.postService.create(dto)

    return {
      message: 'created',
      post,
    }
  }
}
