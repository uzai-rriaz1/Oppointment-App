import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { routeApi } from "../api/api";
import { useSelector } from "react-redux";
import utc from "dayjs/plugin/utc";

import dayjs from "dayjs";
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function DoctorDashboard() {
  const id = useSelector((state) => state?.user?.user?.id);
  dayjs.extend(utc);
  const [day, setDay] = useState("");
  const queryClient = useQueryClient();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newSlot, setNewSlot] = useState({ start: "", end: "" });

  const { data: appointments } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      try {
        const res = await routeApi.get(`/appointments/getappointment`, {
          withCredentials: true,
        });
        console.log(res);
        return res.data;
      } catch (error) {
        console.log("FULL ERROR", error?.response);
      }
    },
  });

  const { data: slots = [] } = useQuery({
    queryKey: ["slots", id],
    queryFn: async () => {
      const res = await routeApi.get(`/doctors/getslots/${id}`, {
        withCredentials: true,
      });
      console.log(res?.data);
      return res.data?.avaliability;
    },
    enabled: !!id,
  });

  const addSlotMutation = useMutation({
    mutationFn: async (slot) =>
      await routeApi.post("/doctors/slots", slot, {
        withCredentials: true,
      }),
    onSuccess: () => {
      console.log("SLots added succesfully");
      queryClient.invalidateQueries(["slots"]);
      setNewSlot({ start: "", end: "" });
      const modal = document.getElementById("slot-modal");
      modal.close();
    },
    onError: (error) => {
      console.log("Slots didnt added", error?.response?.data);
    },
  });

  const handleAddSlot = () => {
    addSlotMutation.mutate({
      id: id,
      day: day,
      slots: [newSlot],
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
        <p className="text-gray-500">Manage your appointments</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold mb-4">Today's Appointments</h2>

          {/* {appointments.map((appt) => (
            <div
              key={appt._id}
              onClick={() => setSelectedAppointment(appt)}
              className="flex justify-between items-center p-3 mb-2 border rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <div>
                <p className="font-medium">{appt.patientName}</p>
                <p className="text-sm text-gray-500">{appt.time}</p>
              </div>
              <StatusBadge status={appt.status} />
            </div>
          ))} */}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-2xl shadow">
            {selectedAppointment ? (
              <div>
                <h2 className="font-semibold mb-2">Details</h2>
                <p>
                  <strong>Patient:</strong> {selectedAppointment.patientName}
                </p>
                <p>
                  <strong>Email:</strong> {selectedAppointment.email}
                </p>
                <p>
                  <strong>Time:</strong> {selectedAppointment.time}
                </p>
                <p>
                  <strong>Status:</strong> {selectedAppointment.status}
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() =>
                      handleAction(selectedAppointment._id, "confirmed")
                    }
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      handleAction(selectedAppointment._id, "cancelled")
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() =>
                      handleAction(selectedAppointment._id, "completed")
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Complete
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">Select an appointment</p>
            )}
          </div>

          <dialog
            id="slot-modal"
            className="fixed left-2/5 top-1/2 -translate-y-1/2 m-0 p-0 rounded-2xl backdrop:bg-black/30"
          >
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 space-y-5">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Add Availability
                </h2>
                <form method="dialog">
                  <button className="text-gray-500 hover:text-gray-700 text-lg">
                    ✕
                  </button>
                </form>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <label className="font-medium text-gray-700">Select Day</label>
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select a day</option>
                  {daysOfWeek.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <input
                  type="time"
                  value={newSlot.start}
                  onChange={(e) =>
                    setNewSlot({ ...newSlot, start: e.target.value })
                  }
                  className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="time"
                  value={newSlot.end}
                  onChange={(e) =>
                    setNewSlot({ ...newSlot, end: e.target.value })
                  }
                  className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                onClick={handleAddSlot}
                className="w-full bg-teal-600 text-white py-2 rounded-xl hover:bg-teal-700 transition"
              >
                Add Slot
              </button>
            </div>
          </dialog>
          <div className="bg-white p-4 rounded-2xl shadow">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold mb-3">Availability</h2>
              <button
                onClick={() => {
                  const modal = document.getElementById("slot-modal");
                  modal.showModal();
                }}
                className="bg-teal-600 text-white px-3 py-1 rounded hover:cursor-pointer"
              >
                Add Slot
              </button>
            </div>
            {slots?.map((dayItem, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold text-lg mb-2">{dayItem.day}</h3>
                {dayItem.slots.map((s, i) => {
                  const matched = appointments?.doctor?.find(
                    (opp) =>
                      dayjs(opp.startTime).local().format("HH:mm") === s.start,
                  );

                  const status = matched ? matched.status : "available";

                  return (
                    <div
                      key={i}
                      className="flex justify-between p-2 border rounded mb-2"
                    >
                      <span>
                        {s.start} - {s.end}
                      </span>

                      <span
                        className={`${
                          status === "booked"
                            ? "text-red-500"
                            : status === "cancelled"
                              ? "text-yellow-500"
                              : "text-green-500"
                        }`}
                      >
                        {status.toUpperCase()}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// function StatCard({ title, value }) {
//   return (
//     <div className="bg-white p-4 rounded-2xl shadow">
//       <p className="text-gray-500">{title}</p>
//       <h2 className="text-2xl font-bold">{value}</h2>
//     </div>
//   );
// }

// function StatusBadge({ status }) {
//   const colors = {
//     pending: "bg-yellow-100 text-yellow-700",
//     confirmed: "bg-green-100 text-green-700",
//     completed: "bg-blue-100 text-blue-700",
//     cancelled: "bg-red-100 text-red-700",
//   };

//   return (
//     <span className={`px-2 py-1 text-sm rounded ${colors[status]}`}>
//       {status}
//     </span>
//   );
// }
