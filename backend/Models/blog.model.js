import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
//   images: [{ type: String }], // Array to store image URLs
image:{
    type:String,
    require:false
},
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;


