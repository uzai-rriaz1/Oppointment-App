import { Router } from "express";
import { fileUplaod } from "../controllers/upload.controller.js";
import upload from "../middlewares/fileUploading.js";

const router = Router();

router.route("/prescription").post(upload.single("image"), fileUplaod);

export default router;
