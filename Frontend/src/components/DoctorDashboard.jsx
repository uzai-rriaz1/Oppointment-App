import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { routeApi } from "../api/api";
import { useSelector } from "react-redux";
import utc from "dayjs/plugin/utc";
import { Calendar, Check, CircleCheckBig, Clock, User } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
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
  const name = useSelector((state) => state?.user?.user?.name);

  dayjs.extend(utc);

  const [day, setDay] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newSlot, setNewSlot] = useState({ start: "", end: "" });
  const [appointmentId, setAppointmentId] = useState(null);

  const queryClient = useQueryClient();

  const notify = () =>
    toast("Appointment Completed Successfully", {
      type: "success",
      progressClassName: "!bg-white",
      icon: <CircleCheckBig color="white" />,
      className: "!bg-teal-600 !text-white",
    });

  const { data: appointments } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      try {
        const res = await routeApi.get(`/appointments/getappointment`, {
          withCredentials: true,
        });
        return res?.data;
      } catch (error) {
        console.log("FULL ERROR", error?.response);
      }
    },
  });

  const { data: todayAppointments } = useQuery({
    queryKey: ["today"],
    queryFn: async () => {
      try {
        const res = await routeApi.get(`/appointments/todayappointments`, {
          withCredentials: true,
        });
        return res?.data;
      } catch (error) {
        console.log("FULL ERROR Today Appointments", error?.response);
      }
    },
  });

  const { data: slots = [] } = useQuery({
    queryKey: ["slots", id],
    queryFn: async () => {
      const res = await routeApi.get(`/doctors/getslots/${id}`, {
        withCredentials: true,
      });
      return res.data?.avaliability;
    },
    enabled: !!id,
  });

  const addSlotMutation = useMutation({
    mutationFn: async (slot) =>
      await routeApi.post("/doctors/slots", slot, { withCredentials: true }),
    onSuccess: () => {
      queryClient.invalidateQueries(["slots"]);
      setNewSlot({ start: "", end: "" });
      document.getElementById("slot-modal").close();
    },
    onError: (error) => console.log("Slots didnt added", error?.response?.data),
  });

  const handleAddSlot = () => {
    addSlotMutation.mutate({ id, day, slots: [newSlot] });
  };

  const completeMutation = useMutation({
    mutationKey: ["complete"],
    mutationFn: async (id) => {
      await routeApi.put(`/appointments/completedappointment/${id}`);
    },
    onSuccess: () => {
      notify();
      queryClient.invalidateQueries(["appointments"]);
      queryClient.invalidateQueries(["today"]);
    },
    onError: (err) =>
      console.log("FULL COMPLETED APPOINTMENT ERROR", err?.response),
  });

  const totalToday = todayAppointments?.todayAppointments?.length || 0;
  const totalCompleted =
    appointments?.doctor?.filter((s) => s?.status === "completed").length || 0;
  const displayName = name ? name[0].toUpperCase() + name.slice(1) : "Doctor";

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
            Good day
          </p>
          <h1
            style={{
              margin: "2px 0 0",
              fontSize: "22px",
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            Dr. {displayName}
          </h1>
          <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#64748b" }}>
            Here's your practice overview for today
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <StatCard
            icon={<Calendar size={20} color="#0f766e" />}
            iconBg="#ccfbf1"
            label="Today's Appointments"
            value={totalToday}
          />
          <StatCard
            icon={<Check size={20} color="#16a34a" />}
            iconBg="#dcfce7"
            label="Completed"
            value={totalCompleted}
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
        <Panel title="Today's Appointments">
          <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
            {todayAppointments?.todayAppointments?.length ? (
              todayAppointments.todayAppointments.map((appt) => (
                <AppointmentRow
                  key={appt?._id}
                  appt={appt}
                  isSelected={selectedAppointment?._id === appt?._id}
                  onClick={() => {
                    setSelectedAppointment(appt);
                    setAppointmentId(appt?._id);
                  }}
                />
              ))
            ) : (
              <EmptyState
                icon={<Calendar size={32} color="#cbd5e1" />}
                text="No appointments today"
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
                    {selectedAppointment?.patient?.name?.[0]?.toUpperCase()}
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
                      {selectedAppointment?.patient?.name}
                    </p>
                    <p
                      style={{ margin: 0, fontSize: "12px", color: "#64748b" }}
                    >
                      {selectedAppointment?.patient?.email}
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
                    label="Time"
                    value={dayjs(selectedAppointment?.startTime).format(
                      "dddd, hh:mm A",
                    )}
                  />
                  <DetailRow
                    label="Status"
                    value={<StatusBadge status={selectedAppointment?.status} />}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    marginTop: "16px",
                    flexShrink: 0,
                  }}
                >
                  <ActionButton color="#16a34a" label="Accept" />
                  <ActionButton color="#dc2626" label="Reject" />
                  <ActionButton
                    color="#2563eb"
                    label="Complete"
                    onClick={() => completeMutation.mutate(appointmentId)}
                  />
                </div>
              </>
            ) : (
              <EmptyState
                icon={<User size={32} color="#cbd5e1" />}
                text="Select an appointment to view details"
              />
            )}
          </div>
        </Panel>

        <Panel
          title="Availability"
          action={
            <button
              onClick={() => document.getElementById("slot-modal").showModal()}
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
              + Add Slot
            </button>
          }
        >
          <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
            {slots?.length ? (
              slots.map((dayItem, index) => (
                <div key={index} style={{ marginBottom: "14px" }}>
                  <p
                    style={{
                      margin: "0 0 6px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#0f766e",
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                    }}
                  >
                    {dayItem.day}
                  </p>
                  {dayItem.slots.map((s, i) => {
                    const matched = appointments?.doctor?.find((opp) => {
                      const appointmentDay = dayjs(opp.startTime).format(
                        "dddd",
                      );
                      const appointmentTime = dayjs(opp.startTime).format(
                        "HH:mm",
                      );
                      return (
                        appointmentDay === dayItem.day &&
                        appointmentTime === s.start
                      );
                    });
                    const status = matched ? matched.status : "available";
                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "7px 10px",
                          border: "1px solid #e2e8f0",
                          borderRadius: "10px",
                          marginBottom: "6px",
                          background: "#fafafa",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "13px",
                            color: "#334155",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <Clock size={12} color="#94a3b8" />
                          {dayjs(`2000-01-01 ${s.start}`).format(
                            "hh:mm A",
                          )} – {dayjs(`2000-01-01 ${s.end}`).format("hh:mm A")}
                        </span>
                        <StatusBadge status={status} />
                      </div>
                    );
                  })}
                </div>
              ))
            ) : (
              <EmptyState
                icon={<Clock size={28} color="#cbd5e1" />}
                text="No slots added yet"
              />
            )}
          </div>
        </Panel>
      </div>

      <dialog
        id="slot-modal"
        style={{
          border: "none",
          borderRadius: "18px",
          padding: 0,
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          margin: 0,
        }}
      >
        <div
          style={{
            width: "380px",
            padding: "28px",
            background: "#fff",
            borderRadius: "18px",
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
              Add Availability
            </h2>
            <form method="dialog">
              <button
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: "8px",
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "#64748b",
                }}
              >
                ✕
              </button>
            </form>
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
            Day
          </label>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
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
            {daysOfWeek.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <label
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#374151",
              display: "block",
              marginBottom: "6px",
            }}
          >
            Time Range
          </label>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <input
              type="time"
              value={newSlot.start}
              onChange={(e) =>
                setNewSlot({ ...newSlot, start: e.target.value })
              }
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                outline: "none",
              }}
            />
            <input
              type="time"
              value={newSlot.end}
              onChange={(e) => setNewSlot({ ...newSlot, end: e.target.value })}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <button
            onClick={handleAddSlot}
            style={{
              width: "100%",
              padding: "12px",
              background: "#0f766e",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Add Slot
          </button>
        </div>
      </dialog>
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
        minWidth: "180px",
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
          {appt?.patient?.name?.[0]?.toUpperCase() +
            appt?.patient?.name?.slice(1)}
        </p>
        <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#64748b" }}>
          {dayjs(appt?.startTime).format("dddd hh:mm A")} –{" "}
          {dayjs(appt?.endTime).format("hh:mm A")}
        </p>
      </div>
      <StatusBadge status={appt?.status} />
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

function ActionButton({ color, label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: "8px 0",
        background: color,
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        fontSize: "13px",
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
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
