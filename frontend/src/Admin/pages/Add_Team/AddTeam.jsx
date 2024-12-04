import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../styles/FormModal.css";
import { postTeam } from "../api/../../api/TeamApi"; 

const AddTeam = () => {
    const [formData, setFormData] = useState({ name: "",  position: "", image: ""});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
          setFormData({ ...formData, [name]: files[0] });  // Store the file in state
        } else {
          setFormData({ ...formData, [name]: value });
        }
        // console.log(formData); // Log state after each change
    };

    const handleSave = async () => {
        try {
            const data = new FormData();
    
            // Append text fields
            data.append("name", formData.name);
            data.append("position", formData.position);
            
            data.append("facebook", formData.facebook);
            data.append("linkedin", formData.linkedin);
            data.append("twitter", formData.twitter);


    
          
        data.append("image", formData.image);  // Append the image file
      
    
            // Send the FormData to the backend
            await postTeam(data);
            navigate("/admin/team"); // Navigate on success
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "An error occurred while saving the Team";
            alert(errorMessage);
        }
    };
    
    return (
        <div className="form">
            <h3>Add Team member</h3>
            <input
                type="text"
                name="position"
                placeholder="position"
                value={formData.position}
                onChange={handleInputChange}
                ></input>
               <textarea
                type="text"
                name="name"
                placeholder="name"
                value={formData.name}
                onChange={handleInputChange}
                ></textarea>




<input
                type="text"
                name="facebook"
                placeholder="facebook"
                value={formData.facebook}
                onChange={handleInputChange}
                ></input>
            

            <input
                type="text"
                name="linkedin"
                placeholder="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                ></input>

<input
                type="text"
                name="twitter"
                placeholder="twitter"
                value={formData.twitter}
                onChange={handleInputChange}
                ></input>
            

            <input
                type="file"
                name="image"
                // multiple
                placeholder="Upload Image"
                onChange={handleInputChange} // No value attribute here as file input does not support it
            />
            <button type="button" onClick={handleSave}>Save</button>
            <button type="button" onClick={() => navigate("/admin/team")}>Cancel</button>
        </div>
    );
};

export default AddTeam;
