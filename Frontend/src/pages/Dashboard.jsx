import React from "react";
import DoctorDashboard from "../components/DoctorDashboard";
import PatientDashboard from "../components/PatientDashboard";
import { useSelector } from "react-redux";
import { lazy } from "react";
const Dashboard = () => {
  // const DoctorDashboard = lazy(() => import("../components/DoctorDashboard"));
  // const PatientDashboard = lazy(() => import("../components/PatientDashboard"));

  const user = useSelector((state) => state?.user?.user?.role);

  return <>{user === "doctor" ? <DoctorDashboard /> : <PatientDashboard />}</>;
};

export default Dashboard;
