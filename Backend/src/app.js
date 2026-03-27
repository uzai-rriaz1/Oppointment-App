import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

///// routes

import userRoutes from "./routes/user.routes.js";

app.use("/api/v1/users", userRoutes);

export default app;
