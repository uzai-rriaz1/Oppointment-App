import { Router } from "express";
import {
  bookAppointment,
  getAppointments,
} from "../controllers/appointment.controller.js";
import jwtAuth from "../middlewares/jwtAuth.js";
import authorizedRoles from "../middlewares/authorizedRoles.js";

const router = Router();

router.route("/bookappointment").post(jwtAuth, bookAppointment);
router
  .route("/getappointment")
  .get(jwtAuth, authorizedRoles("doctor"), getAppointments);

export default router;
