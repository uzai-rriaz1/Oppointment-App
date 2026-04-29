import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

///// routes

import userRoutes from "./routes/user.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/doctors", doctorRoutes);
app.use(errorHandler);

export default app;
