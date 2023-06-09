import React from "react";
import { images } from "../constants";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/action/user";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  // states
  const userState = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [profileDropDown, setprofileDropDown] = useState(false);
  const navigate = useNavigate();
  // redux tool kits
  const dispatch = useDispatch();

  // navItem names
  const NavItemsInfo = [
    { name: "Home", type: "link", href: "/" },
    { name: "Articles", type: "link", href: "/articles" },
    {
      name: "Pages",
      type: "dropdown",
      items: [
        { title: "About Us", href: "/about" },
        { title: "Contact Us", href: "/contact" },
      ],
    },
    { name: "Pricing", type: "link", href: "/price" },
    { name: "FAQ", type: "link", href: "/faq" },
  ];

  // navItem
  const NavItems = ({ item }) => {
    return (
      <li className="relative group">
        {item.type === "link" ? (
          <>
            <Link to={item.href} className="px-4 py-2">
              {item.name}
            </Link>
            <span className="cursor-pointer text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
              /
            </span>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <button
              className="px-4 py-2 flex gap-x-1 items-center"
              onClick={dropdownToggle}
            >
              <span>{item.name}</span>
              <MdOutlineArrowDropDown />
            </button>
            <div
              className={`${
                dropdown ? "block" : "hidden"
              } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
            >
              <ul className="bg-dark-soft lg:bg-transparent text-center flex-col shadow-lg rounded-lg overflow-hidden ">
                {item.items.map((item, index) => (
                  <li
                    className="lg:bg-white hover:bg-dark-soft hover:text-white px-4 py-2"
                    key={index}
                  >
                    <Link to={item.href}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </li>
    );
  };

  // functions
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  // navbar toggle
  const toggle = () => {
    setVisible(!visible);
  };

  //dropdown toggle
  const dropdownToggle = () => {
    setDropdown(!dropdown);
  };

  return (
    <>
      <section className="sticky top-0 left-0 right-0 z-50 bg-white">
        <header className="container mx-auto px-5 flex justify-between py-5 items-center">
          {/* logo  */}
          <Link to={"/"}>
            <img className="w-16" src={images.Logo} alt="logo" />
          </Link>
          {/* navbar toggle */}
          <div className="lg:hidden z-50">
            <button onClick={toggle}>
              {visible ? (
                <AiOutlineClose className="text-3xl" />
              ) : (
                <GiHamburgerMenu className="text-3xl" />
              )}
            </button>
          </div>

          {/* navbar burger menu */}
          <div
            className={`${visible ? "right-0" : "-right-full"}
               transition-all duration-500   mt-[56px] lg:mt-0  bg-dark-hard lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row  fixed top-0 bottom-0  lg:static gap-x-10 items-center`}
          >
            <ul className="text-white lg:text-dark-soft items-center gap-y-5 flex flex-col lg:flex-row gap-x-5 font-semibold mt-5">
              {NavItemsInfo.map((item, index) => (
                <NavItems key={index} item={item} />
              ))}
            </ul>

            {/* if the user is logged in rander the it's profile and desboard else signup button */}
            {userState.userInfo ? (
              <div className="text-white lg:text-dark-soft items-center gap-y-5 flex flex-col lg:flex-row gap-x-3 font-semibold mt-5">
                <div className="relative group">
                  <div className="flex flex-col items-center">
                    <button
                      className="px-4 py-2 flex gap-x-1 items-center"
                      onClick={() => setprofileDropDown(!profileDropDown)}
                    >
                      <span>Profile</span>
                      <MdOutlineArrowDropDown />
                    </button>
                    <div
                      className={`${
                        profileDropDown ? "block" : "hidden"
                      } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
                    >
                      <ul className="bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
                        {userState.userInfo.isAdmin && (
                          <button
                            onClick={() => navigate("/admin")}
                            type="button"
                            className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                          >
                            Admin Dashboard
                          </button>
                        )}
                        <button
                          onClick={() => navigate("/profile")}
                          type="button"
                          className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                        >
                          Profile Page
                        </button>
                        <button
                          onClick={logoutHandler}
                          type="button"
                          className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                        >
                          Logout
                        </button>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate("/register")}
                className="border-2 border-blue-500 px-6 py-2 mt-5 rounded-full text-blue-700 hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                Sign in
              </button>
            )}
          </div>
        </header>
      </section>
    </>
  );
}

export default Header;
