import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"], // Email validation
    },
    phoneNo: {
      type: String,
      required: true,
      match: [/^\d{10,15}$/, "Please enter a valid phone number"], // Basic phone number validation
    },
    location: {
      type: String,
      required: true,
      minlength: [3, "Location must be at least 3 characters long"], // Location validation
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema);

export default Contact;
