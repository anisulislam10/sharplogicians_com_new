import Quote from "../Models/quote.models.js";
import mongoose from "mongoose";
// Create a Quote
export const createQuote = async (req, res) => {
    const { phoneNumber, email, firstName, lastName, companyName, website, servicesRequired, projectOverview, budget, readyToStart, areaCode } = req.body;
    console.log("Request Body:", req.body);

    try {
        const newQuote = new Quote({
            firstName,
            lastName,
            email,
            phoneNumber, // Mapping phoneNo to phoneNumber in your schema
            areaCode,
            companyName,
            website,
            servicesRequired,
            projectOverview,
            budget,
            readyToStart,
          });     

         
     await newQuote.save();
      return res.status(200).json({ 
        message: 'Quote created successfully',
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
      const quotes = await Quote.find()
      .sort({ createdAt: -1 }) // Sorting by createdAt in descending order
        .skip(parseInt(skip)) // Skip the first 'skip' number of results (for pagination)
        .limit(parseInt(limit)); // Limit the number of items returned
        const total = await Quote.countDocuments();


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
      const quote = await Quote.findById(id);
      if (!quote) return res.status(404).json({ message: 'Quote not found' });
      res.status(200).json(quote);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  // Update a Quote
  export const updateQuote = async (req, res) => {
    const { phoneNo, email, firstName, lastName, companyName, website, servicesRequired, projectOverview, budget, readyToStart, areaCode } = req.body;

    try {
      const { id } = req.params;

      const updatedQuote = await Quote.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedQuote) return res.status(404).json({ message: 'Quote not found' });




      res.status(200).json({ message: 'Quote updated successfully', updatedQuote });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  // Delete a Quote
  export const deleteQuote = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedQuote = await Quote.findByIdAndDelete(id);
      if (!deletedQuote) return res.status(404).json({ message: 'Quote not found' });
      res.status(200).json({ message: 'Quote deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

