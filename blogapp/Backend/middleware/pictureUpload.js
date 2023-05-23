// Import Required Modules and Functions
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get Current File's Path and Directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define Storage Configuration for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../Uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

// Export Multer Instance for File Uploads
export const uploadPicture = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1000000, // 2MB
  },
  //   File Filter
  fileFilter: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return cb(new Error("Only Images are allowed"));
    }
    cb(null, true);
  },
});
