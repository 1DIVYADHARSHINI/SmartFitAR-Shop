import multer from "multer";
import fs from "fs";
import path from "path";

const sellerUploadPath = "uploads/sellers";

// Ensure folder exists
if (!fs.existsSync(sellerUploadPath)) {
  fs.mkdirSync(sellerUploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, sellerUploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
