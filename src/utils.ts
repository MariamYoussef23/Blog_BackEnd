import { Post } from "./entities/post";

export const getPostDetails = (post: Post) => {
    return {
        ...post, commentsTotal: post.comments.length
    }
};
