import Post from "../Models/PostModel.js";
import Comment from "../Models/CommentModel.js";

export const CreateComment = async (req, res, next) => {
  try {
    const { desc, slug, parent, replayOnUser } = req.body;
    const post = await Post.findOne({ slug: slug });

    if (!post) {
      const err = new Error("Post not found");
      next(err);
    }
    // create a new comment
    const newComment = new Comment({
      user: req.user._id,
      desc,
      post: post._id,
      parent,
      replayOnUser,
    });

    const savedComment = await newComment.save();
    return res.json(savedComment);
  } catch (error) {
    next(error);
  }
};
