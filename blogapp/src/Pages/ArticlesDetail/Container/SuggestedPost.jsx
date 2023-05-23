import React from "react";
import { Link } from "react-router-dom";

function SuggestedPost({ className, Header, post = [], tags }) {
  return (
    <div
      className={`w-full rounded-lg  shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]   p-4 ${className}`}
    >
      <h1 className="font-roboto font-bold text-dark-hard mb-2">{Header}</h1>
      <div className="grid gap-y-5 mt-5 md:grid-cols-2 md:gap-x-5 lg:grid-cols-1 lg:gap-x-5">
        {post.map((item, index) => (
          <div key={index} className="flex space-x-3 flex-nowrap items-center">
            <img
              src={item.image}
              alt="avatar"
              className="aspect-square object-cover object-center w-16 h-16 rounded-xl"
            />
            <div className="text-sm font-roboto text-dark-hard font-medium">
              <h3>{item.title}</h3>
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
      <h2 className="text-dark-hard font-bold  font-roboto mt-5">Tags </h2>
      <div className="flex flex-wrap gap-x-2 mt-7 gap-y-2 font-bold">
        {tags.map((item, index) => (
          <Link
            to={"/"}
            key={index}
            className="inline-block rounded-md px-2 py-1.5  bg-primary font-roboto text-white text-xs font-medium "
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SuggestedPost;
