import React from "react";
import { images, stables } from "../../constants";
import { MdOutlineQuickreply, MdOutlineDeleteOutline } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import CommentForm from "./CommentForm";

function Comment({
  comment,
  loginUserId,
  affectedComment,
  setAffectedComment,
  addComment,
  parentId = null,
  updateComment,
  deleteComment,
  getReplyComments,
}) {
  const isUserLogin = Boolean(loginUserId);
  const CommentsBelongToUser = comment.user._id === loginUserId;
  const isReplying =
    affectedComment &&
    affectedComment.type === "replying" &&
    affectedComment._id === comment._id;

  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment._id === comment._id;

  const repliedCommentId = parentId ? parentId : comment._id;
  const replyOnUser = comment.user._id;
  return (
    <div className=" flex flex-nowrap items-start gap-x-3 bg-[#F2FAF5] p-3 rounded-lg">
      {/* user profile */}
      <img
        src={
          comment?.user.avatar
            ? stables.UPLOAD_FOLDER_BASE_URL + comment.user.avatar
            : images.imageNotFound
        }
        alt="profile"
        className="w-10 h-10 rounded-full object-cover"
      />
      {/* user name */}
      <div className="flex flex-col gap-y-1">
        <h5 className="font-bold text-dark-hard text-xs">
          {comment.user.name}
        </h5>

        {/* time on which commented */}
        <span className="flex text-xs text-dark-light">
          {new Date(comment.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
          })}
        </span>
        <p className="font-roboto mt-[10px] text-dark-light">{comment.desc}</p>
        {/* replay , edit, delete button */}
        <div className="flex items-center gap-x-3 text-dark-light font-roboto text-sm mt-3 mb-3">
          {/* if user is logged in then allow him to replay  */}
          {isUserLogin && (
            <button
              className="flex items-center space-x-2"
              onClick={() =>
                setAffectedComment({ type: "replying", _id: comment._id })
              }
            >
              <MdOutlineQuickreply className="w-4 h-auto" />
              <span>Reply</span>
            </button>
          )}

          {/* if and show the user belong comments */}

          {CommentsBelongToUser && (
            <>
              <button
                className="flex items-center space-x-2"
                onClick={() =>
                  setAffectedComment({ type: "editing", _id: comment._id })
                }
              >
                <FiEdit2 className="w-4 h-auto" />
                <span>Edit</span>
              </button>

              <button
                className="flex items-center space-x-2"
                onClick={() => deleteComment(comment._id)}
              >
                <MdOutlineDeleteOutline className="w-4 h-auto" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
        {isReplying && (
          <CommentForm
            btnText={"Reply"}
            formSubmitHandler={(value) =>
              addComment(value, repliedCommentId, replyOnUser)
            }
            CancelHandler={() => setAffectedComment(null)}
          />
        )}

        {isEditing && (
          <CommentForm
            btnText={"Update"}
            formSubmitHandler={(value) => updateComment(value, comment._id)}
            CancelHandler={() => setAffectedComment(null)}
            initialText={comment.desc}
          />
        )}

        {/* if comment has replies then show them */}
        {Array.isArray(getReplyComments) && getReplyComments.length > 0 && (
          <div className="flex flex-col gap-y-2">
            {getReplyComments.map((reply) => (
              <Comment
                key={reply._id}
                comment={reply}
                affectedComment={affectedComment}
                addComment={addComment}
                loginUserId={loginUserId}
                setAffectedComment={setAffectedComment}
                parentId={comment._id}
                updateComment={updateComment}
                deleteComment={deleteComment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
