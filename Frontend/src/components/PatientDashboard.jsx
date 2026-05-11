import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { routeApi } from "../api/api";
import { useSelector } from "react-redux";
import {
  Calendar,
  Clock,
  User,
  FileText,
  Star,
  X,
  ChevronRight,
  Activity,
  Stethoscope,
  CircleCheckBig,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import dayjs from "dayjs";

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
  if (diff < 0) diff += 7;

  return today.add(diff, "day").format("YYYY-MM-DD");
};

export default function PatientDashboard() {
  const id = useSelector((state) => state?.user?.user?.id);
  const name = useSelector((state) => state?.user?.user?.name);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showBookModal, setShowBookModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  console.log("SELECTED APPOINTMENT", selectedAppointment);

  const queryClient = useQueryClient();

  const notify = (msg) =>
    toast(msg, {
      type: "success",
      progressClassName: "!bg-white",
      icon: <CircleCheckBig color="white" />,
      className: "!bg-teal-600 !text-white",
    });

  const { data: appointments } = useQuery({
    queryKey: ["patientAppointments"],
    queryFn: async () => {
      const res = await routeApi.get(`/patients/patientappointments`, {
        withCredentials: true,
      });
      return res?.data;
    },
  });

  const { data: doctors } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await routeApi.get(`/doctors/doctorsList`, {
        withCredentials: true,
      });
      console.log(res?.data);
      return res?.data;
    },
  });

  const bookMutation = useMutation({
    mutationFn: async (data) =>
      await routeApi.post("/appointments/bookappointment", data, {
        withCredentials: true,
      }),
    onSuccess: () => {
      notify("Appointment Booked Successfully");
      queryClient.invalidateQueries(["patientAppointments"]);
      setShowBookModal(false);
      setSelectedDoctor(null);
      setSelectedSlot(null);
      setSelectedDay(null);
    },
    onError: (err) => console.log("Booking error", err?.response?.data),
  });

  const cancelMutation = useMutation({
    mutationFn: async (id) =>
      await routeApi.put(
        `/appointments/cancelappointment/${id}`,
        {},
        {
          withCredentials: true,
        },
      ),
    onSuccess: () => {
      notify("Appointment Cancelled");
      queryClient.invalidateQueries(["patientAppointments"]);
      setSelectedAppointment(null);
    },
    onError: (err) => console.log("Cancel error", err?.response?.data),
  });

  const handleBook = () => {
    if (!selectedDoctor || !selectedSlot || !selectedDay) return;

    const date = getNextDateFromDay(selectedDay);

    bookMutation.mutate({
      id: selectedDoctor._id,
      time: {
        day: selectedDay,
        date,
        start: selectedSlot.start,
        end: selectedSlot.end,
      },
    });
  };

  const apptList = appointments?.appointments || [];
  const upcoming = apptList.filter(
    (a) => a?.status === "confirmed" || a?.status === "pending",
  );
  const completed = apptList.filter((a) => a?.status === "completed");
  const displayName = name ? name[0].toUpperCase() + name.slice(1) : "Patient";

  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: "#f0f4f4",
        paddingTop: "64px",
        boxSizing: "border-box",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      <ToastContainer pauseOnHover={true} position="top-right" />

      <div
        style={{
          margin: "12px 16px 0",
          borderRadius: "18px",
          background: "linear-gradient(110deg, #ffffff 0%, #0f766e 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 28px",
          flexShrink: 0,
          minHeight: "96px",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              color: "#475569",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Welcome back
          </p>
          <h1
            style={{
              margin: "2px 0 0",
              fontSize: "22px",
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            {displayName}
          </h1>
          <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#64748b" }}>
            Manage your health appointments
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <StatCard
            icon={<Calendar size={20} color="#0f766e" />}
            iconBg="#ccfbf1"
            label="Upcoming"
            value={upcoming.length}
          />
          <StatCard
            icon={<Activity size={20} color="#16a34a" />}
            iconBg="#dcfce7"
            label="Completed"
            value={completed.length}
          />
          <StatCard
            icon={<Stethoscope size={20} color="#2563eb" />}
            iconBg="#dbeafe"
            label="Total Visits"
            value={apptList.length}
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 320px",
          gap: "12px",
          margin: "12px 16px 12px",
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        <Panel
          title="My Appointments"
          action={
            <button
              onClick={() => setShowBookModal(true)}
              style={{
                background: "#0f766e",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "5px 12px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              + Book Appointment
            </button>
          }
        >
          <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
            {apptList.length ? (
              apptList.map((appt) => (
                <AppointmentRow
                  key={appt?._id}
                  appt={appt}
                  isSelected={selectedAppointment?._id === appt?._id}
                  onClick={() => setSelectedAppointment(appt)}
                />
              ))
            ) : (
              <EmptyState
                icon={<Calendar size={32} color="#cbd5e1" />}
                text="No appointments yet"
              />
            )}
          </div>
        </Panel>

        <Panel title="Appointment Details">
          <div
            style={{
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {selectedAppointment ? (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #0d9488, #0f766e)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "18px",
                      flexShrink: 0,
                    }}
                  >
                    {selectedAppointment?.doctor?.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 700,
                        fontSize: "15px",
                        color: "#0f172a",
                      }}
                    >
                      Dr. {selectedAppointment?.doctor?.name}
                    </p>
                    <p
                      style={{ margin: 0, fontSize: "12px", color: "#64748b" }}
                    >
                      {selectedAppointment?.doctor?.specialization ||
                        "General Physician"}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    flex: 1,
                  }}
                >
                  <DetailRow
                    label="Date & Time"
                    value={dayjs(selectedAppointment?.startTime).format(
                      "MMM D, hh:mm A",
                    )}
                  />
                  <DetailRow
                    label="End Time"
                    value={dayjs(selectedAppointment?.endTime).format(
                      "hh:mm A",
                    )}
                  />
                  <DetailRow
                    label="Status"
                    value={<StatusBadge status={selectedAppointment?.status} />}
                  />
                  {selectedAppointment?.notes && (
                    <DetailRow
                      label="Notes"
                      value={selectedAppointment?.notes}
                    />
                  )}
                </div>

                {(selectedAppointment?.status === "pending" ||
                  selectedAppointment?.status === "confirmed") && (
                  <div style={{ marginTop: "16px", flexShrink: 0 }}>
                    <button
                      onClick={() =>
                        cancelMutation.mutate(selectedAppointment._id)
                      }
                      style={{
                        width: "100%",
                        padding: "9px 0",
                        background: "#dc2626",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Cancel Appointment
                    </button>
                  </div>
                )}
              </>
            ) : (
              <EmptyState
                icon={<FileText size={32} color="#cbd5e1" />}
                text="Select an appointment to view details"
              />
            )}
          </div>
        </Panel>

        <Panel title="Find a Doctor">
          <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
            {doctors?.doctors?.length ? (
              doctors.doctors.map((doc) => (
                <DoctorCard
                  key={doc?._id}
                  doctor={doc}
                  onBook={() => {
                    setSelectedDoctor(doc);
                    setShowBookModal(true);
                  }}
                />
              ))
            ) : (
              <EmptyState
                icon={<User size={28} color="#cbd5e1" />}
                text="No doctors available"
              />
            )}
          </div>
        </Panel>
      </div>

      {showBookModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowBookModal(false);
              setSelectedDoctor(null);
              setSelectedSlot(null);
              setSelectedDay(null);
            }
          }}
        >
          <div
            style={{
              width: "420px",
              background: "#fff",
              borderRadius: "18px",
              padding: "28px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                Book Appointment
              </h2>
              <button
                onClick={() => {
                  setShowBookModal(false);
                  setSelectedDoctor(null);
                  setSelectedSlot(null);
                  setSelectedDay(null);
                }}
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: "8px",
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "#64748b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={14} />
              </button>
            </div>

            <label
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#374151",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Select Doctor
            </label>
            <select
              value={selectedDoctor?._id || ""}
              onChange={(e) => {
                const doc = doctors?.doctors?.find(
                  (d) => d._id === e.target.value,
                );
                setSelectedDoctor(doc || null);
                setSelectedSlot(null);
                setSelectedDay(null);
              }}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "10px",
                border: "1px solid #d1d5db",
                marginBottom: "16px",
                fontSize: "14px",
                color: "#374151",
                outline: "none",
                boxSizing: "border-box",
              }}
            >
              <option value="">Choose a doctor</option>
              {doctors?.doctors?.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  Dr. {doc.name}{" "}
                  {doc.specialization ? `— ${doc.specialization}` : ""}
                </option>
              ))}
            </select>

            {selectedDoctor && (
              <>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#374151",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Select Day
                </label>
                <select
                  value={selectedDay || ""}
                  onChange={(e) => {
                    setSelectedDay(e.target.value);
                    setSelectedSlot(null);
                  }}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    border: "1px solid #d1d5db",
                    marginBottom: "16px",
                    fontSize: "14px",
                    color: "#374151",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="">Select a day</option>
                  {selectedDoctor?.availability?.map((dayItem) => (
                    <option key={dayItem.day} value={dayItem.day}>
                      {dayItem.day}
                    </option>
                  ))}
                </select>
              </>
            )}

            {selectedDay && (
              <>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#374151",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Available Slots
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                    marginBottom: "20px",
                    maxHeight: "160px",
                    overflowY: "auto",
                  }}
                >
                  {selectedDoctor?.availability
                    ?.find((d) => d.day === selectedDay)
                    ?.slots?.map((slot, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedSlot(slot)}
                        style={{
                          padding: "8px 10px",
                          borderRadius: "10px",
                          border:
                            selectedSlot?.start === slot.start
                              ? "1.5px solid #0f766e"
                              : "1px solid #e2e8f0",
                          background:
                            selectedSlot?.start === slot.start
                              ? "#f0fdfa"
                              : "#fafafa",
                          color:
                            selectedSlot?.start === slot.start
                              ? "#0f766e"
                              : "#334155",
                          fontSize: "12px",
                          fontWeight: 600,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "4px",
                        }}
                      >
                        <Clock size={11} />
                        {slot.start} – {slot.end}
                      </button>
                    ))}
                </div>
              </>
            )}

            <button
              onClick={handleBook}
              disabled={
                !selectedDoctor || !selectedSlot || bookMutation.isPending
              }
              style={{
                width: "100%",
                padding: "12px",
                background:
                  !selectedDoctor || !selectedSlot ? "#94a3b8" : "#0f766e",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: 600,
                cursor:
                  !selectedDoctor || !selectedSlot ? "not-allowed" : "pointer",
              }}
            >
              {bookMutation.isPending ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Panel({ title, children, action }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
          flexShrink: 0,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "14px",
            fontWeight: 700,
            color: "#0f172a",
            letterSpacing: "0.01em",
          }}
        >
          {title}
        </h2>
        {action}
      </div>
      {children}
    </div>
  );
}

