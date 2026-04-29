import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, CircleUserRound } from "lucide-react";
import { useSelector } from "react-redux";

const Navbarcomponent = () => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.user?.user?.role);

  const pages = [
    ...(role === "patient"
      ? [{ name: "Doctors", id: 1, route: "/doctors" }]
      : []),
    { name: "Sign In", id: 2, route: "/signin" },
    { name: "Contact Us", id: 3, route: "/contact" },
  ];

  const [isopen, setIsopen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleOpen = () => {
    setShowSidebar(true);
    setTimeout(() => setIsopen(true), 10);
  };

  const handleClose = () => {
    setIsopen(false);
    setTimeout(() => setShowSidebar(false), 900);
  };

  return (
    <nav className="w-full fixed top-0 left-0 bg-white shadow-sm z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-4">
        <h1
          className="font-bold text-xl sm:text-2xl text-teal-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Medify
        </h1>

        <ul className="hidden">
          {pages.map((e) => (
            <li key={e.id}>
              <NavLink to={e.route}>{e.name}</NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 sm:gap-4">
          {isopen ? (
            <X onClick={handleClose} size={28} className="cursor-pointer" />
          ) : (
            <Menu onClick={handleOpen} size={28} className="cursor-pointer" />
          )}
        </div>
      </div>

      {showSidebar && (
        <>
          <div
            className={`hidden md:block fixed inset-0 bg-black/30 z-40 transition-opacity duration-700 ${
              isopen ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleClose}
          ></div>

          <div
            className={`hidden md:flex fixed top-0 right-0 h-full w-64 bg-white shadow-md z-50 p-6 flex-col transform transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isopen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h1
                className="font-bold text-xl text-teal-600 cursor-pointer"
                onClick={() => {
                  navigate("/");
                  handleClose();
                }}
              >
                Medify
              </h1>

              <X
                onClick={handleClose}
                size={24}
                className="cursor-pointer text-gray-600 hover:text-teal-600"
              />
            </div>

            <div className="flex flex-col gap-4">
              {pages.map((e) => (
                <NavLink
                  key={e.id}
                  to={e.route}
                  onClick={handleClose}
                  className={({ isActive }) =>
                    isActive
                      ? "text-teal-600 font-semibold"
                      : "text-gray-700 hover:text-teal-600"
                  }
                >
                  {e.name}
                </NavLink>
              ))}
            </div>

            <div className="mt-auto pt-6">
              <CircleUserRound
                onClick={() => {
                  navigate("/profile");
                  handleClose();
                }}
                size={28}
                className="cursor-pointer text-gray-600 hover:text-teal-600"
              />
            </div>
          </div>
        </>
      )}

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
