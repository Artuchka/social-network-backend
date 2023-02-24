import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { PostDocument } from './post.schema'
import { NewPostDto } from './dto/new-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { UserService } from '../user/services/user.service'

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
    const { authorId } = dto

    const newPost = await this.postModel.create(dto)

    this.userService.addPost({ authorId, postId: newPost.id })

    return newPost
  }

  async deleteSingle(id: string, authorId: string) {
    const deletedPost = await this.postModel.findByIdAndDelete(id)

    this.userService.removePost({ authorId, postId: deletedPost.id })

    return deletedPost
  }

  async updateSingle(id: string, dto: UpdatePostDto) {
    const updatedPost = await this.postModel.findByIdAndUpdate(id, dto, {
      new: true,
    })
    return updatedPost
  }

  async like(id: string, userId: string) {
    const updatedPost = await this.postModel.findOneAndUpdate(
      { _id: id, liked: { $ne: userId } },
      { $push: { liked: userId }, $pull: { disliked: userId } },
      {
        new: true,
      },
    )
    return updatedPost
  }

  async dislike(id: string, userId: string) {
    const updatedPost = await this.postModel.findOneAndUpdate(
      { _id: id, disliked: { $ne: userId } },
      { $push: { disliked: userId }, $pull: { liked: userId } },
      {
        new: true,
      },
    )
    return updatedPost
  }
}
