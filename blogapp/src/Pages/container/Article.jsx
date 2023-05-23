import React from "react";
import ArticleCard from "../../Components/ArticleCard";
import { AiOutlineArrowRight } from "react-icons/ai";

function Article() {
  return (
    <section className="container mx-auto px-5">
      <div className=" flex flex-wrap md:gap-x-5 gap-y-5">
        <ArticleCard className="w-full   md:w-[calc(50%-20px)]  lg:w-[calc(33.33%-21px)]" />
        <ArticleCard className="w-full   md:w-[calc(50%-20px)]  lg:w-[calc(33.33%-21px)]" />
      </div>
      <button className="mx-auto flex items-center mt-14 rounded-lg w-[200px] h-[40] font-bold text-primary border-2 border-blue-600 p-3 hover:bg-primary hover:text-white ">
        <span className="font-bold text-center mx-auto font-roboto">
          More articles
        </span>
        <span className="">
          <AiOutlineArrowRight className="w-5 h-5" />
        </span>
      </button>
    </section>
  );
}

export default Article;
