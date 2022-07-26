import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  Unique, 
  Check
} from "typeorm";
import { User } from "./user";
import { Post } from "./post";


@Entity()
@Unique(["user", "post"])
@Check(`"voteStatus" = 1 or "voteStatus" = -1`)
export class Vote extends BaseEntity {
@PrimaryGeneratedColumn()
id: number
//   @PrimaryColumn()
//   userId: number;

//   @PrimaryColumn()
//   postId: number;

  @Column()
  voteStatus: number;

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

  @ManyToOne(() => User, (user) => user.votes, {nullable: false})
//   @JoinColumn({name: 'userId'})
  user:User
  
  @ManyToOne (()=> Post, (post) => post.votes, {nullable: false})
//   @JoinColumn({name: 'postId'})
  post: Post

}



