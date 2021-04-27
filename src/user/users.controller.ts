import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'
import { User } from './user.entity'

@Controller('user')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: MongoRepository<User>,
  ) {}

  @Get()
  public async getUserList(): Promise<void> {
    return
  }

  @Post()
  public async createUser(@Body() user: Partial<User>): Promise<User> {
    if (!user || !user.cognitoSub) {
      throw new BadRequestException('request invalid')
    }
    return await this.usersRepository.save(new User(user))
  }
}
