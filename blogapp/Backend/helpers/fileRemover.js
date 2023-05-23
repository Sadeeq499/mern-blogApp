// Import Required Modules and Functions
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get Current File's Path and Directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const fileRemover = (filename) => {
  // Remove File
  fs.unlink(join(__dirname, "../Uploads", filename), function (err) {
    // Handle File Removal Results
    if (err && err.code == "ENOENT") {
      // file doesn't exist
      console.log(`file ${filename} doesn't exist, won't remove it`);
    } else if (err) {
      console.log(` Error occurred while trying to remove file ${filename}`);
    } else {
      console.log(`removed ${filename}`);
    }
  });
};
