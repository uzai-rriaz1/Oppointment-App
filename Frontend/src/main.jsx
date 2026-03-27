import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { lazy } from "react";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profle from "./pages/Profle.jsx";

const Signin = lazy(() => import("./pages/Signin"));
const Contact = lazy(() => import("./pages/Contact"));
const Doctors = lazy(() => import("./pages/Doctors"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const Reset = lazy(() => import("./pages/Reset.jsx"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />

          <Route
            path="/doctors"
            element={
              <Suspense fallback={<div>Loading doctors...</div>}>
                <Doctors />
              </Suspense>
            }
          />

          <Route
            path="/signin"
            element={
              <Suspense fallback={<div>Loading sign in page...</div>}>
                <Signin />
              </Suspense>
            }
          />

          <Route
            path="/contact"
            element={
              <Suspense fallback={<div>Loading contact...</div>}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<div>Loading signup ...</div>}>
                {<Signup />}
              </Suspense>
            }
          ></Route>
          <Route path="/reset" element={<Reset />} />
          <Route path="/profile" element={<Profle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
