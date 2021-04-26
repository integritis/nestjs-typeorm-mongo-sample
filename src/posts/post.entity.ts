import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm'

@Entity('posts')
export class Post {
  @ObjectIdColumn() id: ObjectID
  @Column() title: string
  @Column() body: string

  constructor(post?: Partial<Post>) {
    Object.assign(this, post)
  }
}
