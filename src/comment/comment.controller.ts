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
import { CommentService } from './comment.service'
import { ApiOperation } from '@nestjs/swagger'
import { NewCommentDto } from './dto/new-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { JwtGuard } from '../auth/guards/jwt.guard'
import { User } from '../user/decorators/user.decorator'

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all comments' })
  async getAll() {
    const comments = await this.commentService.getAll()

    return {
      message: 'all comments',
      comments,
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single comment' })
  async getSingle(@Param('id') id: string) {
    const comment = await this.commentService.getSingle(id)

    return {
      message: 'single comment',
      comment,
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a comment' })
  async create(@Body() dto: NewCommentDto) {
    const comment = await this.commentService.create(dto)

    return {
      message: 'created comment',
      comment,
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete comment' })
  async deleteSingle(@Param('id') commentId: string) {
    const comment = await this.commentService.deleteSingle(commentId)

    return {
      message: 'deleted comment',
      comment,
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update comment' })
  async updateSingle(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
    const comment = await this.commentService.updateSingle(id, dto)

    return {
      message: 'updated comment',
      comment,
    }
  }

  @Get(':id/like')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Like comment' })
  async likeComment(@Param('id') id: string, @User('id') userId: string) {
    const comment = await this.commentService.like(id, userId)

    console.log({ comment })

    if (!comment) {
      throw new BadRequestException(
        `Alrady liked by ${userId} OR comment doesnot exist`,
      )
    }

    return {
      message: 'liked comment',
      comment,
    }
  }

  @Get(':id/dislike')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Dislike comment' })
  async dislikeComment(@Param('id') id: string, @User('id') userId: string) {
    const comment = await this.commentService.dislike(id, userId)

    if (!comment) {
      throw new BadRequestException(`Alrady disliked by ${userId}`)
    }

    return {
      message: 'disliked comment',
      comment,
    }
  }
}
