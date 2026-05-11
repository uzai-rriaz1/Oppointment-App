import React from "react";
import { useSelector } from "react-redux";

const RouteProtector = ({ children }) => {
  const user = useSelector((state) => state.user?.user?.id);
  if (!user)
    return (
      <div className="pt-20 text-2xl text-center flex justify-center items-center">
        Login in to access
      </div>
    );
  return <div>{children}</div>;
};

export default RouteProtector;
