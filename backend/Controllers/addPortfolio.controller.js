import Portfolio from '../Models/addPortfolio.models.js'
import mongoose from 'mongoose'
//add new portfolio 
export const addPortfolio = async (req, res) => {
  const { title, type,content,projectType,branchType,program } = req.body;
  const image = req.file ? req.file.path : "";
  // const video = req.files?.video ? req.files.video[0].path : "";


  // if (!title || !image || !type) {
  //   return res.status(400).json({
  //     status: false,
  //     message: "All fields (title, image, type) are required",
  //   });
  // }

  if (!["Magento", "Wordpress", "Drupal"].includes(type)) {
    return res.status(400).json({
      status: false,
      message: "Invalid type. Allowed types are Magento, Wordpress, Drupal, and All.",
    });
  }




  if (!["mobile", "web", "desktop"].includes(projectType)) {
    return res.status(400).json({
      status: false,
      message: "Invalid type. Allowed types are web, mobile, desktop.",
    });
  }

  try {
    const portfolio = new Portfolio({
      title,
      image: `${process.env.LOCAL_HOST_NAME}${image}`,
      // video: video ? `http://localhost:${process.env.PORT}/${video}` : "",
 
      type,
      content,
      projectType,
      branchType,
      program
    });

    await portfolio.save();

    return res.status(200).json({
      status: true,
      message: "Portfolio item added successfully",
      data: portfolio,
    });
  } catch (error) {
    console.error("Error adding portfolio item:", error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
//get All Portfolio
// get All Portfolio
export const getAllPortfolioItems = async (req, res) => {
  const { skip = 0, limit = 5 } = req.query; // Receive skip and limit from query params

  try {
    // Fetch portfolio items with pagination
    const portfolio = await Portfolio.find()
      .sort({ createdAt: -1 }) // Sorting by createdAt in descending order
      .skip(parseInt(skip)) // Skip the first 'skip' number of results (for pagination)
      .limit(parseInt(limit)); // Limit the number of items returned

    if (!portfolio || portfolio.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No portfolio items found",
      });
    }

    // Get total count of portfolio items for pagination
    const total = await Portfolio.countDocuments();

    return res.status(200).json({
      status: true,
      portfolio: portfolio,
      total: total, // Send total count for pagination
    });
  } catch (error) {
    console.error("Error fetching portfolio items:", error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};


//get portfolio items by id
export const getPortfolioById=async(req,res)=>{
  const {id}=req.params

         // Validate if the ID is a valid MongoDB ObjectId
          // if(!mongoose.Types.ObjectId.isValid(id)){
          //   return res.status(400).json({
          //     status: false,
          //     message: "Invalid Portfolio ID format",
          // });
          // }

  try {

    const portfolio = await Portfolio.findById(id);
    if(!portfolio){
      return res.status(404).json({
        status:false,
        message:"Portfolio Not Found"
    })
    }
    return res.status(200).json({
      status:true,
      portfolio:portfolio,

  })
  } catch (error) {
    return res.status(500).json({
      message:"Internal Server Error"
    })
    
  }
}

//update portfolio items
export const updatePortfolioItems = async (req, res) => {
  const { id } = req.params;
  const { title, type,content,projectType,branchType,program, } = req.body;
    const image = req.file ? req.file.path : null;
  // const video = req.files?.video ? req.files.video[0].path : "";


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: false,
      message: "Invalid Portfolio Item ID format",
    });
  }



    if (type && !["Magento", "Wordpress", "Drupal"].includes(type)) {
      return res.status(400).json({
        status: false,
        message:
          "Invalid type. Allowed types are Magento, Wordpress, Drupal.",
      });
    }



    // if (projectType && !["mobile", "web", "desktop"].includes(projectType)) {
    //   return res.status(400).json({
    //     status: false,
    //     message: "Invalid type. Allowed types are web, mobile, desktop.",
    //   });
    // }

    try {
      const portfolio = await Portfolio.findById(id);
      if (!portfolio) {
        return res.status(404).json({
          status: false,
          message: "Portfolio Item not found",
        });
      }

      if (title) portfolio.title = title;
      if (branchType) portfolio.branchType = branchType;
      if (program) portfolio.program = program;
      if (projectType) portfolio.projectType = projectType;
      if (content) portfolio.content = content;

    //   if (video){
    //     portfolio.video = `http://localhost:${process.env.PORT}/${video}`;
    //  }
      if (image){
         portfolio.image = `${process.env.LOCAL_HOST_NAME}${image}`;
      }
      if (type) portfolio.type = type;

      await portfolio.save();

      return res.status(200).json({
        status: true,
        message: "Portfolio Item updated successfully",
        portfolio, 
      });
    } catch (error) {
      console.error("Error updating Portfolio:", error);
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: error.message, 
      });
    }
};

//delete portfolio items
export const deletePortfolioItems=async(req,res)=>{
  const {id}=req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: 'Invalid Portfolio Items ID format',
      });
    }
  try {
    
    const portfolio = await Portfolio.findById(id);
    if(!portfolio){
      return res.status(400).json({
        status: false,
        message: 'Portfolio Item not found',
      });
    }

    await Portfolio.deleteOne({_id:id});
    return res.status(200).json({
      status: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting Portfolio Items:', error); 
    return res.status(500).json({
        message:"Internal Server Error"
    })
  }
}




// Random Portfolio API
export const getRandomPortfolio = async (req, res) => {
  try {
    // Fetch all portfolios from the database
    const portfolios = await Portfolio.find();

    if (!portfolios || portfolios.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No portfolios available",
      });
    }

    // Shuffle the portfolios array using Fisher-Yates algorithm
    const shuffledPortfolios = shuffleArray(portfolios);

    // Select the first two portfolios from the shuffled array
    const randomPortfolios = shuffledPortfolios.slice(0, 2);

    console.log("Random portfolios fetched:", randomPortfolios);

    return res.status(200).json({
      status: true,
      message: "Random portfolios fetched successfully",
      data: randomPortfolios,
    });
  } catch (error) {
    console.error("Error fetching random portfolios:", error);
    return res.status(500).json({
      status: false,
      message: "Internalllll Server Error",
    });
  }
};

// Fisher-Yates (Durstenfeld) Shuffle Algorithm
function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;

  // While there are remaining elements to shuffle
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap it with the current element
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}
