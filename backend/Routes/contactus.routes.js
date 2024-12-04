import express from "express";
import upload from "../Middleware/multer.middleware.js"; // Import the configured Multer instance
// import {
  

// } from "../Controllers/ourClients.controller.js"; 
import { verifyAdminToken } from "../Middleware/verifyToken.middleware.js"; 
import { addContact, deleteContact, getAllContact, getContactById, updateContact } from "../Controllers/contactus.controller.js";

const router = express.Router();

// Add Client Route (with Multer middleware for file upload)
router.route("/post").post(
  
  upload.single("image"),  
  addContact  
);

router.route("/get").get(getAllContact)
router.route("/:id").get(getContactById)

router.route("/update/:id").put(
  
  upload.single("image"),
  updateContact
)

router.route("/delete/:id").delete(deleteContact)

export default router;
