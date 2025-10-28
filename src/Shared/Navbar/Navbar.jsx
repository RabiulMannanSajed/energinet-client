import { useState } from "react";
import {
  Menu,
  X,
  Home,
  BarChart3,
  LineChart,
  BookOpen,
  User,
  Bell,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/logo1.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);

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
    // { name: "Notification", path: "/notification", icon: <Bell size={22} /> },
  ];

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ease-in-out bg-white border-r border-gray-200 shadow-md ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
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
                  end={item.path === "/navbar"} // ✅ only Dashboard has 'end'
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

      {/* Main Content */}
      <div className="flex-1 bg-[#F0FAF7] p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
