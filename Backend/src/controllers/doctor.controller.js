import User from "../models/user.model.js";
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
