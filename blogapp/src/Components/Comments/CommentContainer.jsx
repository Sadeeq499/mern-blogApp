import React from "react";
import CommentForm from "./CommentForm";
import { useState } from "react";
import { getCommentsData } from "../../Data/Comment";
import { useEffect } from "react";
import Comment from "./Comment";

export default function CommentContainer({ loginUserId, comments }) {
  const [affectedComment, setAffectedComment] = useState(null);

  // Add comment Function

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {};

  //   // Update comment Function
  const updateCommentHandler = (value, commentId) => {};

  //   // Delete comment Function
  const deleteCommentHandler = (commentId) => {};

  return (
    <div>
      {/* Comment Form */}
      <CommentForm
        btnText="Post Comment"
        CommentHandler={(value) => addCommentHandler(value)}
      />

      {/* redrying the new Comment */}
      <div className="space-y-5 mt-10">
        {comments.map((item, index) => (
          <Comment
            key={index}
            comment={item}
            loginUserId={loginUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentHandler}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
            getReplyComments={item.replies}
          />
        ))}
      </div>
    </div>
  );
}
