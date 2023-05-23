import React from "react";
import MainLayout from "../../Components/MainLayout";
import BreadCrumb from "../../Components/BreadCrumb";
import { images } from "../../constants";
import { Link } from "react-router-dom";
import SuggestedPost from "./Container/SuggestedPost";
import CommentContainer from "../../Components/Comments/CommentContainer";
import SocialShareButton from "../../Components/SocialShareButton";

const BreadCrumbData = [
  { name: "Home", link: "/" },
  { name: "Blog", link: "/blog/1" },
  { name: "Article title", link: "/article" },
];

const TagsData = [
  "Education",
  "Health",
  "Environment",
  "Education",
  "Health",
  "Environment",
  "Education",
];

const SuggestedPostData = [
  {
    _id: 1,
    title: "Help children get better education",
    image: images.poster1,
    createdAt: "2023-01-28T00:00:00.000Z",
  },
  {
    _id: 2,
    title: "Help children get better education",
    image: images.poster1,
    createdAt: "2023-01-28T00:00:00.000Z",
  },
  {
    _id: 3,
    title: "Help children get better education",
    image: images.poster1,
    createdAt: "2023-01-28T00:00:00.000Z",
  },
];

function ArticleDetailPage() {
  return (
    <MainLayout>
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
        <article className="flex-1 md:mx-auto">
          <BreadCrumb data={BreadCrumbData} />
          <img
            src={images.poster1}
            className="w-full rounded-xl mt-5 md:w-full mx-auto "
            alt="laptop"
          />
          <Link
            to="/blogCategory = selected"
            className="text-primary font-roboto inline-block mt-5  md:font-bold md:text-lg"
          >
            Eduction
          </Link>
          <h1 className="text-3xl font-medium font-roboto mt-5 text-dark-hard">
            Help children get better education
          </h1>
          <div className="flex items-center mt-5 text-dark-soft mb-10">
            <p className="leading-7 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor vel
              possimus ullam cum maiores expedita ab saepe sunt, amet
              voluptatem! Dolore dolores delectus inventore nisi sed, aut ut
              sunt odit!
            </p>
          </div>
          <CommentContainer loginUserId="a" />
        </article>
        <div>
          <SuggestedPost
            Header={"Latest Articles"}
            post={SuggestedPostData}
            tags={TagsData}
            className={"mt-8 lg:mt-16 lg:max-w-xs"}
          />
          <div className="mt-7">
            <h2 className="text-2xl font-medium font-roboto mt-5 text-dark-hard">
              Share on:
            </h2>
            <SocialShareButton
              url={encodeURI("https://www.google.com/")}
              title={encodeURIComponent("Google")}
            />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default ArticleDetailPage;
