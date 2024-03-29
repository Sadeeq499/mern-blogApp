import React from "react";
import ArticleCard from "../../Components/ArticleCard";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllPosts } from "../../Service/index/posts";
import { toast } from "react-hot-toast";
import ArticleCardSkeleton from "../../Components/ArticleCardSkeleton";
import ErrorMessage from "../../Components/ErrorMessage";

function Article() {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
  });

  return (
    <section className="container mx-auto px-5">
      <div className=" flex flex-wrap gap-y-5 md:gap-x-5">
        {
          // ---------------if loading-----------------
          isLoading ? (
            [...Array(3)].map((item, index) => {
              return (
                <ArticleCardSkeleton
                  key={index}
                  className={
                    "w-full   md:w-[calc(50%-20px)]  lg:w-[calc(33.33%-21px)]"
                  }
                />
              );
            })
          ) : // ----------------------else-if error -------------------------------------------
          isError ? (
            <ErrorMessage message={"Oops Something went wrong"} />
          ) : (
            // ---------else render the cards -------------------------------------------------------------
            data.data.map((post) => {
              return (
                <ArticleCard
                  key={post._id}
                  post={post}
                  className="w-full   md:w-[calc(50%-20px)]  lg:w-[calc(33.33%-21px)]"
                />
              );
            })
          )
        }
      </div>
      <button className="mx-auto mt-14 flex h-[40] w-[200px] items-center rounded-lg border-2 border-blue-600 p-3 font-bold text-primary hover:bg-primary hover:text-white ">
        <span className="mx-auto text-center font-roboto font-bold">
          More articles
        </span>
        <span className="">
          <AiOutlineArrowRight className="h-5 w-5" />
        </span>
      </button>
    </section>
  );
}

export default Article;
