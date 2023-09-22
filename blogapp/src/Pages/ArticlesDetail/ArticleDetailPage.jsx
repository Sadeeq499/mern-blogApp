import React, { useState } from "react";
import MainLayout from "../../Components/MainLayout";
import BreadCrumb from "../../Components/BreadCrumb";
import { images, stables } from "../../constants";
import { Link, useParams } from "react-router-dom";
import SuggestedPost from "./Container/SuggestedPost";
import CommentContainer from "../../Components/Comments/CommentContainer";
import SocialShareButton from "../../Components/SocialShareButton";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts, getSinglePost } from "../../Service/index/posts";
import ArticleDetailSkeleton from "./components/ArticleDetailPageSkeleton";
import ErrorMessage from "../../Components/ErrorMessage";
import { useSelector } from "react-redux";
import { parseJsonToHtml } from "../../../src/Components/Helper/BodyPraser";
import Editor from "../../Editor/Editor";

function ArticleDetailPage() {
  //--------------------------------------------------------------
  const { slug } = useParams();
  // states
  const userState = useSelector((state) => state.user);
  const [BreadCrumbdata, setBreadCrumb] = useState([]);
  const [body, setBody] = useState(null);

  // ---------------------get SinglePost Data--------------------------------------------------
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["data", `${slug}`],
    onSuccess: (data) => {
      setBreadCrumb([
        { name: "Home", link: "/" },
        { name: "Blog", link: "/blog" },
        { name: "Article title", link: `/blog/${data.slug}` },
      ]);
      setBody(parseJsonToHtml(data?.body));
    },
  });

  // ----------------------------get All post for Suggested -----------------------------------------------------------------------
  const { data: SuggestedPostData } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
  });

  // ---------------------------------------------------------------------------------------------------
  return (
    <MainLayout>
      <section className="container mx-auto flex max-w-5xl flex-col px-5 py-5 lg:flex-row lg:items-start lg:gap-x-5">
        {isLoading ? (
          <ArticleDetailSkeleton />
        ) : isError ? (
          <ErrorMessage message={"Oops something went wrong"} />
        ) : (
          <>
            <article className="flex-1 md:mx-auto">
              <BreadCrumb data={BreadCrumbdata} />
              <img
                src={
                  data?.photo
                    ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
                    : images.imageNotFound
                }
                className="mx-auto mt-5 w-full rounded-xl md:w-full "
                alt={data?.title}
              />
              <div className="mt-4 flex gap-2">
                {data?.categories.map((category) => {
                  return (
                    <Link
                      to={`/blog?category = ${category.name}`}
                      className="mt-5 inline-block font-roboto text-primary  md:text-lg md:font-bold"
                    >
                      {category.name}
                    </Link>
                  );
                })}
              </div>
              <h1 className="mt-5 font-roboto text-3xl font-medium text-dark-hard">
                {data?.title}
              </h1>
              <div className="w-full">
                {!isLoading && !isError && (
                  <Editor content={data?.body} editable={false} />
                )}
              </div>
              <CommentContainer
                loginUserId={userState?.userInfo?._id}
                comments={data?.comments}
                postSlug={slug}
              />
            </article>
            <div className="px-5">
              <SuggestedPost
                Header={"Latest Articles"}
                post={SuggestedPostData}
                tags={data?.tags}
                className={"mt-8 lg:mt-16 lg:max-w-xs"}
              />
              <div className="mt-7">
                <h2 className="mt-5 font-roboto text-2xl font-medium text-dark-hard">
                  Share on:
                </h2>
                <SocialShareButton
                  url={encodeURI(window.location.href)}
                  title={encodeURIComponent(data?.title)}
                />
              </div>
            </div>
          </>
        )}
      </section>
    </MainLayout>
  );
}

export default ArticleDetailPage;
