import { Router } from "express";
import {
  doctorAvailibility,
  doctorsList,
  doctorSlots,
  getDoctor,
} from "../controllers/doctor.controller.js";
import jwtAuth from "../middlewares/jwtAuth.js";
import authorizedRoles from "../middlewares/authorizedRoles.js";

const router = Router();

router
  .route("/doctorsList")
  .get(jwtAuth, authorizedRoles("patient"), doctorsList);
router
  .route("/slots")
  .post(jwtAuth, authorizedRoles("doctor"), doctorAvailibility);
router
  .route("/getslots/:id")
  .get(jwtAuth, authorizedRoles("patient", "doctor"), doctorSlots);
router.route("/getdoctor/:id").get(getDoctor);
// router.route("/doctordashoard").get(jwtAuth, authorizedRRoles("doctor"));

export default router;
