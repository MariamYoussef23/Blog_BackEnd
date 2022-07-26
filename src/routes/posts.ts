import { Router } from "express";
import { Post } from "../entities/post";
import { User } from "../entities/user";
import { Comment } from "../entities/comment";
import { Vote } from "../entities/vote";
import { Tag } from "../entities/tag";
import { In } from "typeorm";
// import {  getPostDetails } from "../utils";

const router = Router();

const getPostDetails = (post: Post) => {
  return {
    ...post,
    commentsTotal: post.comments?.length,
    upVotesTotal: post.votes?.filter((post) => post.voteStatus === 1).length,
    downVotesTotal: post.votes?.filter((post) => post.voteStatus === -1).length,
  };
  // return Post.create({
  //   ...post,
  //   commentsTotal: post.comments?.length,
  //   upVotesTotal: post.votes?.filter((post)=>post.voteStatus ===1).length,
  //   downVotesTotal: post.votes?.filter((post)=>post.voteStatus === -1).length
  // })
};

router.get("/", async (req, res) => {
  try {
    let posts = await Post.find({
      relations: {
        user: true,
        comments: true,
        votes: true,
        tags: true,
      },
    });
    const returnPosts = posts.map((post) => getPostDetails(post));

    res.json({ data: returnPosts });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = +req.params.id;
    const post = await Post.findOne({
      where: { id },
      relations: {
        user: true,
        comments: true,
        votes: { user: true },
        tags: true,
      },
    });
    if (!post) return res.status(404).json({ message: "Post not Found!" });

    // const returnPost = morePostDetails(post)
    res.json({ data: getPostDetails(post).upVotesTotal, post });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, body, userId, tagIds } = req.body;
    const user = await User.findOne({ where: { id: userId } });

    if (!user)
      return res
        .status(404)
        .json({ message: "User not found, please enter a valid user" });
    
    const tags = await Tag.find({ where: { id: In(tagIds || []) } });
    // let tags: Tag[] = [];
    // for (let i = 0; i < tagIds.length; i++) {
    //   const tag = await Tag.findOne({ where: { id: tagIds[i] } });
    //   if (tag) {
    //     tags.push(tag);
    //   }
    // }

    const post = Post.create({
      title,
      body,
      user,
      tags,
    });
    await post.save();
    res.json({ data: post });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = +req.params.id;
    const posts = await Post.delete(id);
    res.json({ message: "deleted post with id: " + id });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/:id/comment", async (req, res) => {
  try {
    const { body, userId } = req.body;
    const user = await User.findOne({ where: { id: userId } });
    const postId = +req.params.id;
    const post = await Post.findOne({ where: { id: postId } });
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found, please enter a valid user" });
    if (!post) return res.status(404).json({ message: "Post not found" });
    const comment = Comment.create({
      body,
      user,
      post,
    });
    await comment.save();
    res.json({ data: comment });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/:id/vote", async (req, res) => {
  try {
    const { voteStatus, userId } = req.body;
    const user = await User.findOne({ where: { id: userId } });
    const postId = +req.params.id;
    const post = await Post.findOne({ where: { id: postId } });
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found, please enter a valid user" });
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (+voteStatus !== 1 && +voteStatus !== -1)
      return res
        .status(500)
        .json({ message: "invalid input (should be either 1 or -1" });
    //await the vote.find if it's there update the votestatus if not create a new vote

    const userVote = await Vote.findOne({
      where: { user: { id: userId }, post: { id: postId } },
    });
    if (!userVote) {
      const vote = Vote.create({
        voteStatus,
        post,
        user,
      });
      await vote.save();
      res.json({ data: vote });
    } else {
      const vote = await Vote.update(userVote.id, {
        voteStatus,
      });
      res.json({ data: vote });
    }

    // const vote = Vote.create({
    //   voteStatus,
    //   post,
    //   user,
    // });
    // await vote.save();
    // res.json({ data: vote });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
