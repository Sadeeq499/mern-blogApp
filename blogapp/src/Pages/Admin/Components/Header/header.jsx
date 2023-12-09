import { useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineDashboard,
  AiOutlineMenu,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../../../../constants";
import { FaComment } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import NavItem from "./NavItem";
import NavCollapse from "./NavCollapse";
import { useWindowSize } from "@uidotdev/usehooks";
import { createPost } from "../../../../Service/index/posts";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../store/reducer/userReducer";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState("dashboard");
  const windowSize = useWindowSize();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { token } = useSelector(userSelector);

  const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } =
    useMutation({
      mutationFn: ({ slug, token }) => {
        return createPost({
          token,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"]);
        toast.success("Post created successfully");
        console.log(data);
        navigate(`/admin/posts/manage/edit/${data?.slug}`);
      },
      onError: (error) => {
        toast.error("Error creating post");
      },
    });

  useEffect(() => {
    if (windowSize.width < 1024) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  }, [windowSize.width]);

  const handleCreatePost = () => {
    mutateCreatePost({ token });
  };

  return (
    <header
      className="flex h-fit w-full items-center justify-between p-5
      lg:h-full lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start
      lg:p-0
    "
    >
      {/* logo */}
      <Link to={"/"}>
        <img src={images.Logo} alt="logo" className="w-20 lg:hidden" />
      </Link>

      {/* burger menu  icons */}
      <div className="cursor-pointer lg:hidden">
        {isMenuOpen ? (
          <AiOutlineClose
            className="text-3xl lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        ) : (
          <AiOutlineMenu
            className="text-3xl lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        )}
      </div>

      {/* sidebar container */}
      {isMenuOpen && (
        <div className="fixed inset-0 lg:static lg:h-full lg:w-full ">
          {/* underlay */}
          <div
            className="fixed inset-0 bg-black opacity-50 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          {/* sidebar */}
          <div
            className="fixed bottom-0 left-0 top-0 z-50 w-3/4 overflow-y-auto bg-white p-5
              lg:static lg:h-full lg:w-full lg:p-6
            "
          >
            <Link to={"/"}>
              <img src={images.Logo} alt="logo" className="w-20" />
            </Link>
            <h4 className=" mt-10 text-2xl font-semibold">Main Menu</h4>

            {/* menu items */}
            <div className="mt-6 flex flex-col gap-y-[0.563rem]">
              <NavItem
                title="Dashboard"
                icon={<AiOutlineDashboard className="text-xl" />}
                link="/admin"
                name="dashboard"
                active={active}
                setActive={setActive}
              />
              <NavItem
                title="Comments"
                icon={<FaComment className="text-xl" />}
                link="/admin/comments"
                name="comments"
                active={active}
                setActive={setActive}
              />
              <NavCollapse
                title="Posts"
                icon={<MdDashboard className="text-xl" />}
                name="posts"
                active={active}
                setActive={setActive}
              >
                <button
                  disabled={isLoadingCreatePost}
                  className="w-full text-left text-sm font-semibold text-gray-500
                   hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => handleCreatePost()}
                >
                  New
                </button>
                <Link to={"/admin/posts/manage"}> Manage </Link>
              </NavCollapse>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
