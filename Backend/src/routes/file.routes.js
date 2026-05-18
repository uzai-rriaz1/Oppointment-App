import { Router } from "express";
import { fileUpload } from "../controllers/upload.controller.js";
import upload from "../middlewares/fileUploading.js";

const router = Router();

router.route("/prescription").post(upload.single("image"), fileUpload);

export default router;
