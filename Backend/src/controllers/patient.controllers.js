import Appointment from "../models/appointments.model.js";
import User from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const patientAppoitments = asyncHandler(async (req, res, next) => {
  const patient = req.user;

  if (!patient) throw new apiError(403, "User Doesnt Exist");

  const id = patient?.id;
  if (!id) throw new apiError("Ther is No patient Id");

  const appointment = await Appointment.find({
    patient: id,
  }).populate("doctor", "name email");

  res.status(200).json({
    success: true,
    appointments: appointment,
  });
});

export { patientAppoitments };

const patientDoctors = asyncHandler(async (req, res, next) => {
  const patient = req.user;

  if (!patient) throw new apiError(403, "User Doesnt Exist");

  const id = patient?.id;
  if (!id) throw new apiError("There is No patient Id");

  const patientDoctors = await Appointment.find({
    patient: id,
  }).populate("doctor", "email name");

  res.status(200).json({
    success: true,
    doctors: patientDoctors,
  });
});

export { patientDoctors };
