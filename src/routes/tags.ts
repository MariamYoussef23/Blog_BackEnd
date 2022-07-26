import { Router } from "express";
import { Post } from "../entities/post";
import { Tag } from "../entities/tag";

const router = Router();

router.get("/", async (req, res) => {
  try {
    let tags = await Tag.find({
      relations: {
        posts: { user: true },
      },
    });
    res.json({ data: tags });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = +req.params.id;
    const tag = await Tag.findOne({
      where: { id },
      relations: {
        posts: { user: true },
      },
    });
    if (!tag) return res.status(404).json({ message: "Tag not found!" });
    res.json({ data: tag });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    const tag = Tag.create({ title });

    await tag.save();
    res.json({ data: tag });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/link", async (req, res) => {
  try {
    const { postId, tagId } = req.body;
    console.log({ postId, tagId })
    const tag = await Tag.findOne({
      where: { id: tagId },
    });
    if (!tag) return res.status(404).json({ message: "Tag not found!" });

    const post = await Post.findOne({
      where: { id: postId }, relations: {tags: true},
    });
    if (!post) return res.status(404).json({ message: "Post not found!" });

    console.log({post,tag})
    post.tags.push(tag);
    
    await post.save();
    res.json({ data: post });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
