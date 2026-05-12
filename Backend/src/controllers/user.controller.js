import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//
// ✅ CREATE USER (FIXED TOKEN + EMAIL NORMALIZATION)
//
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, specialization } = req.body;

  if (!name || !email || !password || !role) {
    throw new apiError(400, "Missing required fields");
  }

  const normalizedEmail = email.toLowerCase();

  const existed = await User.findOne({ email: normalizedEmail });
  if (existed) throw new apiError(400, "Email already exists");

  const encryptedPass = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email: normalizedEmail,
    role,
    password: encryptedPass,
    ...(role === "doctor" && { specialization }),
  });

  // ✅ FIXED: same token structure everywhere
  const token = jwt.sign(
    { id: user._id, role: user.role, name: user.name },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
  );

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
    })
    .json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
});

//
// ✅ LOGIN USER (NORMALIZED + CLEAN)
//
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new apiError(400, "Please enter email and password");
  }

  const normalizedEmail = email.toLowerCase();

  const user = await User.findOne({ email: normalizedEmail });
  if (!user) throw new apiError(400, "User does not exist");

  const validUser = await bcrypt.compare(password, user.password);
  if (!validUser) throw new apiError(401, "Incorrect password");

  const token = jwt.sign(
    { id: user._id, role: user.role, name: user.name },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
  );

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
       httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
});

//
// ✅ LOGOUT USER (OK)
//
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

//
// ✅ GET LOGGED USER (SAFE JWT + FIXED ERROR HANDLING)
//
const loggedUser = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) throw new apiError(401, "No token found");

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    throw new apiError(401, "Invalid token");
  }

  const user = await User.findById(decoded.id).select("-password");

  if (!user) throw new apiError(401, "User not authorized");

  res.status(200).json({
    success: true,
    user,
  });
});

export { createUser, loginUser, logoutUser, loggedUser };
