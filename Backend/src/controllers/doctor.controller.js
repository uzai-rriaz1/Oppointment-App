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

const getDoctor = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!id) throw new apiError(404, "User Id didnt founded");

  const user = await User.findById(id);

  if (!user) throw new apiError(403, "User Doesnt Exist");

  res.status(200).json({
    success: true,
    User: user,
  });
});

export { getDoctor };

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
    existingDay.slots.push(...slots);
  } else {
    await user.availability.push({ day, slots });
  }
  await user.save();

  res.status(200).json({
    success: true,
    Availability: "Availability Updated Suuccessfully",
    availability: user.availability,
  });
});

export { doctorAvailibility };

const doctorSlots = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const id = req.params.id;

  console.log(user);
  // console.log(id);
  if (!user) throw new apiError(402, "There is No user");
  const verified = await User.findById(user?.id);

  if (!verified) throw new apiError(404, "There is no user id");

  if (!id) throw new apiError(403, "There is no Doctor Id present");

  const doctor = await User.findById(id);
  if (!doctor) throw new apiError(401, "There is no doctor with this Id");

  const slots = doctor?.availability;

  res.status(200).json({
    success: true,
    avaliability: slots,
  });
});

export { doctorSlots };
