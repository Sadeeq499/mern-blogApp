import React from "react";
import { Link } from "react-router-dom";
import { images, stables } from "../../../constants";

function SuggestedPost({ className, Header, post = [], tags }) {
  return (
    <div
      className={`w-full rounded-lg  p-4   shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] ${className}`}
    >
      <h1 className="mb-2 font-roboto font-bold text-dark-hard">{Header}</h1>
      <div className="mt-5 grid gap-y-5 md:grid-cols-2 md:gap-x-5 lg:grid-cols-1 lg:gap-x-5">
        {post?.data?.map((item, index) => (
          <div key={index} className="flex flex-nowrap items-center space-x-3">
            <img
              src={
                item?.photo
                  ? stables.UPLOAD_FOLDER_BASE_URL + item?.photo
                  : images.imageNotFound
              }
              alt="avatar"
              className="aspect-square h-16 w-16 rounded-xl object-cover object-center"
            />
            <div className="font-roboto text-sm font-medium text-dark-hard">
              <Link
                to={`/blog/${item.slug}`}
                className="hover:underline hover:decoration-sky-400  hover:decoration-wavy"
              >
                <h1 className="text-base">{item.title}</h1>
              </Link>
              <span className="text-xs opacity-60">
                {new Date(item.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
      <h2 className="mt-10 font-roboto  font-bold text-dark-hard">Tags </h2>

      {tags.length === 0 ? (
        <p className="mt-5 font-roboto text-dark-hard">No Tags</p>
      ) : (
        <div className="mt-7 flex flex-wrap gap-x-2 gap-y-2 font-bold">
          {tags.map((item, index) => (
            <Link
              to={"/"}
              key={index}
              className="inline-block rounded-md bg-primary px-2  py-1.5 font-roboto text-xs font-medium text-white "
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SuggestedPost;
