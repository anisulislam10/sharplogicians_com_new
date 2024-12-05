import mongoose from "mongoose";
const quoteSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  areaCode: { type: String },
  phoneNumber: { type: String, required: true },
  companyName: { type: String },
  website: { type: String },
  servicesRequired: { type: [String], required: false },
  projectOverview: { type: String },
  budget: { type: String, enum: ['$10-$99', '$100-$500', '$500+'] },
  readyToStart: { type: String, required: true },
}, { timestamps: true });

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;
