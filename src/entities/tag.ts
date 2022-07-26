import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Post } from "./post";

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => Post, (post)=> post.tags)
  posts: Post[]
}








// @ManyToMany(() => Post)
//   @JoinTable({
//     name: "tag_post",
//     joinColumn: {
//       name: "tag",
//       referencedColumnName: "id",
//     },
//     inverseJoinColumn: {
//       name: "post",
//       referencedColumnName: "id",
//     },
//   })
//   posts: Post[];