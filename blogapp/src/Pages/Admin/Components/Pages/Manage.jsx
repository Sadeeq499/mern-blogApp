import React, { useState, useEffect } from "react";
// utilities
import { images, stables } from "../../../../constants";
import { deletePost, getAllPosts } from "../../../../Service/index/posts";
// components
import Pagination from "../../../../Components/pagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// styling
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Manage() {
  // ===========================hooks============================
  const [search, setSearch] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const userState = useSelector((state) => state.user.userInfo);
  const queryClient = useQueryClient();

  // ==================================== useQuery ==============================
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryFn: () => getAllPosts(search, currentPage),
    queryKey: ["posts"],
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
  });

  const { mutate: deleteUserPosts, isLoading: loadingPostDelete } = useMutation(
    {
      mutationFn: ({ token, slug }) => {
        return deletePost({
          token,
          slug,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"]);
        toast.success("Post Deleted Successfully");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [refetch, currentPage]);

  // ================================functions==============================

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const handleDeletePost = (slug) => {
    try {
      deleteUserPosts({ token: userState.token, slug });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  //   ================================jsx==============================
  return (
    <div className="w-full px-4">
      <h1 className="font-roboto font-bold text-blue-600">Manage Posts</h1>
      <div className="py-8">
        <div className="mb-1 flex w-full flex-row justify-between sm:mb-0">
          <h2 className="text-2xl leading-tight">Users</h2>
          <div className="text-end">
            <form
              onSubmit={handleSubmit}
              className="flex w-3/4 max-w-sm flex-col justify-center space-y-3 md:w-full md:flex-row md:space-x-3 md:space-y-0"
            >
              <div className="relative">
                <input
                  type="text"
                  id="form-subscribe-Filter"
                  className="w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Search by title"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  value={search}
                />
              </div>
              <button
                className="flex-shrink-0 rounded-lg bg-purple-600 px-4 py-2 text-base font-semibold text-white shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                type="submit"
              >
                Filter
              </button>
            </form>
          </div>
        </div>
        <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                  >
                    CATEGORY
                  </th>
                  <th
                    scope="col"
                    className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                  >
                    cREATED AT
                  </th>
                  <th
                    scope="col"
                    className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                  >
                    TAGS
                  </th>
                  <th
                    scope="col"
                    className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {isLoading || isFetching ? (
                  <tr>
                    <td colSpan={5}>
                      <div className="flex w-full items-center justify-center py-32 ">
                        <h1 className="text-2xl font-bold text-gray-400">
                          Loading...
                        </h1>
                      </div>
                    </td>
                  </tr>
                ) : data?.data?.length === 0 ? (
                  <tr>
                    <td colSpan={12}>
                      <div className="flex w-full items-center justify-center py-32">
                        <h1 className="text-2xl font-bold text-gray-400">
                          No Posts Found
                        </h1>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data?.data.map((post) => (
                    <tr key={post.id}>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <a href="#" className="relative block">
                              <img
                                src={
                                  post?.image
                                    ? stables.UPLOAD_FOLDER_BASE_URL +
                                      post?.image
                                    : images.imageNotFound
                                }
                                alt="profil"
                                className="mx-auto h-10 w-10 rounded-full object-cover"
                              />
                            </a>
                          </div>
                          <div className="ml-3">
                            <p className="whitespace-no-wrap text-gray-900">
                              {post?.title}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap text-gray-900">
                          {post?.categories.length > 0
                            ? post?.categories[0]
                            : "No Category"}
                        </p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap text-gray-900">
                          {new Date(post?.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </td>
                      <td className="border-b border-gray-200 bg-white  py-5 text-sm">
                        <div className="flex flex-col gap-y-3">
                          {post?.tags.length > 0 ? (
                            post?.tags.map((tag, index) => (
                              <span
                                key={index}
                                className=" w-32 items-center rounded-full bg-gray-100 px-2  py-1 text-center text-xs font-medium text-gray-800 transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white"
                              >
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className=" w-32 items-center rounded-full bg-gray-100 px-2  py-1 text-center text-xs font-medium text-gray-800 transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white">
                              No Tags
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="border-b border-gray-200 bg-white  py-5">
                        <div className="flex gap-10">
                          <button
                            onClick={() => handleDeletePost(post?.slug)}
                            className="cursor-pointer text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                          <Link
                            to={`/admin/posts/manage/edit/${post?.slug}`}
                            className="cursor-pointer text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {!isLoading && (
              <Pagination
                onPageChange={(page) => setCurrentPage(page)}
                currentPage={currentPage}
                totalPageCount={JSON.parse(data?.headers?.["x_total_pages"])}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Manage;
