import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import { CircleUserRound } from "lucide-react";

const Navbarcomponent = () => {
  const navigate = useNavigate();
  const pages = [
    { name: "Doctors", id: 1, route: "/doctors" },
    { name: "Sign In", id: 2, route: "/signin" },
    { name: "Contact Us", id: 3, route: "/contact" },
  ];
  const [isopen, setIsopen] = useState(false);

  return (
    <nav className=" flex w-full fixed top-0 left-0 items-center justify-between py-5 px-7">
      <div>
        <h1
          className="font-bold text-3xl hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          Medify
        </h1>
      </div>
      <div className="max-sm:hidden">
        <ul className="flex space-x-5">
          {pages.map((e) => (
            <li key={e.id}>
              <NavLink
                to={e.route}
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-blue-600 pb-1" : ""
                }
              >
                {e.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <CircleUserRound onClick={() => navigate("/profile")} size={26} />
      </div>
      <div className="md:hidden lg:hidden">
        {isopen ? (
          <X
            className="fixed top-14 z-1 right-5 hover:cursor-pointer"
            onClick={() => setIsopen(false)}
            size={26}
            color="white"
          />
        ) : (
          <Menu
            onClick={() => setIsopen(true)}
            size={26}
            className="hover:cursor-pointer"
          />
        )}
      </div>
      {isopen && (
        <div className="bg-blue-600 fixed top-10 right-3 px-8 py-16 rounded-2xl">
          <ul className="flex flex-col space-x-5 space-y-3">
            {pages.map((e) => (
              <li key={e.id}>
                <NavLink
                  to={e.route}
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-2 border-white pb-1 text-white"
                      : "text-white"
                  }
                >
                  {e.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbarcomponent;
