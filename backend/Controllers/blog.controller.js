// import upload from './../Middleware/blog.multer.js'
import Blog from './../Models/blog.model.js'
import mongoose from "mongoose";

export const createBlog= async(req,res)=>{
  const { title, content, author } = req.body;

  // Get the paths of the uploaded images from Multer
  const image = req.file ? req.file.path : "";
  

    
    try {
        const newBlog = new Blog({
          title,
          content,
          author,
          image: `${process.env.LOCAL_HOST_NAME}${process.env.PORT}/${image}`,
          
        });
    
        await newBlog.save();
        res.status(201).json({ 
            message: "Blog created successfully", 
            
        });
    } catch (error) {
        console.log("Error in Create bloging", error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
        
        
    }
}

// Get all blogs with their images
export const getBlogs = async (req, res) => {
  const { skip = 0, limit = 5 } = req.query; // Receive skip and limit from query params

    try {

      const blog = await Blog.find()
      .sort({ createdAt: -1 }) // Sorting by createdAt in descending order
      .skip(parseInt(skip)) // Skip the first 'skip' number of results (for pagination)
      .limit(parseInt(limit)); // Limit the number of items returned


      if (!blog || blog.length === 0) {
        return res.status(404).json({
          status: false,
          message: "Blog not found",
        });
      }
  

      const total = await Blog.countDocuments();

      // Map over blogs to include full URLs for images
      return res.status(200).json({
        status: true,
        blog:blog,
        total: total, // Send total count for pagination
      });
  
      // Send the response with the list of blogs and image URLs
    } catch (err) {
      console.error("Error fetching blogs:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  export const getBlogById = async (req, res) => {

    const { id } = req.params; // Get the blog ID from the request parameters
// Validate if the ID is a valid MongoDB ObjectId
if(!mongoose.Types.ObjectId.isValid(id)){
  return res.status(400).json({
    status: false,
    message: "Invalid ID format",
});
}
    try {
  
      const blog = await Blog.findById(id);
      if(!blog){
        return res.status(404).json({
          status:false,
          message:"Blog Not Found"
      })
      }
      return res.status(200).json({
        status:true,
        blog:blog,
  
    })
    } catch (err) {
      console.error("Error fetching blog by ID:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  

  export const updateBlog = async (req, res) => {

    const { id } = req.params; // Get the blog ID from the request parameters
    const { title, content, author } = req.body; // Extract new data (excluding images) from the request body
    const image = req.file ? req.file.path : null;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid Blog ID format",
      });
    }





    if (!title && !content && !author && !image) {
      return res.status(400).json({
        status: false,
        message: "At least one field is required to update",
      });
    }
    try {
      
      const blogs = await Blog.findById(id);
      if (!blogs) {
        return res.status(404).json({
          status: false,
          message: "Blog not found.",
        });
      }
  

      if (title) blogs.title = title;
      if (content) blogs.content = content;
      if (author) blogs.author = author;

      if (image){
        blogs.image = `${process.env.LOCAL_HOST_NAME}${process.env.PORT}/${image}`;
      }
      // Update the blog with the new data
      await blogs.save();

        
  
      // Send the response with the updated blog and image URLs
      res.status(200).json({
         message: "Blog updated successfully", 
         blogs  
        
        });
    } catch (err) {
      console.error("Error updating blog:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


  //delete blog 
  export const deleteBlog = async (req, res) => {
    try {
      const { id } = req.params; // Get the blog ID from the request parameters
  
      // Find the blog by its ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          status: false,
          message: 'Invalid About us ID format',
        });
      }
  
      // If the blog doesn't exist, return a 404 response
      const blog = await Blog.findById(id);
      if(!blog){
        return res.status(400).json({
          status: false,
          message: 'Blog  not found',
        });
      }
      // Delete associated images from the server (optional)
      // Assuming images are stored in the 'uploads' folder
      await Blog.deleteOne({_id:id});
      return res.status(200).json({
        status: true,
        message: 'Blog deleted successfully',
      });
  
      // Send success response
    } catch (err) {
      console.error("Error deleting blog:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };