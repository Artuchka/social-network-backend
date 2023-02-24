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

  async getSingle(id: string) {
    const post = await this.postModel.findById(id)

    return post
  }

  async create(dto: NewPostDto) {
    const { author } = dto
    console.log({ dto })

    const newPost = await this.postModel.create(dto)

    // this.userService.addPost({ authorId, postId: newPost.id })

    return newPost
  }

  async deleteSingle(id: string) {
    const deletedPost = await this.postModel.findByIdAndDelete(id)

    const author = deletedPost.author
    // this.userService.removePost({ authorId, postId: deletedPost.id })

    return deletedPost
  }

  async updateSingle(id: string, dto: UpdatePostDto) {
    const updateData = Object.keys(dto).map((key) => ({
      $set: {
        [key]: dto[key],
      },
    }))

    const updatedPost = await this.postModel.findByIdAndUpdate(id, updateData, {
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
