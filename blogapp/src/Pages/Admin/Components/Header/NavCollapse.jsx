// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// function NavCollapse({ title, icon, name, items, active, setActive }) {
//   const [open, setIsOpen] = useState(false);

//   useEffect(() => {
//     if (name === active) {
//       setIsOpen(true);
//     } else {
//       setIsOpen(false);
//     }
//   }, [active, name]);

//   return (
//     <div className="collapse collapse-arrow bg-base-200 min-h-0 rounded-none py-2">
//       <input
//         type="checkbox"
//         className="min-h-0 py-0"
//         checked={name === active}
//         onChange={() => {
//           setActive(name);
//           setIsOpen(!open);
//         }}
//       />
//       <div
//         className={`collapse-title  min-h-0 py-0 flex items-center gap-x-2
//         font-medium text-lg
//           ${
//             name === active
//               ? "font-bold text-blue-500"
//               : "font-semibold text-gray-500 hover:text-blue-500"
//           }
//       `}
//       >
//         {icon}
//         {title}
//       </div>
//       <div className="collapse-content">
//         <div className="mt-2 flex flex-col gap-y-2">
//           {items.map((item, index) => (
//             <Link to={item.Link} key={index}>
//               {item.title}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NavCollapse;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NavCollapse({ title, icon, name, items, active, setActive }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (active !== name) {
      setIsOpen(false);
    }
  }, [active, name]);

  const handleToggle = () => {
    setActive(name);
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapse-arrow collapse min-h-0 rounded-none bg-base-200 py-2">
      <input
        type="checkbox"
        className="min-h-0 py-0"
        checked={isOpen}
        onChange={handleToggle}
      />
      <div
        className={`collapse-title flex min-h-0 items-center gap-x-2 py-0 text-lg font-medium ${
          name === active
            ? "font-bold text-blue-500"
            : "font-semibold text-gray-500 hover:text-blue-500"
        }`}
      >
        {icon}
        {title}
      </div>
      {isOpen && (
        <div className="collapse-content">
          <div className="mt-2 flex flex-col gap-y-2">
            {items.map((item, index) => (
              <Link to={item.Link} key={index}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavCollapse;
