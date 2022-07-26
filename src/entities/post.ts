import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user";
import { Comment } from "./comment";
import { Vote } from "./vote";
import { Tag } from "./tag";


@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  body: string;

 

  commentsTotal: number;

  upVotesTotal: number;

  downVotesTotal: number;

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

  @ManyToOne(() => User, (user) => user.posts, { nullable: false })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Vote, (vote) => vote.post)
  votes: Vote[];

  @ManyToMany(()=> Tag,(tag)=> tag.posts) 
  @JoinTable()
  tags: Tag[]
}
