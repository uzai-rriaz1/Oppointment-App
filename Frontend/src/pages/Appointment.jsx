import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { DollarSign, Hospital, Calendar } from "lucide-react";
import { routeApi } from "../api/api";
import { Oval } from "react-loader-spinner";
import dayjs from "dayjs";

// 🔥 helper: convert "Monday" → "2026-05-11"
const getNextDateFromDay = (dayName) => {
  const daysMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const today = dayjs();
  const todayDay = today.day();
  const targetDay = daysMap[dayName];

  let diff = targetDay - todayDay;
  if (diff <= 0) diff += 7;

  return today.add(diff, "day").format("YYYY-MM-DD");
};

const Appointment = function () {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { id } = useParams();

  const { data: doctor, isLoading } = useQuery({
    queryKey: ["doctor", id],
    queryFn: async () => {
      try {
        const res = await routeApi.get(`/doctors/getdoctor/${id}`, {
          withCredentials: true,
        });
        return res.data;
      } catch (error) {
        console.log("Full ERORR", error?.response);
      }
    },
    enabled: !!id,
  });

  const bookingMutation = useMutation({
    mutationKey: ["booking"],
    mutationFn: async (data) => {
      await routeApi.post(`/appointments/bookappointment`, data, {
        withCredentials: true,
      });
    },
    onError: (error) => {
      console.log("Full error", error?.response?.data);
    },
    onSuccess: () => {
      console.log("Appointment BOOKED Successfully");
    },
  });

  return (
    <>
      {isLoading ? (
        <div>
          <Oval
            color="teal"
            className="min-h-screen flex justify-center items-center text-teal-600"
          />
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 p-6 mt-12">
          <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6">
            {/* LEFT SIDE */}
            <div className="bg-white rounded-2xl shadow p-5 space-y-5">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-teal-500 rounded-2xl font-bold text-2xl text-white flex items-center justify-center">
                  {doctor?.User?.name[0]?.toUpperCase()}
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    {doctor?.User?.name[0]?.toUpperCase() +
                      doctor?.User?.name?.slice(1)}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {doctor?.User?.specialization}
                  </p>
                  <p className="text-gray-500 text-sm">N/A</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">About Doctor</h3>
                <p className="text-sm text-gray-500">
                  Experienced physician specializing in preventive care and
                  general health.
                </p>
              </div>

              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex items-center gap-4">
                  <DollarSign color="teal" />
                  <div>
                    <p className="text-[13px] font-semibold">
                      Consultation Fee
                    </p>
                    <p className="font-bold">$30</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Hospital color="teal" />
                  <div>
                    <p className="text-[13px] font-semibold">Hospital</p>
                    <p className="font-bold">N/A</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Calendar color="teal" />
                  <div>
                    <p className="text-[13px] font-semibold">Available Days</p>
                    <p className="font-bold">Mon - Sat</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-span-2 bg-white rounded-2xl shadow p-6 space-y-6">
              <h1 className="text-2xl font-semibold">Book Appointment</h1>

              {/* DAYS */}
              <div className="flex gap-3 flex-wrap">
                {doctor?.User?.availability?.map((d, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const date = getNextDateFromDay(d.day);

                      setSelectedDay({
                        day: d.day,
                        date,
                      });

                      setSelectedSlot(null);
                    }}
                    className={`px-4 py-2 rounded-xl border ${
                      selectedDay?.day === d.day
                        ? "bg-teal-600 text-white"
                        : "bg-white"
                    }`}
                  >
                    {d.day}
                  </button>
                ))}
              </div>

              <div className="bg-blue-50 text-blue-600 p-3 rounded-xl text-sm">
                All timings are shown in your local time
              </div>

              {/* SLOTS */}
              <div>
                <h2 className="font-semibold mb-3">Available Time Slots</h2>

                {!selectedDay && (
                  <p className="text-gray-400">Please select a day</p>
                )}

                {selectedDay && (
                  <div className="grid grid-cols-4 gap-3">
                    {doctor?.User?.availability
                      ?.find((d) => d.day === selectedDay?.day)
                      ?.slots?.map((slot, i) => {
                        const isSelected = selectedSlot?.start === slot.start;

                        return (
                          <button
                            key={i}
                            onClick={() =>
                              setSelectedSlot({
                                day: selectedDay.day, // for UI
                                date: selectedDay.date, // 🔥 important
                                start: slot.start,
                                end: slot.end,
                              })
                            }
                            className={`p-2 rounded-xl border text-sm ${
                              isSelected
                                ? "bg-teal-600 text-white"
                                : "bg-white hover:border-teal-500"
                            }`}
                          >
                            {slot.start} - {slot.end}
                          </button>
                        );
                      })}
                  </div>
                )}

                {selectedDay &&
                  !doctor?.User?.availability?.find(
                    (d) => d.day === selectedDay?.day,
                  )?.slots?.length && (
                    <p className="text-gray-400 mt-2">No slots available</p>
                  )}
              </div>

              {/* SELECTED */}
              {selectedSlot && (
                <div className="bg-teal-50 p-4 rounded-xl text-sm">
                  Selected: {selectedSlot.day} • {selectedSlot.start} -{" "}
                  {selectedSlot.end}
                </div>
              )}

              <textarea
                placeholder="Add notes (optional)..."
                className="w-full border rounded-xl p-3"
              />

              {/* BUTTON */}
              <button
                onClick={() => {
                  bookingMutation.mutate({
                    id: doctor.User._id,
                    time: selectedSlot,
                  });
                }}
                className="w-full bg-teal-600 text-white py-3 rounded-xl text-lg hover:bg-teal-700"
              >
                Confirm Appointment →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Appointment;
