import User from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const doctorsList = asyncHandler(async (req, res, next) => {
  const doctors = await User.find({ role: "doctor" });
  console.log(doctors);
  res.status(200).json({
    success: true,
    doctors,
  });
});

export { doctorsList };

const doctorAvailibility = asyncHandler(async (req, res, next) => {
  const { id, day, slots } = req.body;
  if (!day || !slots || !id)
    throw new apiError(401, "Please Enter Slots And Days");

  const user = await User.findById(id);

  if (!user) throw new apiError(402, "User Id isnt available");

  if (user.role !== "doctor")
    throw new apiError(403, "Only Doctor Can Set Slots");
  const existingDay = user.availability.find((d) => d.day === day);
  if (existingDay) {
    existingDay.slots = slots;
  } else {
    await user.availability.push({ days, slots });
  }
  await user.save();

  res.status(200).json({
    success: true,
    Availability: "Availability Updated Suuccessfully",
    availability: user.availability,
  });
});

export { doctorAvailibility };
