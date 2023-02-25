import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { PostDocument } from './post.schema'
import { NewPostDto } from './dto/new-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { UserEntriesService } from '../user/services/user-entries.service'
import { PhotoService } from '../photo/photo.service'

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<PostDocument>,
    private readonly userEntriesService: UserEntriesService,
    private readonly photoService: PhotoService,
  ) {}

  async getAll() {
    const posts = await this.postModel.find()

    return posts
  }

  async getSingle(id: string) {
    const post = await this.postModel.findById(id)

    return post
  }

  async create({ userId, dto }: { userId: string; dto: NewPostDto }) {
    if ('images' in dto?.content) {
      await this.photoService._checkPhotos(dto.content.images)
    }

    const newPost = await this.postModel.create({ ...dto, author: userId })
    this.userEntriesService._addPost({ postId: newPost.id, authorId: userId })

    return newPost
  }

  async deleteSingle({ userId, postId }: { postId: string; userId: string }) {
    const foundPost = await this.postModel.findById(postId)

    if (!foundPost) {
      throw new NotFoundException(`No Post with id ${postId}`)
    }

    if (foundPost.author.toString() !== userId) {
      throw new NotFoundException(`You are not the owner of this Post`)
    }

    this.userEntriesService._removePost({
      postId: foundPost.id,
      authorId: userId,
    })
    await foundPost.delete()

    return foundPost
  }

  async updateSingle({
    userId,
    postId,
    dto,
  }: {
    userId: string
    postId: string
    dto: UpdatePostDto
  }) {
    const foundPost = await this.postModel.findById(postId)

    if (!foundPost) {
      throw new NotFoundException(`No Post with id ${postId} `)
    }

    if (foundPost.author.toString() !== userId) {
      throw new NotFoundException(`You are not the owner of this Post`)
    }

    if ('images' in dto?.content) {
      await this.photoService._checkPhotos(dto.content.images)
    }

    Object.keys(dto.content).map((key) => {
      foundPost.content[key] = dto.content[key]
    })

    await foundPost.save()

    return foundPost
  }

  async like(id: string, userId: string) {
    const updatedPost = await this.postModel.findOneAndUpdate(
      { _id: id, liked: { $ne: userId } },
      { $push: { liked: userId }, $pull: { disliked: userId } },
      {
        new: true,
      },
    )

    this.userEntriesService._addLikeOnPost({
      postId: updatedPost.id,
      authorId: userId,
    })
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

    this.userEntriesService._removeLikeOnPost({
      postId: updatedPost.id,
      authorId: userId,
    })
    return updatedPost
  }
}
