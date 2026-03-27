import React from "react";
import { CircleUserRound } from "lucide-react";
const Profle = () => {
  return (
    <table className="flex flex-col  items-center justify-center min-h-screen ">
      <tr className="flex flex-col gap-10 items-center justify-center bg-blue-500 w-md h-96 rounded-xl">
        <td>
          <CircleUserRound size={70} color="white" />
        </td>
        <td className="text-white font-bold text-2xl ">uzair riaz</td>
        <td className="text-white text-xl font-bold ">
          uzairriaz@123gmail.com
        </td>
        <button className="bg-white text-blue-500 text-xl rounded-2xl p-4 hover:scale-105 transition-transform">
          Reset Password
        </button>
      </tr>
    </table>
  );
};

export default Profle;
