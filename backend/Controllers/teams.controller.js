import OurTeams from "../Models/teams.models.js";
import mongoose from "mongoose";

//add new Teams members 
export const addTeam = async (req, res) => {
    const { name, position,facebook, linkedin, twitter} = req.body;
    const image = req.file ? req.file.path : "";
  
    // if (!title || !image || !type) {
    //   return res.status(400).json({
    //     status: false,
    //     message: "All fields (title, image, type) are required",
    //   });
    // }
  
 
  
    try {
      const ourTeams = new OurTeams({
        name,
        position,
        image: `${process.env.LOCAL_HOST_NAME}/${image}`, 
        facebook: facebook, // Save only if provided
        linkedin: linkedin ,
        twitter: twitter ,
      });
  
      await ourTeams.save();
  
      return res.status(200).json({
        status: true,
        message: "Team member added successfully",
        ourTeams: ourTeams,
      });
    } catch (error) {
      console.error("Error adding Team item:", error);
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  };
  

    // get team members
export const getTeam = async (req, res) => {
    const { skip = 0, limit = 5 } = req.query; // Receive skip and limit from query params
  
    try {
      // Fetch team  items with pagination
      const ourTeam = await OurTeams.find()
        .sort({ createdAt: 1 }) // Sorting by createdAt in descending order
        .skip(parseInt(skip)) // Skip the first 'skip' number of results (for pagination)
        .limit(parseInt(limit)); // Limit the number of items returned
  
      if (!ourTeam || ourTeam.length === 0) {
        return res.status(404).json({
          status: false,
          message: "ourTeam items found",
        });
      }
  
      console.log("Get Team Hitted..");
      
      // Get total count team member us items for pagination
      const total = await OurTeams.countDocuments();
  
      return res.status(200).json({
        status: true,
        ourTeam: ourTeam,
        total: total, // Send total count for pagination
      });
    } catch (error) {
      console.error("Error fetching Team items:", error);
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  };


  //get Team member by id
  export const getTeamById=async(req,res)=>{
    const {id}=req.params;
  
           // Validate if the ID is a valid MongoDB ObjectId
            if(!mongoose.Types.ObjectId.isValid(id)){
              return res.status(400).json({
                status: false,
                message: "Invalid ID format",
            });
            }
  
    try {
  
      const ourTeam = await OurTeams.findById(id);
      if(!ourTeam){
        return res.status(404).json({
          status:false,
          message:"Team member Not Found"
      })
      }
      return res.status(200).json({
        status:true,
        ourTeam:ourTeam,
  
    })
    } catch (error) {
      return res.status(500).json({
        message:"Internal Server Error"
      })
      
    }
  }
  

  //update team member
export const updateTeam = async (req, res) => {
  const { id } = req.params;
  const { name, position, facebook, linkedin, twitter } = req.body; // Include social media fields
  const image = req.file ? req.file.path : null;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: false,
      message: "Invalid Team member ID format",
    });
  }

  // Ensure at least one field is provided
  if (!name && !image && !position && !facebook && !linkedin && !twitter) {
    return res.status(400).json({
      status: false,
      message: "At least one field is required to update",
    });
  }

  try {
    const ourTeam = await OurTeams.findById(id);
    if (!ourTeam) {
      return res.status(404).json({
        status: false,
        message: "Team member not found",
      });
    }

    // Update fields dynamically
    if (name) ourTeam.name = name;
    if (position) ourTeam.position = position;
    if (image) {
      ourTeam.image = `${process.env.LOCAL_HOST_NAME}/${image}`;
    }
    if (facebook) ourTeam.facebook = facebook;
    if (linkedin) ourTeam.linkedin = linkedin;
    if (twitter) ourTeam.twitter = twitter;

    // Save the updated document
    await ourTeam.save();

    return res.status(200).json({
      status: true,
      message: "Team member updated successfully",
      ourTeam,
    });
  } catch (error) {
    console.error("Error updating team member:", error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};



  //delete team member
  export const deleteTeam=async(req,res)=>{
    const {id}=req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          status: false,
          message: 'Invalid team member ID format',
        });
      }
    try {
      
      const ourTeam = await OurTeams.findById(id);
      if(!ourTeam){
        return res.status(400).json({
          status: false,
          message: 'Team member not found',
        });
      }
  
      await OurTeams.deleteOne({_id:id});
      return res.status(200).json({
        status: true,
        message: 'Team member deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting team:', error); 
      return res.status(500).json({
          message:"Internal Server Error"
      })
    }
  }