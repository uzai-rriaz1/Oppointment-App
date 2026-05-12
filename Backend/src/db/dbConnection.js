import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    console.log("DB_URI:", process.env.DB_URI);
    const response = await mongoose.connect(`${process.env.DB_URI}`);
    if (response) console.log("Db connected Succe3sfully");
    return response;
  } catch (error) {
    console.log("db connection errror", error);
  }
};

export default dbConnection;
