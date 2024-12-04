import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../styles/FormModal.css";
import { postAbout } from "../../api/About_us"; 

const AddAbout = () => {
    const [formData, setFormData] = useState({ description: "", image: "", mission: "" , vision:""});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        // console.log(formData); // Log state after each change
    };

    const handleSave = async () => {
        try {
            const data = new FormData();
    
            // Append text fields
            data.append("description", formData.description);
            data.append("mission", formData.mission);
            data.append("vision", formData.vision);
    
            if (formData.image) {
        data.append("image", formData.image);  // Append the image file
      }
    
            // Send the FormData to the backend
            await postAbout(data);
            navigate("/admin/about"); // Navigate on success
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "An error occurred while saving the about page.";
            alert(errorMessage);
        }
    };
    
    return (
        <div className="form">
            <h3>Add About page</h3>
            <textarea
                type="text"
                name="description"
                placeholder="description"
                value={formData.description}
                onChange={handleInputChange}
                ></textarea>


               <textarea
                type="text"
                name="mission"
                placeholder="mission"
                value={formData.mission}
                onChange={handleInputChange}
                ></textarea>

               <textarea
                type="text"
                name="vision"
                placeholder="vision"
                value={formData.vision}
                onChange={handleInputChange}
                ></textarea>


            <input
                type="file"
                name="image"
                // multiple
                placeholder="Upload Image"
                onChange={handleInputChange} // No value attribute here as file input does not support it
            />
            <button type="button" onClick={handleSave}>Save</button>
            <button type="button" onClick={() => navigate("/admin/about")}>Cancel</button>
        </div>
    );
};

export default AddAbout;
