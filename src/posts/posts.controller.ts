import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'
import { ObjectID } from 'mongodb'
import { Post as PostEntity } from './post.entity'

@Controller('posts')
export class PostsController {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: MongoRepository<PostEntity>,
  ) {}

  @Get()
  public async getPosts(): Promise<PostEntity[]> {
    return await this.postsRepository.find()
  }

  @Get(':id')
  public async getPost(@Param('id') id): Promise<PostEntity> {
    const post =
      ObjectID.isValid(id) && (await this.postsRepository.findOne(id))
    if (!post) {
      throw new NotFoundException()
    }
    return post
  }

  @Post()
  public async createPost(
    @Body() post: Partial<PostEntity>,
  ): Promise<PostEntity> {
    if (!post || !post.title || !post.body) {
      throw new BadRequestException('hoge')
    }
    return await this.postsRepository.save(new PostEntity(post))
  }
}
