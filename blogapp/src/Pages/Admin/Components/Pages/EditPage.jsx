import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { parseJsonToHtml } from "../../../../Components/Helper/BodyPraser";
import ArticleDetailSkeleton from "../../../ArticlesDetail/components/ArticleDetailPageSkeleton";
import ErrorMessage from "../../../../Components/ErrorMessage";
import { stables } from "../../../../constants";
import { HiOutlineCamera } from "react-icons/hi";
import { getSinglePost, updatePost } from "../../../../Service/index/posts";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Editor from "../../../../Editor/Editor";

function EditPage() {
  const { slug } = useParams();
  const [initialPhoto, setInitialPhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [body, setBody] = useState(null);
  const userState = useSelector((state) => state.user.userInfo);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["data", `${slug}`],
    queryKey: ["data", slug],
  });

  const {
    mutate: mutateUpdatePost,
    isLoading: isLoadingUpdatePost,
    isError: isErrorUpdatePost,
  } = useMutation({
    mutationFn: ({ updateData, slug, token }) =>
      updatePost({ updateData, slug, token }),
    mutationKey: ["updatePost"],
    onSuccess: (data) => {
      queryClient.invalidateQueries(["data", slug]);
      toast.success("Post updated successfully");
    },
    onError: (error) => {
      toast.error("Something went wrong");
      console.log(error);
    },
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      setInitialPhoto(data?.photo);
      // setBody(parseJsonToHtml(data?.body));
    }
  }, [data, isError, isLoading]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleUpdatePost = () => {
    let updateData = new FormData();
    if (!initialPhoto && photo) {
      updateData.append("postPicture", photo);
    } else if (initialPhoto && !photo) {
      const urlToObject = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], initialPhoto.name, { type: blob.type });
      };
      const file = urlToObject(stables.UPLOAD_FOLDER_BASE_URL + data?.photo);
      updateData.append("postPicture", file);
    }
    updateData.append("document", JSON.stringify({ body }));

    mutateUpdatePost({ updateData, slug, token: userState.token });
  };

  return (
    <section className="container mx-auto flex max-w-5xl flex-col px-5 py-5 lg:flex-row lg:items-start lg:gap-x-5">
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message={"Oops something went wrong"} />
      ) : (
        <>
          <article className="flex-1 md:mx-auto">
            <label>
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt={data?.title}
                  className="h-96 w-full rounded-md object-cover"
                />
              ) : initialPhoto ? (
                <img
                  src={stables.UPLOAD_FOLDER_BASE_URL + data?.photo}
                  alt={data?.title}
                  className="h-96 w-full rounded-md object-cover"
                />
              ) : (
                <div
                  className="mt-5  flex h-72 w-full
                  cursor-pointer items-center justify-center rounded-md bg-blue-50/50
                
                "
                >
                  <HiOutlineCamera className="text-6xl text-primary" />
                </div>
              )}

              <input
                type="file"
                name="photo"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
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
            <div className=" w-full">
              {!isLoading && !isError && (
                <Editor
                  content={data?.body}
                  onDataChange={(data) => setBody(data)}
                  editable={true}
                />
              )}
            </div>
            <button
              className="rounded-md bg-primary px-5 py-2 text-white"
              onClick={handleUpdatePost}
            >
              UpdatePOst
            </button>
          </article>
        </>
      )}
    </section>
  );
}

export default EditPage;
