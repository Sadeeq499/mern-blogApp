import React from "react";
import { BsFacebook, BsTwitter, BsInstagram, BsWhatsapp } from "react-icons/bs";

function SocialShareButton({ url, title }) {
  return (
    // facebook
    <div className="w-full flex justify-start mt-7 lg:justify-between ">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mr-3"
      >
        <BsFacebook className="w-12 h-auto text-primary" />
      </a>

      {/* twitter */}
      <a
        href={`https://twitter.com/intent/tweet?text=${title}&url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mr-3"
      >
        <BsTwitter className="w-12 h-auto text-[#1DA1F2]" />
      </a>

      {/* instagram */}
      <a
        href={`https://www.instagram.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mr-3"
      >
        <BsInstagram className="w-12 h-auto p-1 rounded-xl bg-gradient-to-br from-yellow-400 via-red-500 to-blue-500  text-white" />
      </a>

      {/* whatsapp */}
      <a
        href={`https://api.whatsapp.com/send?text=${title}&url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mr-3"
      >
        <BsWhatsapp className="w-12 h-auto text-green-500" />
      </a>
    </div>
  );
}

export default SocialShareButton;
