import React from "react";
import { useSelector } from "react-redux";

const RoldebasedProtector = ({ children }) => {
  const user = useSelector((state) => state.user?.user?.role);
  if (user !== "patient") return <div>Only Patients Can Access ThIS pAGE</div>;
  return <div>{children}</div>;
};

export default RoldebasedProtector;
