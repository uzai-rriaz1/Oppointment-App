// import doctorApi from "../api/api";
import { useState, useEffect } from "react";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchDoctors = async () => {
  //     try {
  //       const res = await doctorApi();
  //       setDoctors(res);
  //     } catch (err) {
  //       console.error("Error fetching doctors:", err);
  //       setError(err.message);
  //     }
  //   };

  //   fetchDoctors();
  // }, []);

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  if (!doctors.length) {
    return <p className="text-gray-500 text-center">Loading doctors...</p>;
  }

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {doctors.map((doc) => (
        <div
          key={doc.id}
          className="p-4 bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition"
        >
          <img
            src={doc.image || "/default-doctor.jpg"}
            alt={doc.name}
            className="w-full h-48 object-cover rounded-lg"
          />
          <h2 className="mt-3 text-lg font-semibold">{doc.name}</h2>
          <p className="text-sm text-gray-600">{doc.specialization}</p>
          <p className="text-xs text-gray-400">{doc.experience}</p>
        </div>
      ))}
    </div>
  );
};

export default Doctors;
