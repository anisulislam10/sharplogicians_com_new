import express from 'express'

import upload from '../Middleware/multer.middleware.js';
import { createQuote, deleteQuote, getAllQuotes, getQuoteById, updateQuote } from '../Controllers/QuoteService.controller.js';

const router=express.Router();


//add about us pagge
router.route("/post").post(createQuote);
router.route("/get").get(getAllQuotes);
router.route("/:id").get(getQuoteById);
router.route("/update/:id").put(updateQuote);

router.route("/delete/:id").delete(deleteQuote)

export default router