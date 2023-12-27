import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { parseJsonToHtml } from "../../../../Components/Helper/BodyPraser";
import ArticleDetailSkeleton from "../../../ArticlesDetail/components/ArticleDetailPageSkeleton";
import ErrorMessage from "../../../../Components/ErrorMessage";
import { stables } from "../../../../constants";
import { HiOutlineCamera } from "react-icons/hi";
import { getSinglePost, updatePost } from "../../../../Service/index/posts";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import CreateableSelect from "react-select/creatable";
import Editor from "../../../../Editor/Editor";
import MultiSelectTagDropdown from "../Header/SelectDropdown/multiSelectTagDropdown";
import { getAllCategories } from "../../../../Service/index/postCategories";
import {
  filterCategories,
  categoryToOption,
} from "../../../../Utils/multiSelectTagUtil";

const promiseOptions = async (inputValue) => {
  const categoriesData = await getAllCategories();
  return filterCategories(inputValue, categoriesData);
};

function EditPage() {
  const { slug } = useParams();
  const [initialPhoto, setInitialPhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [body, setBody] = useState(null);
  const [categories, setCategories] = useState(null);
  const [title, setTitle] = useState(null);
  const [tags, setTags] = useState(null);
  const [caption, setCaption] = useState(null);
  const [postSlug, setPostSlug] = useState(slug);

  const userState = useSelector((state) => state.user.userInfo);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["data", slug],
    onSuccess: (data) => {
      setInitialPhoto(data?.photo);
      setCategories(data?.categories.map((category) => category.value));
      setTitle(data?.title);
      setCaption(data?.caption);
      setTags(data?.tags);
    },
    refetchOnWindowFocus: false,
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
      console.log(data);
      queryClient.invalidateQueries(["data", slug]);
      toast.success("Post updated successfully");
      navigate(`/admin/posts/manage/edit/${data?.slug}}`, { replace: true });
    },
    onError: (error) => {
      toast.error("Something went wrong");
      console.log(error);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleUpdatePost = async () => {
    let updateData = new FormData();

    if (!initialPhoto && photo) {
      updateData.append("postPicture", photo);
    } else if (initialPhoto && !photo) {
      const urlToObject = async (url) => {
        let response = await fetch(url);
        let blob = await response.blob();
        const file = new File([blob], initialPhoto, { type: blob.type });
        return file;
      };
      const picture = await urlToObject(
        stables.UPLOAD_FOLDER_BASE_URL + data?.photo
      );
      updateData.append("postPicture", picture);
    }

    updateData.append(
      "document",
      JSON.stringify({ body, categories, title, caption, tags, slug: postSlug })
    );
    mutateUpdatePost({ updateData, slug, token: userState.token });
  };

  return (
    <section className="container mx-auto flex w-full flex-col bg-white px-5 py-5 lg:flex-row lg:items-start lg:gap-x-5">
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message={"Oops something went wrong"} />
      ) : (
        <>
          <article className="max-w-4xl flex-1 md:mx-auto">
            <label>
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt={data?.title}
                  className="h-96 w-full cursor-pointer rounded-md object-cover"
                />
              ) : initialPhoto ? (
                <img
                  src={stables.UPLOAD_FOLDER_BASE_URL + data?.photo}
                  alt={data?.title}
                  className="h-96 w-full cursor-pointer rounded-md object-cover"
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
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => {
                  setPhoto(null);
                  setInitialPhoto(null);
                }}
                className="rounded-md bg-red-500 px-5 py-2 text-white"
              >
                Delete Image
              </button>
            </div>
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
            <div className="d-form-control w-full">
              <label className="label" htmlFor="title">
                <span className="label-text">Title</span>
              </label>
              <input
                id="title"
                className="input-bordered d-input border-slate-500 font-roboto text-3xl font-medium text-dark-hard !outline-gray-400 "
                defaultValue={data?.title}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="d-form-control w-full">
              <label className="label" htmlFor="slug">
                <span className="label-text">Slug</span>
              </label>
              <input
                id="slug"
                className="d-input-bordered d-input border-slate-500 font-roboto text-3xl font-medium text-dark-hard !outline-gray-400 "
                value={postSlug}
                onChange={(e) =>
                  setPostSlug(e.target.value.replace(/\s/g, "-"))
                }
                placeholder="Slug"
              />
            </div>

            <div className="d-form-control w-full">
              <label className="label" htmlFor="caption">
                <span className="label-text">Caption</span>
              </label>
              <input
                id="caption"
                className="input-bordered d-input border-slate-500 font-roboto text-xl font-medium text-dark-hard !outline-gray-400 "
                defaultValue={data?.caption}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>

            <div className="my-5">
              <label className="label">
                <span className="label-text">Categories</span>
              </label>
              <MultiSelectTagDropdown
                loadOptions={promiseOptions}
                defaultValue={data?.categories.map(categoryToOption)}
                onChange={(newValue) =>
                  setCategories(newValue?.map((item) => item.value))
                }
              />
            </div>

            <div className="my-5">
              <label className="label">
                <span className="label-text">Tags</span>
              </label>
              <CreateableSelect
                isMulti
                defaultValue={data?.tags.map((tags) => {
                  return { value: tags, label: tags };
                })}
                onChange={(newValue) =>
                  setTags(newValue?.map((item) => item.value))
                }
                className="relative z-20"
              />
            </div>

            <div className=" h-[50vh] w-full overflow-y-auto border border-gray-300 bg-white">
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
