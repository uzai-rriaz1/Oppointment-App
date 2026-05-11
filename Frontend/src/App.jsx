import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import Navbarcomponent from "./components/Navbarcomponent";
import Footer from "./components/Footer";
import { routeApi } from "./api/api";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logoutUser, setUser } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await routeApi.get("/users/me", {
          withCredentials: true,
        });

        dispatch(
          setUser({
            id: res?.data?.user?._id,
            email: res?.data?.user?.email,
            role: res?.data?.user?.role,
            name: res?.data?.user?.name,
          }),
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  // ✅ better: supports nested routes too
  const hideLayoutRoutes = ["/signin", "/signup", "/dashboard"];

  const shouldHideLayout = hideLayoutRoutes.some((route) =>
    location.pathname.startsWith(route),
  );

  return (
    <>
      {<Navbarcomponent />}

      <Outlet />

      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default App;
