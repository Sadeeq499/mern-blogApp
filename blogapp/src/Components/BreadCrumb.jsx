import React from "react";
import { Link } from "react-router-dom";

function BreadCrumb({ data }) {
  return (
    <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap ">
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className="md:text-sm text-black opacity-50 font-roboto"
          >
            <Link
              to={item.link}
              className={`text-sm font-bold${
                index === data.length - 1 ? "text-dark" : "text-dark-light"
              }`}
            >
              {item.name}
            </Link>
            {index !== data.length - 1 && (
              <span className="text-sm font-bold text-dark-light mx-2">/</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default BreadCrumb;
