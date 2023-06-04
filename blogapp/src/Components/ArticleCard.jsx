import React from "react";
import { images, stables } from "../constants";
import { AiFillCheckCircle } from "react-icons/ai";
import { VscVerifiedFilled } from "react-icons/vsc";
import { GoUnverified } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ArticleCard({ post, className }) {
  const AuthToken = useSelector((state) => state.user.userInfo);

  return (
    <>
      <div
        className={`rounded-xl overflow-hidden shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] ${className}`}
      >
        {/* if user has a token then leave it to deati page else show login first message */}
        <Link
          to={AuthToken != null ? `/blog/${post.slug}` : "/login"}
          // to={`blog/${post.slug}`}
        >
          <img
            src={
              post.photo
                ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
                : images.imageNotFound
            }
            alt="first article"
            className="w-full  object-cover object-center h-[300px]"
          />
        </Link>
        <div className="p-5">
          <Link to={`/blog/${post.slug}`}>
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
          </Link>
          <p className="text-sm text-gray-500 mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            voluptatum.
          </p>
          <div className="flex justify-between flex-nowrap items-center mt-5">
            <div className="flex items-center gap-x-2">
              <img
                src={
                  post.user.avatar
                    ? stables.UPLOAD_FOLDER_BASE_URL + post.user.avatar
                    : images.imageNotFound
                }
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <h1 className="text-sm font-bold italic text-dark-soft">
                  {post.caption}
                </h1>
                <div className="flex items-center gap-x-2">
                  <span className="p-2">
                    {post.user.verified ? (
                      <VscVerifiedFilled className="text-green-300 w-5 h-5" />
                    ) : (
                      <GoUnverified className="text-red-500 w-5 h-5" />
                    )}
                  </span>
                  <span>
                    <p className="text-xs text-gray-500 italic">
                      {post.user.verified ? "Verified" : "Unverified"} writer
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-500 font-bold  text-[20px]">
              {new Date(post.createdAt).getDate()}{" "}
              {new Date(post.createdAt).toLocaleString("default", {
                month: "long",
              })}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticleCard;
