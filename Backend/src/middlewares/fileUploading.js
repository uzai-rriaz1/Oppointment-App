import multer from "multer";
import { memoryStorage } from "multer";

const storage = memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only Image Files Are allowed"));
    }
  },
});

export default upload;
