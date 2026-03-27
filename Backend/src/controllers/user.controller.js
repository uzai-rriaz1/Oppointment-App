import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new apiError(411, "Check You Entered Email, Username and Password");
  }

  const encryptedPass = await bcrypt.hash(password, 10);
  const token = jwt.sign({ username, email }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  const user = await User.create({
    username,
    email,
    password: encryptedPass,
  });

  res
    .status(200)
    .cookie("token", token, { httpOnly: true, secure: false })
    .json({
      message: "User Ceated Successfully",
      user,
    });
});

export { createUser };

const loginUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    throw new apiError(400, "Please Enter All the Required Fields");
  }
  console.log(req.body);
  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (!user) {
    throw new apiError(400, "User Doesnt Exist");
  }

  const validUser = await bcrypt.compare(password, user.password);
  if (!validUser) {
    throw new apiError(401, "password is not correct");
  }
  console.log(user);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  res
    .status(200)
    .cookie("token", token, { httpOnly: true, secure: false })
    .json({
      success: true,
      message: "Logged in",
      user: {
        id: user._id,
      },
    });
});

export { loginUser };

const getUser = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new apiError(404, "USER DOESNT EXIST");
});
