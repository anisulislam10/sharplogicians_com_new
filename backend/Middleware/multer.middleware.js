import multer from "multer";
import path from "path";

// Set up storage configuration for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, "uploads/"); // Save images in 'uploads/images/'
    } else if (file.mimetype.startsWith("video/")) {
      cb(null, "uploads/videos/"); // Save videos in 'uploads/videos/'
    } else {
      cb(new Error("Invalid file type"), null); // Reject unsupported files
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // E.g., 1631820513456.jpg or .mp4
  },
});

// File filter: only allow images and videos
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif|svg|mp4|mov|avi|mkv|webp/; // Add video formats here
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // Accept the file
  } else {
    return cb(new Error("Only image and video files are allowed!"), false); // Reject the file
  }
};

// Set up the Multer upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Max file size: 50MB (adjust as needed)
  fileFilter: fileFilter,
});

// Export the middleware for use in routes
export default upload;
