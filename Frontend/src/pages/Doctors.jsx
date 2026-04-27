import { useQuery } from "@tanstack/react-query";
import { routeApi } from "../api/api";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const Doctors = () => {
  const navigate = useNavigate();

  const {
    data: doctors,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await routeApi.get("/doctors/doctorsList");
      return res.data.doctors;
    },
  });

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen flex justify-center items-center text-teal-600">
          <Oval color="teal" />
        </div>
      ) : (
        <div className="bg-gray-50 min-h-screen p-6 my-16">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">
              Find Your <span className="text-teal-600">Doctor</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Book appointments with trusted specialists
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white rounded-2xl shadow-md p-5 
             transition-all duration-300 ease-in-out 
             hover:scale-105 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-teal-100 text-teal-700 flex items-center justify-center rounded-full text-xl font-bold mb-4">
                  {doctor.name?.charAt(0)}
                </div>

                <h2 className="text-lg font-semibold">{doctor.name}</h2>
                <p className="text-sm text-gray-500 mb-4">
                  {doctor.specialization || "General Physician"}
                </p>

                <p className="text-xs text-gray-400 mb-4">
                  Available slots coming soon
                </p>

                <button
                  onClick={() => navigate(`/doctor/${doctor._id}`)}
                  className="w-full bg-teal-600 text-white py-2 rounded-xl hover:bg-teal-700 cursor-pointer transition"
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Doctors;
