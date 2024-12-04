import QuoteServices from "../Models/QuoteService.models.js";
import mongoose from "mongoose";
// Create a Quote
export const createQuote = async (req, res) => {
    const { QuoteService } = req.body;
    console.log("Request Body:", req.body);

    try {
        const newQuote = new QuoteServices({
            QuoteService
          });     

         
     await newQuote.save();
      return res.status(200).json({ 
        message: 'Quote Service successfully',
        newQuote 
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  // Get All Quotes
export const getAllQuotes = async (req, res) => {
    const { skip = 0, limit = 15 } = req.query; // Receive skip and limit from query params

    try {
      const quotes = await QuoteServices.find()
      .sort({ createdAt: -1 }) // Sorting by createdAt in descending order
        .skip(parseInt(skip)) // Skip the first 'skip' number of results (for pagination)
        .limit(parseInt(limit)); // Limit the number of items returned
        const total = await QuoteServices.countDocuments();


      res.status(200).json({
        quotes:quotes,
        total: total, // Send total count for pagination

    
    });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  // Get Quote By ID
  export const getQuoteById = async (req, res) => {
    try {
      const { id } = req.params;
      const quote = await QuoteServices.findById(id);
      if (!quote) return res.status(404).json({ message: 'Quote service not found' });
      res.status(200).json(quote);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  // Update a Quote
  export const updateQuote = async (req, res) => {

    try {
      const { id } = req.params;
      const { QuoteService } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: false,
            message: "Invalid Service ID Format",
        });
    }



      const updatedQuote = await QuoteServices.findById(id);

      if (!updatedQuote) {
        return res.status(404).json({
            status: false,
            message: " Quote service not found",
        });
    }
    if (QuoteService) updatedQuote.QuoteService = QuoteService;

    await updatedQuote.save();
    return res.status(200).json({
        status: true,
        message: " Quote Service updated successfully",
        updatedQuote,
    });


    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  // Delete a Quote
  export const deleteQuote = async (req, res) => {
    try {
      const { id } = req.params;

      const deletedQuote = await QuoteServices.findByIdAndDelete(id);
      if (!deletedQuote) return res.status(404).json({ message: 'Quote not found' });
      res.status(200).json({ message: 'Quote service deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };




 