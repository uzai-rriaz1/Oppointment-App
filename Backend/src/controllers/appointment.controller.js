import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Appointment from "../models/appointments.model.js";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

const bookAppointment = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const { id, time } = req.body;
  console.log("TIME", time);

  if (!user) throw new apiError(404, "User Does Not Exist");
  if (!id || !time) throw new apiError(401, "Please Select Slot");

  dayjs.extend(customParseFormat);

  const start = dayjs(`${time.date} ${time.start}`).toDate();
  const end = dayjs(`${time.date} ${time.end}`).toDate();

  console.log("START TIME", start);
  const existing = await Appointment.findOne({
    doctor: id,
    startTime: start,
  });

  if (existing) throw new apiError(405, "Slot Is Already Booked");

  const bookedAppointment = await Appointment.create({
    patient: user.id,
    doctor: id,
    startTime: start,
    endTime: end,
  });

  res.status(200).json({
    success: true,
    message: "Appointment Booked Successfully",
    appointment: bookedAppointment,
  });
});

export { bookAppointment };

const getAppointments = asyncHandler(async (req, res, next) => {
  const user = req.user;
  console.log("USER", user);
  if (!user) throw new apiError(404, "User Doesnt exist");

  const id = user?.id;
  console.log("ID", id);
  if (!id) throw new apiError(402, "iD DIDNT MATHCHED ");

  const doctor = await Appointment.find({
    doctor: id,
  });

  console.log("DOCTOR", doctor);

  if (!doctor) throw new apiError(401, "Doctor dont exist");

  res.status(200).json({
    success: true,
    doctor: doctor,
  });
});

export { getAppointments };

const todayAppointments = asyncHandler(async (req, res, next) => {
  const doctor = req.user.id;
  if (!doctor) throw new apiError(404, "User Doesnt Exist");

  const stratofday = dayjs().startOf("day").toDate();
  const endofday = dayjs().endOf("day").toDate();
  const appointments = await Appointment.find({
    doctor: doctor,
    startTime: {
      $gte: stratofday,
      $lte: endofday,
    },
  }).populate("patient", "email name");

  res.status(200).json({
    success: true,
    todayAppointments: appointments,
  });
});

export { todayAppointments };

// const cancelAppointment = asyncHandler(async (req, res, next) => {
//   const doctor = req.user.id;
//   const oppointmentId = req.body;
//   if (!doctor) throw new apiError(404, "User Doesnt Exist");
// });

// const completedAppointments = asyncHandler(async(req, res, next)=>{
//   const user = req.user
// })

const completedBookings = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const user = req.user;

  if (!id) throw new apiError(401, "Kindly Select An Slot");
  const appointment = await Appointment.findById(id);

  if (!appointment) throw new apiError(405, "There is No appointment");
  if (appointment.status === "completed")
    throw new apiError(400, "Appointment Already Completed");
  appointment.status = "completed";

  await appointment.save();

  res.status(200).json({
    success: true,
    message: "Appointment Completed",
  });
});

export { completedBookings };
