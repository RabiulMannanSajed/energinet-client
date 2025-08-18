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

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Admin Dashboard", path: "/", icon: <Home size={28} /> },
    {
      name: "Courses",
      path: "/adminNavbar/course",
      icon: <BarChart3 size={28} />,
    },
  ];
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-900/90 text-white transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-16"
        }`}
        // condition : true: false
      >
        <div className="flex items-center justify-between px-4 py-4">
          {isOpen && <h1 className="text-3xl font-semibold">EnergiNet</h1>}
          <button onClick={toggleSidebar} className="text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-4 text-2xl hover:bg-gray-500 ${
                      isActive
                        ? "text-blue-400 font-semibold  bg-gray-600"
                        : "text-gry-300/50 hover:text-white"
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
      <div className="flex-1 bg-gray-900 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminNavbar;
