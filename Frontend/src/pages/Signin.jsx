import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
const Signin = () => {
  const navigate = useNavigate();
  const [showpass, setShowpass] = useState(false);
  const [eyeopen, setEyeopen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col min-h-screen items-center justify-center bg-sky-50"
    >
      <div className="flex justify-center items-center p-4">
        <h1 className="font-bold p-2 text-4xl text-gray-800">Sign In</h1>
      </div>
      <div className="flex flex-col items-center justify-center bg-blue-600 space-y-5 py-5 px-3 md:py-10 md:px-6 lg:py-16 lg:px-10   rounded-xl shadow-xl shadow-blue-600">
        <input
          id="email"
          type="email"
          placeholder="Enter Your Email"
          className="bg-white p-2 rounded-xl w-80 md:p-3 md:w-96 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300
"
          {...register("email", {
            required: "Enter Your Email",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please Enter a Valid Email",
            },
          })}
        />
        {errors.email && (
          <p className="text-sky-50 text-md mt-1">{errors.email.message}</p>
        )}

        <div>
          <input
            id="password"
            type={showpass ? "text" : "password"}
            placeholder="Enter Your Password"
            className="bg-white ml-6 p-2 rounded-xl w-80 md:p-3 md:w-96 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300
"
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
              className="relative top-2 right-9 cursor-pointer text-blue-600"
              onClick={() => {
                setEyeopen(true);
                setShowpass(true);
              }}
            >
              <Eye size={26} />
            </button>
          ) : (
            <button
              className="relative top-2 right-9 cursor-pointer text-blue-600"
              onClick={() => {
                setEyeopen(false);
                setShowpass(false);
              }}
            >
              <EyeOff size={26} />
            </button>
          )}
          <div className="flex justify-center text-center p-2">
            {" "}
            {errors.password && (
              <p className="text-sky-50 text-md mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="text-gray-800 bg-white p-3 mt-2 rounded-xl hover:shadow-md shadow-white hover:cursor-pointer"
        >
          Sign In
        </button>
        <div className="p-2 text-white">
          <p>
            If you dont have an account?{" "}
            <span
              onClick={() => {
                navigate("/signup");
              }}
              className="hover:text-sky-100 cursor-pointer text-xl"
            >
              sign up
            </span>
          </p>
        </div>
        <div className="p-2 text-white">
          <p>
            If forgot your password?{" "}
            <span
              className="hover:text-sky-100 cursor-pointer text-xl"
              onClick={() => {
                navigate("/reset");
              }}
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
