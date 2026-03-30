import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, CircleUserRound } from "lucide-react";

const Navbarcomponent = () => {
  const navigate = useNavigate();

  const pages = [
    { name: "Doctors", id: 1, route: "/doctors" },
    { name: "Sign In", id: 2, route: "/signin" },
    { name: "Contact Us", id: 3, route: "/contact" },
  ];

  const [isopen, setIsopen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 bg-white shadow-sm z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-4">
        <h1
          className="font-bold text-xl sm:text-2xl text-teal-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Medify
        </h1>

        <ul className="hidden md:flex items-center gap-6 lg:gap-8 font-medium">
          {pages.map((e) => (
            <li key={e.id}>
              <NavLink
                to={e.route}
                className={({ isActive }) =>
                  isActive
                    ? "text-teal-600 border-b-2 border-teal-600 pb-1"
                    : "hover:text-teal-600 transition"
                }
              >
                {e.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 sm:gap-4">
          <CircleUserRound
            onClick={() => navigate("/profile")}
            size={26}
            className="cursor-pointer text-gray-600 hover:text-teal-600"
          />

          <div className="md:hidden">
            {isopen ? (
              <X
                onClick={() => setIsopen(false)}
                size={28}
                className="cursor-pointer"
              />
            ) : (
              <Menu
                onClick={() => setIsopen(true)}
                size={28}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>

      {isopen && (
        <div className="md:hidden px-4 pb-4">
          <div className="bg-white rounded-xl shadow-md p-5 space-y-4 border">
            {pages.map((e) => (
              <NavLink
                key={e.id}
                to={e.route}
                onClick={() => setIsopen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "block text-teal-600 font-semibold"
                    : "block text-gray-700 hover:text-teal-600"
                }
              >
                {e.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbarcomponent;
