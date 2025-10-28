// import { useState } from "react";
// import { Menu, X, Home, BarChart3 } from "lucide-react";
// import { NavLink, Outlet } from "react-router-dom";
// import { FaRegChartBar, FaRegUser, FaUser } from "react-icons/fa";
// import { MdOutlineFolderDelete, MdOutlinePlayLesson } from "react-icons/md";

// const AdminNavbar = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const navItems = [
//     { name: "Admin Dashboard", path: "/adminNavbar", icon: <Home size={28} /> },
//     {
//       name: "Trades",
//       path: "/adminNavbar/adminTreads",
//       icon: <FaRegChartBar size={28} />,
//     },
//     {
//       name: "Courses",
//       path: "/adminNavbar/course",
//       icon: <MdOutlinePlayLesson size={28} />,
//     },
//     {
//       name: "Deleted Courses",
//       path: "/adminNavbar/deletedCourses",
//       icon: <MdOutlineFolderDelete size={28} />,
//     },
//     {
//       name: "User Activity",
//       path: "/adminNavbar/userActivity",
//       icon: <FaRegUser size={28} />,
//     },
//   ];
//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div
//         className={`bg-gray-900/90 text-white transition-all duration-300 ease-in-out ${
//           isOpen ? "w-64" : "w-16"
//         }`}
//         // condition : true: false
//       >
//         <div className="flex items-center justify-between px-4 py-4">
//           {isOpen && <h1 className="text-3xl font-semibold">EnergiNet</h1>}
//           <button onClick={toggleSidebar} className="text-white">
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//         <nav className="mt-4">
//           <ul>
//             {navItems.map((item, index) => (
//               <li key={index}>
//                 <NavLink
//                   to={item.path}
//                   className={({ isActive }) =>
//                     `flex items-center gap-3 px-4 py-4 text-2xl hover:bg-gray-500 ${
//                       isActive
//                         ? "text-blue-400 font-semibold  bg-gray-600"
//                         : "text-gry-300/50 hover:text-white"
//                     }`
//                   }
//                 >
//                   {item.icon}
//                   {isOpen && <span>{item.name}</span>}
//                 </NavLink>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>

//       {/* Main content */}
//       <div className="flex-1 bg-[#F0FAF7] p-6 overflow-y-auto">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default AdminNavbar;

import { useState } from "react";
import { Menu, X, Home } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { FaRegChartBar, FaRegUser } from "react-icons/fa";
import { MdOutlineFolderDelete, MdOutlinePlayLesson } from "react-icons/md";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Admin Dashboard", path: "/adminNavbar", icon: <Home size={22} /> },
    {
      name: "Trades",
      path: "/adminNavbar/adminTreads",
      icon: <FaRegChartBar size={22} />,
    },
    {
      name: "Courses",
      path: "/adminNavbar/course",
      icon: <MdOutlinePlayLesson size={22} />,
    },
    {
      name: "Deleted Courses",
      path: "/adminNavbar/deletedCourses",
      icon: <MdOutlineFolderDelete size={22} />,
    },
    {
      name: "User Activity",
      path: "/adminNavbar/userActivity",
      icon: <FaRegUser size={22} />,
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-md border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          {isOpen && (
            <h1 className="text-2xl font-bold text-sky-700 tracking-wide">
              EnergiNet
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-sky-600 transition"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <nav className="mt-5">
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  end={item.path === "/adminNavbar"}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-5 py-3 mx-2 mb-1 rounded-lg transition-all duration-200 text-base font-medium ${
                      isActive
                        ? "bg-sky-100 text-sky-700 border-l-4 border-sky-500"
                        : "text-gray-600 hover:bg-sky-50 hover:text-sky-700"
                    }`
                  }
                >
                  {item.icon}
                  {isOpen && <span>{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-[#F8FBFD] p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminNavbar;
