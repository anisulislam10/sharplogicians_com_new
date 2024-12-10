import AboutUs from "../Models/aboutUs.models.js";
import mongoose from "mongoose";
//add new about us 
export const addAboutUs = async (req, res) => {
    const { description, mission, vision} = req.body;
    const image = req.file ? req.file.path : "";
  
   
 
  
    try {
      const aboutus = new AboutUs({
        description,
        mission,
        vision,
        image: `${process.env.LOCAL_HOST_NAME}/${image}`, 
      });
  
      await aboutus.save();
  
      return res.status(200).json({
        status: true,
        message: "about us items added successfully",
        data: aboutus,
      });
    } catch (error) {
      console.error("Error adding about us item:", error);
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  };
  


  // get about us page
export const getAboutUs = async (req, res) => {
    const { skip = 0, limit = 5 } = req.query; // Receive skip and limit from query params
  
    try {
      // Fetch about us items with pagination
      const aboutus = await AboutUs.find()
        .sort({ createdAt: -1 }) // Sorting by createdAt in descending order
        .skip(parseInt(skip)) // Skip the first 'skip' number of results (for pagination)
        .limit(parseInt(limit)); // Limit the number of items returned
  
      if (!aboutus || aboutus.length === 0) {
        return res.status(404).json({
          status: false,
          message: "No about us items found",
        });
      }
  
      // Get total count of about us items for pagination
      const total = await AboutUs.countDocuments();
  
      return res.status(200).json({
        status: true,
        aboutus: aboutus,
        total: total, // Send total count for pagination
      });
    } catch (error) {
      console.error("Error fetching aboutus items:", error);
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  };

  //get about us page by id
  export const getAboutById=async(req,res)=>{
    const {id}=req.params;
  
           // Validate if the ID is a valid MongoDB ObjectId
            if(!mongoose.Types.ObjectId.isValid(id)){
              return res.status(400).json({
                status: false,
                message: "Invalid ID format",
            });
            }
  
    try {
  
      const aboutus = await AboutUs.findById(id);
      if(!aboutus){
        return res.status(404).json({
          status:false,
          message:"aboutus Not Found"
      })
      }
      return res.status(200).json({
        status:true,
        aboutus:aboutus,
  
    })
    } catch (error) {
      return res.status(500).json({
        message:"Internal Server Error"
      })
      
    }
  }
  
  //update about us
  export const updateAboutItems = async (req, res) => {
    const { id } = req.params;
    const { description, mission, vision } = req.body;
      const image = req.file ? req.file.path : null;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid about us page ID format",
      });
    }
  
      if (!description && !image && !mission && !vision) {
        return res.status(400).json({
          status: false,
          message: "At least one field is required to update",
        });
      }
  
      
  
      try {
        const aboutus = await AboutUs.findById(id);
        if (!aboutus) {
          return res.status(404).json({
            status: false,
            message: "about us Item not found",
          });
        }
  
        if (description) aboutus.description = description;
        if (mission) aboutus.mission = mission;
        if (vision) aboutus.vision = vision;

        

        if (image){
           aboutus.image = `${process.env.LOCAL_HOST_NAME}/${image}`;
        }
  
        await aboutus.save();
  
        return res.status(200).json({
          status: true,
          message: "about us page updated successfully",
          aboutus, 
        });
      } catch (error) {
        console.error("Error updating about us page:", error);
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
          error: error.message, 
        });
      }
  };

  //delete about us page
  export const deleteAbout=async(req,res)=>{
    const {id}=req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          status: false,
          message: 'Invalid About us ID format',
        });
      }
    try {
      
      const aboutus = await AboutUs.findById(id);
      if(!aboutus){
        return res.status(400).json({
          status: false,
          message: 'About us not found',
        });
      }
  
      await AboutUs.deleteOne({_id:id});
      return res.status(200).json({
        status: true,
        message: 'About us page deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting About us:', error); 
      return res.status(500).json({
          message:"Internal Server Error"
      })
    }
  }
