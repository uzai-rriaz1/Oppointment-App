import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { routeApi } from "../api/api";

const PatientDashboard = () => {
  const {
    data: patients,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      await axios.get(routeApi("/"));
    },
  });

  return (
    <div className="flex bg-[#eae7dc] min-h-screen p-6">
      {/* Sidebar */}
      <div className="w-16 bg-teal-700 rounded-xl flex flex-col items-center py-6 space-y-6">
        <div className="w-8 h-8 bg-white rounded-md"></div>
        <div className="w-8 h-8 bg-white/50 rounded-md"></div>
      </div>

      {/* Main */}
      <div className="flex-1 ml-6">
        {/* Header */}
        <h1 className="text-2xl font-semibold">
          Good Morning <span className="text-teal-600">{user.name}</span>
        </h1>

        {/* Stats */}
        <div className="bg-gradient-to-r from-teal-400 to-teal-700 text-white p-6 rounded-2xl mt-4">
          <p>Your Appointments</p>
          <h2 className="text-4xl font-bold">{appointments.length}</h2>
        </div>

        {/* Doctors List */}
        <div className="mt-6 bg-white p-4 rounded-xl">
          <h2 className="font-semibold mb-3">Available Doctors</h2>

          {doctors.map((doc) => (
            <div key={doc._id} className="flex justify-between py-2">
              <div>
                <p>{doc.name}</p>
                <span className="text-sm text-gray-500">
                  {doc.specialization}
                </span>
              </div>

              <button className="bg-teal-600 text-white px-3 py-1 rounded-lg">
                Book
              </button>
            </div>
          ))}
        </div>

        {/* Appointments */}
        <div className="mt-6 bg-white p-4 rounded-xl">
          <h2 className="font-semibold mb-3">Your Appointments</h2>

          {appointments.map((appt) => (
            <div key={appt._id} className="flex justify-between py-2">
              <p>{appt.doctor.name}</p>
              <span>{appt.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
