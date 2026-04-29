import React from "react";
import { useSelector } from "react-redux";

const RouteProtector = ({ children }) => {
  const user = useSelector((state) => state.user?.user?.id);
  if (!user) return <div>Your Are Not Authorized</div>;
  return <div>{children}</div>;
};

export default RouteProtector;
