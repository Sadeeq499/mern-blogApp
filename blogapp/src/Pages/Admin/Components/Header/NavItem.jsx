import React from "react";
import { NavLink } from "react-router-dom";

function NavItem({ title, icon, link, name, active, setActive }) {
  return (
    <NavLink
      to={link}
      className={`${
        name === active
          ? "font-bold text-blue-500"
          : "text-gray-500 hover:text-blue-500"
      } flex items-center gap-x-2 py-2 text-lg font-medium`}
      onClick={() => setActive(name)}
    >
      {icon}
      {title}
    </NavLink>
  );
}

export default NavItem;
