import Testimonials from "../Models/testimonial.models.js";
import mongoose from "mongoose";

//add new testimonial  
export const addTestimonial = async (req, res) => {
    const { companyName, comment,personName} = req.body;
    const image = req.file ? req.file.path : "";
  
    try {
      const testimonial = new Testimonials({
        companyName,
        comment,
        personName,
        image: `${process.env.LOCAL_HOST_NAME}/${image}`, 
      });
  
      await testimonial.save();
  
      return res.status(200).json({
        status: true,
        message: "New Testimonial added successfully",
        testimonial: testimonial,
      });
    } catch (error) {
      console.error("Error adding testimonial item:", error);
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  };


      // get  All Testimonials
export const getTestimonial = async (req, res) => {
    const { skip = 0, limit = 5 } = req.query; // Receive skip and limit from query params
  
    try {
      // Fetch testimonial  items with pagination
      const testimonial = await Testimonials.find()
        .sort({ createdAt: -1 }) // Sorting by createdAt in descending order
        .skip(parseInt(skip)) // Skip the first 'skip' number of results (for pagination)
        .limit(parseInt(limit)); // Limit the number of items returned
  
      if (!testimonial || testimonial.length === 0) {
        return res.status(404).json({
          status: false,
          message: "Testimonial not found",
        });
      }
  
      // Get total count testimonial member us items for pagination
      const total = await Testimonials.countDocuments();
  
      return res.status(200).json({
        status: true,
        testimonial: testimonial,
        total: total, // Send total count for pagination
      });
    } catch (error) {
      console.error("Error fetching testimonial items:", error);
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  };


   //get testimonial by id
   export const getTestimonialById=async(req,res)=>{
    const {id}=req.params;
  
           // Validate if the ID is a valid MongoDB ObjectId
            if(!mongoose.Types.ObjectId.isValid(id)){
              return res.status(400).json({
                status: false,
                message: "Invalid ID format",
            });
            }
  
    try {
  
      const testimonial = await Testimonials.findById(id);
      if(!testimonial){
        return res.status(404).json({
          status:false,
          message:"Testimonial Not Found"
      })
      }
      return res.status(200).json({
        status:true,
        testimonial:testimonial,
  
    })
    } catch (error) {
      return res.status(500).json({
        message:"Internal Server Error"
      })
      
    }
  }


   //update Testimonial
  export const updateTestimonial = async (req, res) => {
    const { id } = req.params;
    const { companyName, comment,personName } = req.body;
      const image = req.file ? req.file.path : null;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid Testimonial ID format",
      });
    }
  
      if (!companyName && !image && !comment && !personName) {
        return res.status(400).json({
          status: false,
          message: "At least one field is required to update",
        });
      }
  
      
  
      try {
        const testimonial = await Testimonials.findById(id);
        if (!testimonial) {
          return res.status(404).json({
            status: false,
            message: "Testimonial not found",
          });
        }
  
        if (companyName) testimonial.companyName = companyName;
        if (comment) testimonial.comment = comment;
        if (personName) testimonial.personName = personName;


        if (image){
            testimonial.image = `${process.env.LOCAL_HOST_NAME}/${image}`;
        }
  
        await testimonial.save();
  
        return res.status(200).json({
          status: true,
          message: "Testimonials updated successfully",
          testimonial, 
        });
      } catch (error) {
        console.error("Error updating Testimonial:", error);
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
          error: error.message, 
        });
      }
  };

   //delete Testimonial
   export const deleteTestimonial=async(req,res)=>{
    const {id}=req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          status: false,
          message: 'Invalid Testimonial ID format',
        });
      }
    try {
      
      const testimonial = await Testimonials.findById(id);
      if(!testimonial){
        return res.status(400).json({
          status: false,
          message: 'Testimonial not found',
        });
      }
  
      await testimonial.deleteOne({_id:id});
      return res.status(200).json({
        status: true,
        message: 'Testimonial deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting testimonial:', error); 
      return res.status(500).json({
          message:"Internal Server Error"
      })
    }
  }