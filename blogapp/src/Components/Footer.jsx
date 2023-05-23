import React from "react";
import { images } from "../constants";
import { BsFacebook } from "react-icons/bs";
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineLinkedin,
  AiFillHeart,
} from "react-icons/ai";

function Footer() {
  return (
    <>
      <section className="bg-dark-hard">
        <footer className="container mx-auto grid grid-cols-10 px-10 py-10 gap-x-10 gap-y-10 md:grid-cols-12 lg:col-span-10 lg:gap-x-10">
          <div className="col-span-5 md:col-span-4 lg:col-span-2">
            <h3 className=" text-dark-light font-bold md:text-lg">Product</h3>
            <ul className="text-dark-light mt-5 space-y-3">
              <li>
                {" "}
                <a href="/">Overview</a>
              </li>
              <li>
                {" "}
                <a href="/">Pricing</a>
              </li>
              <li>
                {" "}
                <a href="/">Marketplace</a>
              </li>
              <li>
                {" "}
                <a href="/">Features</a>
              </li>
              <li>
                {" "}
                <a href="/">Integrations</a>
              </li>
            </ul>
          </div>

          {/* service */}
          <div className="col-span-5 md:col-span-4 lg:col-span-2 lg:gap-x-0">
            <h3 className=" text-dark-light font-bold md:text-lg">Services</h3>
            <ul className="text-dark-light mt-5 space-y-3">
              <li>
                {" "}
                <a href="/">Overview</a>
              </li>
              <li>
                {" "}
                <a href="/">Pricing</a>
              </li>
              <li>
                {" "}
                <a href="/">Marketplace</a>
              </li>
              <li>
                {" "}
                <a href="/">Features</a>
              </li>
              <li>
                {" "}
                <a href="/">Integrations</a>
              </li>
            </ul>
          </div>

          {/* company */}
          <div className="col-span-5 md:col-span-4 md:col-start-5 lg:col-span-2">
            <h3 className=" text-dark-light font-bold md:text-lg">Company</h3>
            <ul className="text-dark-light mt-5 space-y-3">
              <li>
                {" "}
                <a href="/">Overview</a>
              </li>
              <li>
                {" "}
                <a href="/">Pricing</a>
              </li>
              <li>
                {" "}
                <a href="/">Marketplace</a>
              </li>
              <li>
                {" "}
                <a href="/">Features</a>
              </li>
              <li>
                {" "}
                <a href="/">Integrations</a>
              </li>
            </ul>
          </div>

          {/* more */}
          <div className="col-span-5 md:col-span-4 lg:col-span-2">
            <h3 className=" text-dark-light font-bold md:text-lg">More</h3>
            <ul className="text-dark-light mt-5 space-y-3">
              <li>
                {" "}
                <a href="/">Overview</a>
              </li>
              <li>
                {" "}
                <a href="/">Pricing</a>
              </li>
              <li>
                {" "}
                <a href="/">Marketplace</a>
              </li>
              <li>
                {" "}
                <a href="/">Features</a>
              </li>
              <li>
                {" "}
                <a href="/">Integrations</a>
              </li>
            </ul>
          </div>

          {/* logo and social media links */}
          {/* <div> */}
          {/* // logo */}
          <div className="col-span-10 space-y-5 md:order-first md:col-span-4 mx-auto">
            <img
              src={images.Logo}
              className="mx-24 brightness-0 invert md:mx-0"
              alt="logo"
            />
            <p className=" justify-center text-dark-light font-semibold mt-2 md:text-left">
              Build a modern and creative website with crealand{" "}
            </p>
            <ul className="flex justify-center items-center mt-5 space-x-3 text-gray-300 md:justify-start">
              <li>
                <a href="/">
                  <BsFacebook className="w-8 h-8" />
                </a>
              </li>
              <li>
                <a href="/">
                  <AiOutlineTwitter className="w-8 h-8" />
                </a>
              </li>
              <li>
                <a href="/">
                  <AiOutlineInstagram className="w-8 h-8" />
                </a>
              </li>
              <li>
                <a href="/">
                  <AiOutlineYoutube className="w-8 h-8" />
                </a>
              </li>
              <li>
                <a href="/">
                  <AiOutlineLinkedin className="w-8 h-8" />
                </a>
              </li>
            </ul>
          </div>
          {/* </div> */}
          <div className="hidden md:flex flex-col items-center space-4 md:col-span-12 mt-5">
            <div className="bg-primary rounded-full text-white p-3">
              <AiFillHeart className="w-7 h-auto " />
            </div>
            <p className="text-dark-light font-semibold pt-2">
              Copyright © 2023. Crafted with love.
            </p>
          </div>
        </footer>
      </section>
    </>
  );
}

export default Footer;
