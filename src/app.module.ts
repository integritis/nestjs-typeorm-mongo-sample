import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostsController } from './posts/posts.controller'
import { Post } from './posts/post.entity'
import { UsersController } from './user/users.controller'
import { User } from './user/user.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017',
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    TypeOrmModule.forFeature([Post, User]),
  ],
  controllers: [AppController, PostsController, UsersController],
  providers: [AppService],
})
export class AppModule {}
