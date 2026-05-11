import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { lazy } from "react";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profle from "./pages/Profle.jsx";
import {
  QueryClientProvider,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import { StoreProvider } from "./store/Store.jsx";
import { routeApi } from "./api/api.js";
import RouteProtector from "./routePotector/RouteProtector.jsx";
import RoldebasedProtector from "./routePotector/RoldebasedProtector.jsx";
import Appointment from "./pages/Appointment.jsx";
import { Oval } from "react-loader-spinner";

const queryClient = new QueryClient();

const Signin = lazy(() => import("./pages/Signin"));
const Contact = lazy(() => import("./pages/Contact"));
const Doctors = lazy(() => import("./pages/Doctors"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const Reset = lazy(() => import("./pages/Reset.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />

              <Route
                path="/doctors"
                element={
                  <RouteProtector>
                    <RoldebasedProtector>
                      <Suspense
                        fallback={
                          <div className="flex justify-center items-center">
                            <h1>Loading Doctors....</h1>
                          </div>
                        }
                      >
                        <Doctors />
                      </Suspense>
                    </RoldebasedProtector>
                  </RouteProtector>
                }
              />
              <Route
                path={`/appointment/:id`}
                element={
                  <RouteProtector>
                    <RoldebasedProtector>
                      <Suspense
                        fallback={
                          <div className="flex justify-center items-center">
                            <Oval color="teal" />
                          </div>
                        }
                      >
                        <Appointment />
                      </Suspense>
                    </RoldebasedProtector>
                  </RouteProtector>
                }
              />
              <Route
                path="/signin"
                element={
                  <Suspense
                    fallback={
                      <div className="flex justify-center items-center">
                        <Oval color="teal" />
                      </div>
                    }
                  >
                    <Signin />
                  </Suspense>
                }
              />

              <Route
                path="/contact"
                element={
                  <Suspense
                    fallback={
                      <div className="flex justify-center items-center">
                        <Oval color="teal" />
                      </div>
                    }
                  >
                    <Contact />
                  </Suspense>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <RouteProtector>
                    <Suspense
                      fallback={
                        <div className="flex justify-center items-center">
                          <Oval color="teal" />
                        </div>
                      }
                    >
                      <Dashboard />
                    </Suspense>
                  </RouteProtector>
                }
              />
              <Route
                path="/signup"
                element={
                  <Suspense
                    fallback={
                      <div className="flex justify-center items-center">
                        <Oval color="teal" />
                      </div>
                    }
                  >
                    {<Signup />}
                  </Suspense>
                }
              ></Route>
              <Route path="/reset" element={<Reset />} />
              <Route path="/profile" element={<Profle />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </StoreProvider>
  </StrictMode>,
);
