import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { routeApi } from "../api/api";
import { useState } from "react";
import { Eye, EyeOff, CircleCheckBig } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const Signup = () => {
  const navigate = useNavigate();
  const [showpass, setShowpass] = useState(false);
  const [eyeopen, setEyeopen] = useState(false);
  const [role, setRole] = useState("patient");
  const notify = () =>
    toast("Account Created Successfully", {
      type: "success",
      progressClassName: "!bg-white",
      icon: <CircleCheckBig color="white" />,
      className: "!bg-teal-600 !text-white",
    });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const signupMutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (payload) =>
      await routeApi.post("/users/createuser", payload, {
        withCredentials: true,
      }),

    onSuccess: (response) => {
      console.log("Data sent successfully", response);
      notify();

      setTimeout(() => navigate("/signin"), 3000);
    },

    onError: (error) => {
      console.log("FULL ERROR:", error.response);

      setError("root", {
        type: "server",
        message: error.response?.data?.message || "Something went wrong",
      });
    },
  });

  const onSubmit = (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: role,
      ...(role === "doctor" && {
        specialization: data.specialization.trim(),
      }),
    };
    signupMutation.mutate(payload);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4 my-15"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Sign Up</h1>
          <p className="text-gray-500 text-sm mt-1">
            Create your account to get started
          </p>
        </div>
        {errors.root && (
          <p className="text-red-500 text-sm text-center mt-1">
            {errors.root.message}
          </p>
        )}
        <ToastContainer pauseOnHover={true} position="top-right" />
        <div>
          <select
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        <div>
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            {...register("name", {
              required: "Enter Your username",
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
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

        {role === "doctor" && (
          <div>
            <input
              type="text"
              placeholder="Enter your specialization"
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              {...register("specialization", {
                required: "Enter specialization",
              })}
            />
            {errors.specialization && (
              <p className="text-red-500 text-sm mt-1">
                {errors.specialization.message}
              </p>
            )}
          </div>
        )}

        <div className="relative">
          <input
            type={showpass ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            {...register("password", {
              required: "Enter Your Password",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message:
                  "Enter at least 1 letter, 1 number, No special Characters and min 8 characters",
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
          Sign Up
        </button>

        <div className="text-center text-sm text-gray-600">
          <p>
            Already have an account?{" "}
            <span
              className="text-teal-600 cursor-pointer hover:underline"
              onClick={() => navigate("/signin")}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Signup;
