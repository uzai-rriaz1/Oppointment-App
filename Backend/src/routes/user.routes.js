import { Router } from "express";
import {
  createUser,
  loginUser,
  loggedUser,
  logoutUser,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/createuser").post(createUser);
router.route("/login").post(loginUser);
router.route("/me").get(loggedUser);
router.route("/logout").post(logoutUser);

export default router;
