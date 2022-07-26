import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";
  import { User } from "./user";
  import { Post } from "./post"

  @Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  body: string;

  @CreateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  CreatedAt: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  UpdatedAt: Date;

  @ManyToOne(() => User, (user) => user.comments, {nullable: false})
  user: User;
  
  @ManyToOne (()=> Post, (post) => post.comments, {nullable: false} )
  post: Post
}