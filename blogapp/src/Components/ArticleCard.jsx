import React from "react";
import { images } from "../constants";
import { AiFillCheckCircle } from "react-icons/ai";

function ArticleCard({ className }) {
  return (
    <>
      <div
        className={`rounded-xl overflow-hidden shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] ${className}`}
      >
        <img
          src={images.poster1}
          alt="first article"
          className="w-full  object-cover object-center h-[300px]"
        />
        <div className="p-5">
          <h1 className="text-2xl font-bold mb-2">Article Title</h1>
          <p className="text-sm text-gray-500 mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            voluptatum.
          </p>
          <div className="flex justify-between flex-nowrap items-center mt-5">
            <div className="flex items-center gap-x-2">
              <img
                src={images.avatar1}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <h1 className="text-sm font-bold italic text-dark-soft">
                  Author Name
                </h1>
                <div className="flex items-center gap-x-2">
                  <span className="p-2">
                    <AiFillCheckCircle className="text-green-300 w-5 h-5" />
                  </span>
                  <span>
                    <p className="text-xs text-gray-500">Verified</p>
                  </span>
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-500 font-bold  text-[20px]">
              2 May
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticleCard;
