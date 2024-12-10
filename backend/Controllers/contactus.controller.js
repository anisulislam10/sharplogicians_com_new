import multerMiddleware from "../Middleware/multer.middleware.js";
import Contact from "../Models/contactus.models.js";
import mongoose from "mongoose";

// Add a new contact
export const addContact = async (req, res) => {
    const image = req.file ? req.file.path : ""; 
    const { phoneNo, email, location } = req.body;

    // Validate required fields
    if (!image) {
        return res.status(400).json({
            status: false,
            message: 'Logo/image is required',
        });
    }

    if (!phoneNo || !email || !location) {
        return res.status(400).json({
            status: false,
            message: 'Phone number, email, and location are required',
        });
    }

    try {
        // Check if a contact with the same logo already exists
        const existingContact = await Contact.findOne({ image: `${process.env.LOCAL_HOST_NAME}/${image}` });
        if (existingContact) {
            return res.status(400).json({
                status: false,
                message: 'Contact with this logo already exists',
            });
        }

        // Create a new contact
        const newContact = new Contact({
            image: `${process.env.LOCAL_HOST_NAME}/${image}`,
            phoneNo,
            email,
            location,
        });

        // Save the contact to the database
        await newContact.save();

        return res.status(200).json({
            status: true,
            message: 'New Contact Image Added Successfully',
            data: newContact,  
        });
    } catch (error) {
        console.error('Error adding contact:', error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
            error: error.message,  
        });
    }
};


// get All Clients
export const getAllContact= async(req,res)=>{
    const { skip = 0, limit = 15 } = req.query; // Receive skip and limit from query params

    try {
        const contact = await Contact.find()
        .sort({ createdAt: -1 }) // Sorting by createdAt in descending order
        .skip(parseInt(skip)) // Skip the first 'skip' number of results (for pagination)
        .limit(parseInt(limit)); // Limit the number of items returned
        if(!contact){
            return res.status(400).json({
                status:false,
                message:"No Contact Image found"
            })
        }

        const total = await Contact.countDocuments();

        return res.status(200).json({
            status:true,
            contact:contact,
            total: total, // Send total count for pagination

        })
    } catch (error) {
        console.log("Error:", error)
        message:"Internal Server Error"
        
    }
}

//get Client by ID
export const getContactById= async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            status: false,
            message: "Invalid Contact ID ",
        });
    }
    try {
    
const contact = await Contact.findById(id);
if(!contact){
    return res.status(404).json({
        status:false,
        message:"Contact Not Found"
    })
}
return res.status(200).json({
    status:true,
    contact:contact
})

    } catch (error) {
        console.log("Error:",error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
        
    }
}

// Update contact
export const updateContact = async (req, res) => {
    const { id } = req.params;
    const { email, phoneNo, location } = req.body;
    const image = req.file ? req.file.path : null;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: false,
            message: 'Invalid Contact ID',
        });
    }

    try {
        // Find the contact by ID
        const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({
                status: false,
                message: 'Contact not found',
            });
        }

        // Update fields if provided
        if (image) contact.image = `${process.env.LOCAL_HOST_NAME}/${image}`;
        if (email) contact.email = email;
        if (phoneNo) contact.phoneNo = phoneNo;
        if (location) contact.location = location;

        // Save updated contact
        await contact.save();

        return res.status(200).json({
            status: true,
            message: 'Contact updated successfully',
            contact,
        });
    } catch (error) {
        console.error("Error updating contact:", error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

//delete client
export const deleteContact=async(req,res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            status:false,
            message:"Invalid Client ID"
        })
    }
    try {

        const contact = await Contact.findById(id);
        if(!contact){
            return res.status(400).json({
                status:false,
                message:"contact not found"
            })
        }
        
        await contact.deleteOne({_id:id});
        return res.status(200).json({
            status:true,
            message:"contact deleted successfully"
        })
    } catch (error) {
        console.log("Error :", error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
        
        
    }
}