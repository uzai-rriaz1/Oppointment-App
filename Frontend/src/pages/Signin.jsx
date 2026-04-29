import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, CircleCheckBig } from "lucide-react";
import { routeApi } from "../api/api";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/userSlice";

const Signin = () => {
  const navigate = useNavigate();
  const [showpass, setShowpass] = useState(false);
  const [eyeopen, setEyeopen] = useState(false);
  const dispatch = useDispatch();
  const notify = () =>
    toast("LogIn Successfull", {
      type: "success",
      progressClassName: "!bg-white",
      icon: <CircleCheckBig color="white" />,
      className: "!bg-teal-600 !text-white",
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const userLogin = useMutation({
    mutationKey: ["userLogin"],
    mutationFn: async (data) => {
      return await routeApi.post("/users/login", data);
    },
    onSuccess: (res) => {
      const user = res?.data?.user;
      notify();
      reset();
      dispatch(loginUser(user));
      setTimeout(() => navigate("/"), 3000);
    },
    onError: (error) => {
      console.log(error?.response);
      setError("root", error?.response?.data);
    },
  });

  const onSubmit = (data) => {
    userLogin.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Sign In</h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome back! Please enter your details
          </p>
          {errors.root && (
            <p className="text-red-500 text-sm text-center mt-1">
              {errors.root.message}
            </p>
          )}
          <ToastContainer pauseOnHover={true} position="top-right" />
        </div>

        <div>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            {...register("email", {
              required: "Enter Your Email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please Enter a Valid Email",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="relative">
          <input
            id="password"
            type={showpass ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            {...register("password", {
              required: "Enter Your Password",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message:
                  "Enter at least 1 letter, 1 number and min 8 characters",
              },
            })}
          />

          {!eyeopen ? (
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500 hover:text-teal-600"
              onClick={() => {
                setEyeopen(true);
                setShowpass(true);
              }}
            >
              <Eye size={22} />
            </button>
          ) : (
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500 hover:text-teal-600"
              onClick={() => {
                setEyeopen(false);
                setShowpass(false);
              }}
            >
              <EyeOff size={22} />
            </button>
          )}

          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition"
        >
          Sign In
        </button>

        <div className="text-center text-sm text-gray-600 space-y-2">
          <p>
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-teal-600 cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>

          <p>
            Forgot your password?{" "}
            <span
              onClick={() => navigate("/reset")}
              className="text-teal-600 cursor-pointer hover:underline"
            >
              Reset Password
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Signin;
