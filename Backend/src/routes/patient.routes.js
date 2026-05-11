import {
  patientAppoitments,
  patientDoctors,
} from "../controllers/patient.controllers.js";
import jwtAuth from "../middlewares/jwtAuth.js";
import authorizedRoles from "../middlewares/authorizedRoles.js";
import { Router } from "express";

const router = Router();

router.route("/patientappointments").get(jwtAuth, patientAppoitments);
router.route("/patientdoctors").get(jwtAuth, patientDoctors);

export default router;
