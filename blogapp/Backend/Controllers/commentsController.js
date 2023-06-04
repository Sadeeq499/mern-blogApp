import Post from "../Models/PostModel.js";
import Comment from "../Models/CommentModel.js";

// ---------------Create a new Comment---------------------------------------
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
// ---------------Edit or--Update a Comment------------------------------------------------------------
export const UpdateComment = async (req, res, next) => {
  try {
    const { desc } = req.body;
    const { commentId } = req.params;
    const Editedcomment = await Comment.findById(commentId);

    if (!Editedcomment) {
      const err = new Error("Comment  not found");
      next(err);
    }
    // update with new comment if not new comment then use old comment
    Editedcomment.desc = desc || Editedcomment.desc;

    const savedComment = await Editedcomment.save();

    return res.json(savedComment);
  } catch (error) {
    next(error);
  }
};
// ----------------Delete the comment or comments------------------------------------

export const DeleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const deleteComment = await Comment.findByIdAndDelete(commentId);
    await Comment.deleteMany({ parent: commentId });

    if (!deleteComment) {
      const err = new Error("Comment not found");
      next(err);
    }
    return res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};
