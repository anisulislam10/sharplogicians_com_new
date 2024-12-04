import express from 'express'

import upload from '../Middleware/multer.middleware.js';
import { addTestimonial, deleteTestimonial, getTestimonial, getTestimonialById, updateTestimonial } from '../Controllers/testimonial.controller.js';

const router=express.Router();


router.route("/post").post(
    upload.single("image"),
    addTestimonial
);
router.route("/get").get(getTestimonial);
router.route("/:id").get(getTestimonialById);
router.route("/update/:id").put(
    upload.single("image"),
    updateTestimonial
);

router.route("/delete/:id").delete(deleteTestimonial)

export default router