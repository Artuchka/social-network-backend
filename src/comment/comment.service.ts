import { Injectable, NotFoundException } from '@nestjs/common'
import { Model } from 'mongoose'
import { CommentDocument } from './comment.schema'
import { UserService } from '../user/services/user.service'
import { InjectModel } from '@nestjs/mongoose'
import { NewCommentDto } from './dto/new-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment')
    private readonly commentModel: Model<CommentDocument>,
    private readonly userService: UserService,
  ) {}

  async getAll() {
    const comment = await this.commentModel.find()

    return comment
  }

  async getSingle(id: string) {
    const comment = await this.commentModel.findById(id)

    if (!comment) {
      throw new NotFoundException(`Comment ${id} not found`)
    }
    return comment
  }

  async create({ dto, userId }: { dto: NewCommentDto; userId: string }) {
    console.log({ dto })

    const comment = await this.commentModel.create({ ...dto, author: userId })

    // this.userService.addComment({ authorId, CommentId: comment.id })

    return comment
  }

  async deleteSingle({
    commentId,
    userId,
  }: {
    commentId: string
    userId: string
  }) {
    const foundComment = await this.commentModel.findById(commentId)

    if (!foundComment) {
      throw new NotFoundException(`No Comment with id ${commentId}`)
    }

    if (foundComment.author.toString() !== userId) {
      throw new NotFoundException(`You are not the owner of this Comment`)
    }

    await foundComment.delete()

    return foundComment
  }

  async updateSingle({
    commentId,
    dto,
    userId,
  }: {
    commentId: string
    userId: string
    dto: UpdateCommentDto
  }) {
    const foundComment = await this.commentModel.findById(commentId)

    if (!foundComment) {
      throw new NotFoundException(`No Comment with id ${commentId} `)
    }

    if (foundComment.author.toString() !== userId) {
      throw new NotFoundException(`You are not the owner of this Comment`)
    }

    Object.keys(dto).map((key) => {
      foundComment[key] = dto[key]
    })

    await foundComment.save()

    return foundComment
  }

  async like(id: string, userId: string) {
    const updatedComment = await this.commentModel.findOneAndUpdate(
      { _id: id, liked: { $ne: userId } },
      { $push: { liked: userId }, $pull: { disliked: userId } },
      {
        new: true,
      },
    )
    return updatedComment
  }

  async dislike(id: string, userId: string) {
    const updatedComment = await this.commentModel.findOneAndUpdate(
      { _id: id, disliked: { $ne: userId } },
      { $push: { disliked: userId }, $pull: { liked: userId } },
      {
        new: true,
      },
    )
    return updatedComment
  }
}
