import { Router } from "express";
import { doctorsList } from "../controllers/doctor.controller.js";
import jwtAuth from "../middlewares/jwtAuth.js";
import authorizedRoles from "../middlewares/authorizedRoles.js";

const router = Router();

router
  .route("/doctorsList")
  .get(jwtAuth, authorizedRoles("patient"), doctorsList);
// router.route("/doctordashoard").get(jwtAuth, authorizedRRoles("doctor"));

export default router;
