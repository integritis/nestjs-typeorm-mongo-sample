import { Column, ObjectID, Entity, ObjectIdColumn } from 'typeorm'

@Entity('users')
export class User {
  @ObjectIdColumn() id: ObjectID
  @Column() userId: string
  @Column() cognitoSub: string
  @Column() username: string

  constructor(user?: Partial<User>) {
    Object.assign(this, user)
  }
}
