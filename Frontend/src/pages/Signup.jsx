import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { routeApi } from "../api/api";
import { useState } from "react";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
const Signup = () => {
  const navigate = useNavigate();
  const [showpass, setShowpass] = useState(false);
  const [eyeopen, setEyeopen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await routeApi.post("/users/createuser", data);
      if (response) {
        console.log("Data sended succsfully ", response);
      }
    } catch (error) {
      throw new Error("Data didnt sended", error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col min-h-screen items-center justify-center bg-sky-50"
    >
      <div className="flex justify-center items-center p-4">
        <h1 className="font-bold p-2 text-4xl text-gray-800">Sign Up</h1>
      </div>
      <div className="flex flex-col items-center justify-center bg-blue-600 space-y-5 py-5 px-3 md:py-10 md:px-6 lg:py-16 lg:px-10   rounded-xl shadow-xl shadow-blue-600">
        <input
          id="username"
          type="text"
          placeholder="Enter Your username"
          className="bg-white p-2 rounded-xl w-80 md:p-3 md:w-96 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300
"
          {...register("username", {
            required: "Enter Your username",
          })}
        />
        <div className="flex text-center justify-center">
          {errors.password && (
            <p className="text-sky-50  mt-1 text-md">
              {errors.username.message}
            </p>
          )}
        </div>

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
        <div>
          {errors.email && (
            <p className="text-sky-50 text-md mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            id="password"
            type={showpass ? "text" : "password"}
            placeholder="Enter Your Password"
            className={`bg-white p-2 ml-6 rounded-xl w-80 md:p-3 md:w-96 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300
         
            `}
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

          <div className="flex pt-2 justify-center">
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
          Sign Up
        </button>
        <div className="p-2 text-white">
          <p>
            If you have an account?{" "}
            <span
              className="hover:text-sky-100 cursor-pointer text-xl"
              onClick={() => {
                navigate("/signin");
              }}
            >
              sign in
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Signup;
