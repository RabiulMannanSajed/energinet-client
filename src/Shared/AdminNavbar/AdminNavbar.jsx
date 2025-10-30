import { useState } from "react";
import { Menu, X, Home } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaRegChartBar, FaRegUser, FaRegUserCircle } from "react-icons/fa";
import {
  MdOutlineFolderDelete,
  MdOutlinePlayLesson,
  MdLogout,
} from "react-icons/md";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

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
      name: "Courses Upload",
      path: "/adminNavbar/courseUpload",
      icon: <MdOutlineFolderDelete size={22} />,
    },
    {
      name: "User Activity",
      path: "/adminNavbar/userActivity",
      icon: <FaRegUser size={22} />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-md border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col justify-between ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        <div>
          {/* Header */}
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

          {/* Navigation */}
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

        {/* Profile Section */}
        <div className="relative border-t border-gray-100 p-4">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 w-full text-gray-600 hover:text-sky-600 transition"
          >
            <FaRegUserCircle size={22} />
          </button>

          {/* Dropdown menu */}
          {showProfileMenu && (
            <div className="absolute bottom-16 left-4 right-4 bg-white shadow-lg rounded-lg border border-gray-200">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <MdLogout size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-[#F8FBFD] p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminNavbar;
