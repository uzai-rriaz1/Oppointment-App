import "./App.css";
import { Outlet } from "react-router-dom";
import Navbarcomponent from "./components/Navbarcomponent";
import Footer from "./components/Footer";
import { routeApi } from "./api/api";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logoutUser, setUser } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await routeApi.get("/users/me", {
          withCredentials: true,
        });
        console.log("CURRENT USER", res);

        dispatch(
          setUser({
            id: res?.data?.user?._id,
            email: res?.data?.user?.email,
            role: res?.data?.user?.role,
            name: res?.data?.user?.name,
          }),
        );
      } catch (err) {
        // dispatch(logoutUser());
        console.log(err);
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
