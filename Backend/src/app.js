import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://oppointment-app.vercel.app",

    credentials: true,
  }),
);

///// routes

import userRoutes from "./routes/user.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js ";
import PatientRouter from "./routes/patient.routes.js";
import FileRouter from "./routes/file.routes.js";
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/doctors", doctorRoutes);
app.use("/api/v1/appointments", appointmentRoutes);
app.use("/api/v1/patients", PatientRouter);
app.use("/api/v1/file", FileRouter);
app.use(errorHandler);

export default app;
