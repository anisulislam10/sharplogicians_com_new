import express from 'express';
import upload from '../Middleware/multer.middleware.js';

import { 
    addPortfolio, 
    deletePortfolioItems, 
    getAllPortfolioItems, 
    getPortfolioById, 
    getRandomPortfolio, 
    updatePortfolioItems 
} from '../Controllers/addPortfolio.controller.js';

import { verifyAdminToken } from '../Middleware/verifyToken.middleware.js';

const router = express.Router();

// Add portfolio Route (with Multer middleware for image and video upload)
router.route("/post").post(
    upload.single("image"),

    addPortfolio
);

// Get all portfolio items
router.route("/get").get(getAllPortfolioItems);

// Get a single portfolio item by ID
router.route("/:id").get(getPortfolioById);

// Update portfolio item (with image and video upload support)
router.route("/update/:id").put(
    upload.single("image"),

    updatePortfolioItems
);

// Delete portfolio item
router.route("/delete/:id").delete(deletePortfolioItems);
router.route("/randFn").get(getRandomPortfolio)



export default router;
