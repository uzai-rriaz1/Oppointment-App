import upload from "../middlewares/fileUploading.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import cloudinary from "../utils/cloudinaryFile.js";
import streamifier from "streamifier";

const fileUplaod = asyncHandler(async (req, res, next) => {
  const file = req.file;

  if (!file) throw new apiError(402, "Please Uplaod File");

  const CloudinaryUpload = () => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "prescriptions" },
        (error, result) => {
          if (error) {
            reject(new apiError(403, "File Didnt Uploaded TO Cloudinary"));
          } else {
            resolve(result);
          }
        },
      );

      streamifier.createReadStream(file.buffer).pipe(stream);
    });
  };
  const cloudinaryResult = await CloudinaryUpload();

  return res.status(200).json({
    success: true,
    imageUrl: cloudinaryResult.secure_url,
    public_id: cloudinaryResult.public_id,
  });
});

export { fileUplaod };
