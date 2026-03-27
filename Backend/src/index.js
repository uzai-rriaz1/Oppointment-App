import dbConnection from "./db/dbConnection.js";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

dbConnection()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("db connection error", error);
  });
