import React from "react";
import DoctorDashboard from "../components/DoctorDashboard";
import PatientDashboard from "../components/PatientDashboard";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user.role);

  return <>{user === "doctor" ? <DoctorDashboard /> : <PatientDashboard />}</>;
};

export default Dashboard;
