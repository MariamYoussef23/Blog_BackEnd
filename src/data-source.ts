
import { config } from "dotenv";
import { DataSource } from "typeorm"
import "reflect-metadata"
import { Post } from './entities/post'
import { User } from './entities/user'
import {Comment} from './entities/comment'
import {Vote} from './entities/vote'
import { Tag } from "./entities/tag";


config();
export const AppDataSource = new DataSource ({
    type: "postgres",
    host: process.env.Host,
    port: +process.env.DBPort!,
    username: process.env.User,
    password: process.env.Password,
    database: process.env.DatabaseName,
    synchronize: true, 
    logging: true,
    entities: [Post, User, Comment, Vote, Tag],
    migrations: ['migration/*.ts'],
    subscribers: [],
})