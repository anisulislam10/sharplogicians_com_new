// import multer from "multer";
// // const path = require("path");
// import path from "path";
// // Set up the storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Define the folder to save the uploaded images
//     cb(null, "uploads/"); // Ensure the "uploads" folder exists
//   },
//   filename: (req, file, cb) => {
//     // Create a unique filename for each uploaded file
//     cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1631820513456.jpg
//   },
// });

// // File filter (optional): only allow images
// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpeg|jpg|png|gif/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true); // Accept the file
//   } else {
//     cb(new Error("Only image files are allowed!"), false); // Reject the file
//   }
// };

// // Set up the Multer upload middleware
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 10 * 1024 * 1024 }, // Max file size: 10MB (optional)
//     fileFilter: fileFilter,
//   }).array("images", 5);  // "images" must match the field name in form-data // "images" is the name of the field in the form, accept up to 5 files
// export default upload;
