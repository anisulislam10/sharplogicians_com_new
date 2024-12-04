import express from 'express'
import { addAboutUs, deleteAbout, getAboutById, getAboutUs, updateAboutItems } from '../Controllers/aboutUs.controller.js';

import upload from '../Middleware/multer.middleware.js';

const router=express.Router();


//add about us pagge
router.route("/post").post(
    upload.single("image"),
    addAboutUs
);
router.route("/get").get(getAboutUs);
router.route("/:id").get(getAboutById);
router.route("/update/:id").put(
    upload.single("image"),
    updateAboutItems
);

router.route("/delete/:id").delete(deleteAbout)

export default router