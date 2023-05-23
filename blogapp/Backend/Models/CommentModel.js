import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    desc: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    check: { type: Boolean, default: false },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    replayOnUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", CommentSchema);

export default Comment;
