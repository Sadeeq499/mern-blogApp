import React from "react";

function ArticleCardSkeleton({ className }) {
  return (
    <>
      <div
        className={`rounded-xl overflow-hidden shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] ${className}`}
      >
        {/* image */}
        <div className="w-full aspect-video bg-slate-300" />
        <div className="p-5">
          {/* title */}
          <div className="w-56 h-2 mt-4 bg-slate-300" />

          {/* caption */}

          <div className="w-24 h-2 mt-4 bg-slate-300 rounded-lg" />
          <div className="flex justify-between flex-nowrap items-center mt-5">
            <div className="flex items-center gap-x-2">
              {/*  profile image*/}
              <div className="w-9 h-9 md:w-10 rounded-full bg-slate-300" />
              <div className="flex flex-col">
                {/* username */}
                <div className="w-24 h-2 bg-slate-300" />
                {/* verified status */}
                <div className="w-16 h-2 mt-2 bg-slate-300 rounded-lg" />
              </div>
            </div>
            {/* date */}
            <div className="w-10 h-2 mt-4 bg-slate-300 rounded-lg" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticleCardSkeleton;
