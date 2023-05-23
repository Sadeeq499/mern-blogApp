import React from "react";
import CommentForm from "./CommentForm";
import { useState } from "react";
import { getCommentsData } from "../../Data/Comment";
import { useEffect } from "react";
import Comment from "./Comment";

export default function CommentContainer({ loginUserId }) {
  const [comments, setComments] = useState([]);
  const mainComments = comments.filter((item) => item.parent === null);
  const [affectedComment, setAffectedComment] = useState(null);

  console.log(comments);

  useEffect(() => {
    getCommentsData().then((res) => setComments(res));
  }, []);

  // Add comment Function

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    const newComment = {
      _id: Math.random().toString(),
      user: {
        _id: "a",
        name: "Mohammad Rezaii",
      },
      desc: value,
      post: "1",
      parent: parent,
      replyOnUser: replyOnUser,
      createdAt: new Date().toISOString(),
    };
    setComments([...comments, newComment]);
    setAffectedComment(null);
  };

  //   // Update comment Function
  const updateCommentHandler = (value, commentId) => {
    const updateComment = comments.map((item) => {
      if (item._id === commentId) {
        return { ...item, desc: value };
      }
      return item;
    });
    setComments(updateComment);
    setAffectedComment(null);
  };

  //   // Delete comment Function
  const deleteCommentHandler = (commentId) => {
    const deleteComment = comments.filter((item) => item._id !== commentId);
    setComments(deleteComment);
  };

  // get the reply comment
  const getReplyComments = (parentCommentId) => {
    return comments
      .filter((item) => item.parent === parentCommentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  return (
    <div>
      {/* Comment Form */}
      <CommentForm
        btnText="Post Comment"
        CommentHandler={(value) => addCommentHandler(value)}
      />

      {/* redrying the new Comment */}
      <div className="space-y-5 mt-10">
        {mainComments.map((item, index) => (
          <Comment
            key={index}
            comment={item}
            loginUserId={loginUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentHandler}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
            getReplyComments={getReplyComments(item._id)}
          />
        ))}
      </div>
    </div>
  );
}