function StatCard({ icon, iconBg, label, value }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "14px",
        padding: "14px 20px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        minWidth: "150px",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <p
          style={{
            margin: 0,
            fontSize: "11px",
            color: "#64748b",
            fontWeight: 500,
          }}
        >
          {label}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "26px",
            fontWeight: 800,
            color: "#0f172a",
            lineHeight: 1.1,
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function AppointmentRow({ appt, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 12px",
        borderRadius: "12px",
        cursor: "pointer",
        marginBottom: "6px",
        transition: "background 0.15s",
        background: isSelected ? "#f0fdfa" : "#fafafa",
        border: isSelected ? "1.5px solid #0d9488" : "1.5px solid transparent",
      }}
    >
      <div>
        <p
          style={{
            margin: 0,
            fontWeight: 600,
            fontSize: "14px",
            color: "#0f172a",
          }}
        >
          Dr.{" "}
          {appt?.doctor?.name?.[0]?.toUpperCase() +
            appt?.doctor?.name?.slice(1)}
        </p>
        <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#64748b" }}>
          {dayjs(appt?.startTime).format("MMM D, hh:mm A")} –{" "}
          {dayjs(appt?.endTime).format("hh:mm A")}
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <StatusBadge status={appt?.status} />
        <ChevronRight size={14} color="#94a3b8" />
      </div>
    </div>
  );
}

