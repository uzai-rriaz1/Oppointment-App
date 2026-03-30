import React from "react";
import { useParams } from "react-router-dom";

const Reset = () => {
  const { token } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Reset Password</h1>
          <p className="text-gray-500 text-sm mt-1">
            Enter your email to receive reset instructions
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reset;
