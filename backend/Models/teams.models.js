import mongoose from "mongoose";

const teamsSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name:{
        type: String,
        required: false,
    },
    position:{
        type: String,
        required: false,
    },
    facebook: { type: String, default: null }, // Social media fields
  linkedin: { type: String, default: null },
  twitter: { type: String, default: null },
  },
  
  { timestamps: true }
);

const OurTeams = mongoose.model("Our-Teams", teamsSchema);

export default OurTeams;
