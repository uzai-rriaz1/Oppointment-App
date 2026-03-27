import "./App.css";
import { Outlet } from "react-router-dom";
import Navbarcomponent from "./components/Navbarcomponent";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbarcomponent />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
