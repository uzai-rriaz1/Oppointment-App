import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const response = await mongoose.connect("mongodb://localhost:27017/");
    if (response) console.log("Db connected Succe3sfully");
    return response;
  } catch (error) {
    console.log("db connection errror", error);
  }
};

export default dbConnection;
