import dotenv from "dotenv";
dotenv.config();
import dbConnection from "./db/dbConnection.js";
import app from "./app.js";

dbConnection()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Server running on http://localhost:${process.env.PORT || 3000}`,
      );
    });
  })
  .catch((error) => {
    console.log("db connection error", error);
  });
