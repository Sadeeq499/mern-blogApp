import { useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineDashboard,
  AiOutlineMenu,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { images } from "../../../../constants";
import { FaComment } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import NavItem from "./NavItem";
import NavCollapse from "./NavCollapse";
import { useWindowSize } from "@uidotdev/usehooks";

const ManuItems = [
  {
    title: "Dashboard",
    icon: <AiOutlineDashboard />,
    link: "/admin",
    name: "dashboard",
    type: "link",
  },
  {
    title: "Comments",
    icon: <FaComment />,
    link: "/admin/comments",
    name: "comments",
    type: "link",
  },
  {
    title: "Posts",
    icon: <MdDashboard />,
    name: "posts",
    type: "collapse",
    items: [
      {
        name: "new",
        title: "New",
        link: "/admin/posts/new",
      },
      {
        name: "manage",
        title: "Manage",
        link: "/admin/posts/manage",
      },
    ],
  },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState("dashboard");
  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width < 1024) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  }, [windowSize.width]);

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
              {ManuItems.map((item, index) =>
                item.type === "link" ? (
                  <NavItem
                    key={index}
                    title={item.title}
                    icon={item.icon}
                    link={item.link}
                    active={active}
                    setActive={setActive}
                    name={item.name}
                  />
                ) : (
                  <NavCollapse
                    key={index}
                    title={item.title}
                    icon={item.icon}
                    items={item.items}
                    active={active}
                    setActive={setActive}
                    name={item.name}
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
