import { Link } from "lucide-react";
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/logo2.png";
const HomeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navbar */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* logo */}
            <div className="flex items-center gap-4">
              {/* <Link to="/" className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-green-500 flex items-center justify-center text-white font-bold"></div>
              </Link> */}
              <img src={logo} alt="Logo" className="h-15 w-auto" />{" "}
            </div>

            {/* desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    `text-md font-medium ${
                      isActive
                        ? "text-green-600"
                        : "text-gray-600 hover:text-gray-800"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* actions */}
            <div className="flex items-center gap-4 text-md font-medium text-gray-600 hover:text-gray-800">
              {/* avatar */}
              <NavLink to="signup">SignUp</NavLink>
            </div>
          </div>
        </div>

        {/* mobile nav */}
        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 pt-3 pb-4 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-2 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "text-indigo-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <Link
                to="/dashboard"
                className="block px-2 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 text-center"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* spacer so content isn't under the fixed header */}
      <div className="h-16" />

      {/* Outlet for nested routes */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeNavbar;
