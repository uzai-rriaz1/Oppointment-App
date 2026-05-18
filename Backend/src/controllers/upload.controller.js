import upload from "../middlewares/fileUploading.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import cloudinary from "../utils/cloudinaryFile.js";
import streamifier from "streamifier";
import { analyzePrescription } from "../utils/fileParsing.js";

const fileUpload = asyncHandler(async (req, res) => {
  const file = req.file;

  if (!file?.buffer) {
    throw new apiError(400, "Please upload a file");
  }


  const base64Image = file.buffer.toString("base64");


  const aiResult = await analyzePrescription({
    base64Image,
    mimeType: file.mimetype,
  });


  // const cloudinaryResult = await new Promise((resolve, reject) => {
  //   const stream = cloudinary.uploader.upload_stream(
  //     { folder: "prescriptions" },
  //     (error, result) => {
  //       if (error) return reject(new apiError(500, "Cloud upload failed"));
  //       resolve(result);
  //     },
  //   );

  //   streamifier.createReadStream(file.buffer).pipe(stream);
  // });

  return res.status(200).json({
    success: true,
    // imageUrl: cloudinaryResult.secure_url,
    // public_id: cloudinaryResult.public_id,
    analysis: aiResult,
  });
});

export { fileUpload };
