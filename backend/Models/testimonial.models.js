import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    comment:{
        type: String,
        required: false,
    },
    image:{
        type: String,
        required: false,
    },
    personName:{
      type: String,
        required: false,
    }
  },
  { timestamps: true }
);

const Testimonials = mongoose.model("Testimonials", testimonialSchema);

export default Testimonials;