function DoctorCard({ doctor, onBook }) {
  return (
    <div
      style={{
        padding: "12px",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        marginBottom: "8px",
        background: "#fafafa",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0d9488, #0f766e)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: "15px",
            flexShrink: 0,
          }}
        >
          {doctor?.name?.[0]?.toUpperCase()}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              fontWeight: 700,
              fontSize: "13px",
              color: "#0f172a",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Dr. {doctor?.name}
          </p>
          <p style={{ margin: 0, fontSize: "11px", color: "#64748b" }}>
            {doctor?.specialization || "General Physician"}
          </p>
        </div>
      </div>

      {doctor?.availability?.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "4px",
            flexWrap: "wrap",
            marginBottom: "10px",
          }}
        >
          {doctor.availability.map((d) => (
            <span
              key={d.day}
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color: "#0f766e",
                background: "#f0fdfa",
                border: "1px solid #ccfbf1",
                borderRadius: "6px",
                padding: "2px 7px",
              }}
            >
              {d.day.slice(0, 3)}
            </span>
          ))}
        </div>
      )}

      <button
        onClick={onBook}
        style={{
          width: "100%",
          padding: "7px 0",
          background: "#0f766e",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Book Appointment
      </button>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 0",
        borderBottom: "1px solid #f1f5f9",
      }}
    >
      <span style={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}>
        {label}
      </span>
      <span style={{ fontSize: "13px", color: "#0f172a", fontWeight: 600 }}>
        {value}
      </span>
    </div>
  );
}

function EmptyState({ icon, text }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        color: "#94a3b8",
        padding: "20px",
      }}
    >
      {icon}
      <p style={{ margin: 0, fontSize: "13px", textAlign: "center" }}>{text}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    available: { bg: "#dcfce7", color: "#16a34a" },
    booked: { bg: "#fee2e2", color: "#dc2626" },
    pending: { bg: "#fef9c3", color: "#ca8a04" },
    confirmed: { bg: "#dcfce7", color: "#16a34a" },
    completed: { bg: "#dbeafe", color: "#2563eb" },
    cancelled: { bg: "#fee2e2", color: "#dc2626" },
  };
  const c = colors[status] || { bg: "#f1f5f9", color: "#64748b" };
  return (
    <span
      style={{
        padding: "3px 10px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: 700,
        background: c.bg,
        color: c.color,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}
