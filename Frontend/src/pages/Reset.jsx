import React from "react";
import { useParams } from "react-router-dom";

const Reset = () => {
  const { token } = useParams;
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-400">
      <form action="" className="flex gap-5">
        <input
          type="text"
          className="p-4 bg-white rounded-2xl outline-amber-50 shadow-2xl shadow-white"
          placeholder="Enter Your Email"
        />
        <button className="bg-white p-4 border-2 outline-0 rounded-2xl border-amber-50 shadow-2xl shadow-white hover:scale-110 transition-transform">
          Send
        </button>
      </form>
    </div>
  );
};

export default Reset;
