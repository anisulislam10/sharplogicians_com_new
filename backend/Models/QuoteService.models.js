import mongoose from "mongoose";
const quoteServiceSchema = new mongoose.Schema({
  QuoteService: { 
    type: String, 
    required: true 
},
  
});

const QuoteServices = mongoose.model("Quote_Service", quoteServiceSchema);

export default QuoteServices;
