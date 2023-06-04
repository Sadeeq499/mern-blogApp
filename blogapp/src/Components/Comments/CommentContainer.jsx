import React from "react";
import CommentForm from "./CommentForm";
import { useState } from "react";
import { getCommentsData } from "../../Data/Comment";
import { useEffect } from "react";
import Comment from "./Comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UpdateComment,
  createComment,
  deleteComment,
} from "../../Service/index/comments";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

export default function CommentContainer({ loginUserId, comments, postSlug }) {
  // -------------------------states-----------------------------------------
  const [affectedComment, setAffectedComment] = useState(null);
  const AuthToken = useSelector((state) => state.user.userInfo.token);
  const queryClient = useQueryClient();

  // -----------------Create new Comment ------------------------------------------------------
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ token, desc, slug, parent, replayOnUser }) => {
      return createComment({
        token,
        desc,
        slug,
        parent,
        replayOnUser,
      });
    },
    onSuccess: (data) => {
      toast.success("Comment Added Successfully wait for approval");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  // --------------------Edit Comment---------------------------------------------------------------------------
  const { mutate: EditComment } = useMutation({
    mutationFn: ({ token, desc, commentId }) => {
      return UpdateComment({
        token,
        desc,
        commentId,
      });
    },
    onSuccess: (data) => {
      toast.success("Comment Updated Successfully");
      queryClient.invalidateQueries(["data", `${postSlug}`]);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  // --------------------Delete Comment---------------------------------------------------------------------------
  const { mutate: DeleteComment } = useMutation({
    mutationFn: ({ token, commentId }) => {
      return deleteComment({
        token,
        commentId,
      });
    },
    onSuccess: (data) => {
      toast.success("Comment Deleted Successfully");
      queryClient.invalidateQueries(["data", `${postSlug}`]);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  //-------------------------------------------------------------------------------------------------

  // Add comment Function
  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    mutate({
      token: AuthToken,
      desc: value,
      slug: postSlug,
      parent,
      replyOnUser,
    });
  };

  //   // Update comment Function
  const updateCommentHandler = (value, commentId) => {
    EditComment({
      token: AuthToken,
      desc: value,
      commentId,
    });
  };

  //   // Delete comment Function
  const deleteCommentHandler = (commentId) => {
    DeleteComment({
      token: AuthToken,
      commentId,
    });
  };
  // ----------------------------------------------------------------------------------------------------
  return (
    <div>
      {/* Comment Form */}
      <CommentForm
        btnText="Post Comment"
        formSubmitHandler={(value) => addCommentHandler(value)}
        isLoading={isLoading}
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
