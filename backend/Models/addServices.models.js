import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  processOfMetal : {
    type: String, 
    required: false,
    default: "" 
  },
  ourWorkingProcess : {
    type: String, 
    required: false,
    default: "" 
  },
  content : {
    type: String, 
    required: false,
    default: "" 
  },

  image: [{ 
    type: String, 
    required: false 
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Services = mongoose.model('Services', serviceSchema);
export default Services;
