import dotenv from "dotenv";
dotenv.config();
import dbConnection from "./db/dbConnection.js";
import app from "./app.js";

dbConnection()
  .then(() => {
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.log("db connection error", error);
  });
