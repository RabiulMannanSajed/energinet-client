import { useState } from "react";
import {
  Menu,
  X,
  Home,
  BarChart3,
  LineChart,
  BookOpen,
  User,
  LogOut,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo1.png";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Dashboard", path: "/navbar", icon: <Home size={22} /> },
    { name: "Trades", path: "/navbar/trades", icon: <BarChart3 size={22} /> },
    {
      name: "Forecast",
      path: "/navbar/forecast",
      icon: <LineChart size={22} />,
    },
    { name: "Learn", path: "/navbar/learn", icon: <BookOpen size={22} /> },
    { name: "Profile", path: "/navbar/profile", icon: <User size={22} /> },
  ];

  const handleLogout = () => {
    // ✅ Remove data from localStorage
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    // ✅ Redirect to home page
    navigate("/");
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ease-in-out bg-white border-r border-gray-200 shadow-md flex flex-col justify-between ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-5 border-b border-gray-100">
            {isOpen && <img src={logo} alt="Logo" className="h-8 w-auto" />}
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-sky-600 transition-colors"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-4">
            <ul>
              {navItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    end={item.path === "/navbar"}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 mx-2 mb-1 rounded-lg text-base font-medium transition-all duration-200 ${
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
            className="flex items-center gap-3 w-full text-gray-600 hover:text-sky-600"
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
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#F0FAF7] p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
