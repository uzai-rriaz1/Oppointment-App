import { Router } from "express";
import {
  bookAppointment,
  getAppointments,
  todayAppointments,
  completedBookings,
} from "../controllers/appointment.controller.js";
import jwtAuth from "../middlewares/jwtAuth.js";
import authorizedRoles from "../middlewares/authorizedRoles.js";

const router = Router();

router.route("/bookappointment").post(jwtAuth, bookAppointment);
router
  .route("/getappointment")
  .get(jwtAuth, authorizedRoles("doctor"), getAppointments);
router
  .route("/todayappointments")
  .get(jwtAuth, authorizedRoles("doctor"), todayAppointments);
router
  .route("/completedappointment/:id")
  .put(jwtAuth, authorizedRoles("doctor"), completedBookings);

export default router;
