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
    const posts = await this.commentModel.find()

    return posts
  }

  async getSingle(id: string) {
    const post = await this.commentModel.findById(id)

    return post
  }

  async create(dto: NewCommentDto) {
    const { author } = dto
    console.log({ dto })

    const newPost = await this.commentModel.create(dto)

    // this.userService.addPost({ authorId, postId: newPost.id })

    return newPost
  }

  async deleteSingle(id: string) {
    const deletedPost = await this.commentModel.findByIdAndDelete(id)
    if (!deletedPost) {
      throw new NotFoundException(`No post with id ${id}`)
    }

    const author = deletedPost.author
    // this.userService.removePost({ authorId, postId: deletedPost.id })

    return deletedPost
  }

  async updateSingle(id: string, dto: UpdateCommentDto) {
    const updateData = Object.keys(dto).map((key) => ({
      $set: {
        [key]: dto[key],
      },
    }))

    const updatedPost = await this.commentModel.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      },
    )
    return updatedPost
  }

  async like(id: string, userId: string) {
    const updatedPost = await this.commentModel.findOneAndUpdate(
      { _id: id, liked: { $ne: userId } },
      { $push: { liked: userId }, $pull: { disliked: userId } },
      {
        new: true,
      },
    )
    return updatedPost
  }

  async dislike(id: string, userId: string) {
    const updatedPost = await this.commentModel.findOneAndUpdate(
      { _id: id, disliked: { $ne: userId } },
      { $push: { disliked: userId }, $pull: { liked: userId } },
      {
        new: true,
      },
    )
    return updatedPost
  }
}
