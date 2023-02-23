import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { NewPostDto } from './dto/new-post.dto'
import { PostService } from './post.service'
import { UpdatePostDto } from './dto/update-post.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { User } from '../user/decorators/user.decorator'
import { JwtGuard } from '../auth/guards/jwt.guard'

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  async getAll() {
    const posts = await this.postService.getAll()

    return {
      message: 'all posts',
      posts,
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a post' })
  async create(@Body() dto: NewPostDto) {
    const post = await this.postService.create(dto)

    return {
      message: 'created',
      post,
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete post' })
  async deleteSingle(
    @Param('id') postId: string,
    @Body('authorId') authorId: string,
  ) {
    const post = await this.postService.deleteSingle(postId, authorId)

    return {
      message: 'deleted',
      post,
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update post' })
  async updateSingle(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const post = await this.postService.updateSingle(id, dto)

    return {
      message: 'updated',
      post,
    }
  }

  @Get(':id/like')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Like post' })
  async likePost(@Param('id') id: string, @User('id') userId: string) {
    const post = await this.postService.like(id, userId)

    console.log({ post })

    if (!post) {
      throw new BadRequestException(`Alrady liked by ${userId} OR no such post`)
    }

    return {
      message: 'updated',
      post,
    }
  }

  @Get(':id/dislike')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Dislike post' })
  async dislikePost(@Param('id') id: string, @User('id') userId: string) {
    const post = await this.postService.dislike(id, userId)

    if (!post) {
      throw new BadRequestException(`Alrady disliked by ${userId}`)
    }

    return {
      message: 'updated',
      post,
    }
  }
}
