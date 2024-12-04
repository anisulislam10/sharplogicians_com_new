import express from 'express';

// import upload from './../Middleware/blog.multer.js'
import upload from "./../Middleware/multer.middleware.js"; // Import the configured Multer instance

import { createBlog, deleteBlog, getBlogById, getBlogs, updateBlog } from '../Controllers/blog.controller.js';
const router=express.Router();

router.route("/post").post( 
    upload.single("image"),
    createBlog);
router.route("/get").get(getBlogs);
router.route("/:id").get(getBlogById);

router.route("/update/:id").put( 
    upload.single("image"),
    updateBlog);
router.route("/delete/:id").delete(deleteBlog);


export default router;

