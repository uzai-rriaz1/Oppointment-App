import { lazy, useState, useRef } from "react";
import { services } from "../assets/services/services";
import { images } from "../assets/services/services";
import { NavLink, useNavigate } from "react-router-dom";
import { routeApi } from "../api/api";
import { useSelector } from "react-redux";



export default function Home() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const user = useSelector((state) => state?.user?.user?.role);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setAnalysisResult(null);
    setError(null);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const { data } = await routeApi.post("/file/prescription", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!data.success) {
        throw new Error(data.message || "Analysis failed");
      }

      setAnalysisResult(data.analysis);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setAnalysisResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return "text-green-600";
    if (confidence >= 0.5) return "text-yellow-600";
    return "text-red-500";
  };

  const {
    data: doctors,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await routeApi.get("/doctors/doctorsList", {
        withCredentials: true,
      });
      return res.data.doctors;
    },
  });
  
  return (
    <div className="bg-gray-50 text-gray-700">

      <section className="grid md:grid-cols-2 items-center px-8 py-16 gap-10">
        <div>
          <h2 className="text-4xl font-bold leading-snug">
            Providing Quality <span className="text-teal-600">Healthcare</span>
            <br />
            For A Brighter Future
          </h2>

          <p className="mt-4 text-gray-500">
            We are dedicated to providing exceptional healthcare services for
            all patients.
          </p>

          <div className="mt-6 flex gap-4">
            <button
            onClick={() => {if(!user){navigate("/signin")}else{ navigate("/dashboard")}} }
              className="bg-teal-600 text-white px-6 py-3 rounded-lg">
              Appointments
            </button>
            <button className="border px-6 py-3 rounded-lg">Watch Video</button>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            loading="lazy"
            src={images.doctorsimg}
            alt="doctor"
            className="rounded-4xl shadow-lg pt-4"
          />
        </div>
      </section>
      <h1 className="text-center m-5 text-2xl font-bold">
        Book Our Top Doctors
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors?.map((doctor) => (
          <div
            key={doctor?._id}
            className="bg-white rounded-2xl shadow-md p-5 
             transition-all duration-300 ease-in-out 
             hover:scale-105 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="w-16 h-16 bg-teal-100 text-teal-700 flex items-center justify-center rounded-full text-xl font-bold mb-4">
              {doctor?.name?.charAt(0).toUpperCase()}
            </div>

            <h2 className="text-lg font-semibold">
              {doctor?.name?.toUpperCase()}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {doctor?.specialization || "General Physician"}
            </p>

            <p className="text-xs text-gray-400 mb-4">
              Available slots coming soon
            </p>

            <button
              onClick={() => navigate(`/appointment/${doctor._id}`)}
              className="w-full bg-teal-600 text-white py-2 rounded-xl hover:bg-teal-700 cursor-pointer transition"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {/* ── Prescription Analyzer ── */}
      <section className="px-8 py-16 bg-white">
        <h3 className="text-center text-2xl font-bold mb-2">
          Prescription Analyzer
        </h3>
        <p className="text-center text-gray-500 mb-10">
          Upload a prescription image and let our AI extract medicine details
          instantly.
        </p>

        <div className="max-w-2xl mx-auto">
          {/* Upload card */}
          <div className="bg-gray-50 border-2 border-dashed border-teal-300 rounded-xl p-8 text-center">
            {preview ? (
              <div className="mb-4">
                <img
                  src={preview}
                  alt="Prescription preview"
                  className="mx-auto max-h-56 rounded-lg object-contain shadow"
                />
              </div>
            ) : (
              <div className="mb-4 text-gray-400">
                <svg
                  className="mx-auto w-14 h-14 mb-2 text-teal-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4-4m0 0l4 4m-4-4v9M20 12a8 8 0 10-16 0"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 16l-4-4m0 0l-4 4"
                  />
                </svg>
                <p className="text-sm">
                  Click below to select a prescription image
                </p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="prescription-upload"
            />
            <label
              htmlFor="prescription-upload"
              className="cursor-pointer inline-block border border-teal-600 text-teal-600 px-5 py-2 rounded-lg text-sm hover:bg-teal-50 transition"
            >
              {selectedFile ? "Change Image" : "Choose Image"}
            </label>

            {selectedFile && (
              <p className="mt-2 text-xs text-gray-400">{selectedFile.name}</p>
            )}
          </div>

          {selectedFile && (
            <div className="flex gap-3 mt-4 justify-center">
              <button
                onClick={handleUpload}
                disabled={loading}
                className="bg-teal-600 text-white px-6 py-3 rounded-lg disabled:opacity-60 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  "Analyze Prescription"
                )}
              </button>
              <button
                onClick={handleReset}
                className="border px-5 py-3 rounded-lg text-sm hover:bg-gray-100 transition"
              >
                Reset
              </button>
            </div>
          )}

  
          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm text-center">
              {error}
            </div>
          )}

    
          {analysisResult && (
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4 text-gray-700">
                Analysis Results
              </h4>

              {analysisResult.medicines &&
              analysisResult.medicines.length > 0 ? (
                <div className="space-y-4">
                  {analysisResult.medicines.map((med, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 rounded-xl p-5 shadow-sm border border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-semibold text-gray-800 text-base capitalize">
                          {med.name !== "unknown"
                            ? med.name
                            : "Unknown Medicine"}
                        </h5>
                        <span
                          className={`text-xs font-medium ${getConfidenceColor(
                            med.confidence,
                          )}`}
                        >
                          {Math.round((med.confidence ?? 0) * 100)}% confidence
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-400 block text-xs mb-0.5">
                            Dosage
                          </span>
                          <span className="text-gray-700 capitalize">
                            {med.dosage !== "unknown" ? med.dosage : "—"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-xs mb-0.5">
                            Frequency
                          </span>
                          <span className="text-gray-700 capitalize">
                            {med.frequency !== "unknown" ? med.frequency : "—"}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-400 block text-xs mb-0.5">
                            Use Case
                          </span>
                          <span className="text-gray-700 capitalize">
                            {med.use_case !== "unknown" ? med.use_case : "—"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : analysisResult.raw_response ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
                  <p className="font-medium mb-1">Raw AI Response:</p>
                  <pre className="whitespace-pre-wrap break-words text-xs">
                    {analysisResult.raw_response}
                  </pre>
                </div>
              ) : (
                <p className="text-gray-500 text-sm text-center">
                  No medicines detected in this prescription.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
