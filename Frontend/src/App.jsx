import "./App.css";
import { Outlet } from "react-router-dom";
import Navbarcomponent from "./components/Navbarcomponent";
import Footer from "./components/Footer";
import { routeApi } from "./api/api";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logoutUser } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await routeApi.get("/users/me", {
          withCredentials: true,
        });
        console.log(res);

        dispatch(setUser(res?.data?.user));
      } catch (err) {
        dispatch(logoutUser());
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <Navbarcomponent />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
