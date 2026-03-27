import mongoose from "mongoose";

const Userschema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password Must Be 8 Characters Long"],
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", Userschema);
