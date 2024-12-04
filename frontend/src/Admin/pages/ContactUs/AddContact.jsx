import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../styles/FormModal.css";
import { postContact } from "../../api/ContactUs_Api"; // Import the  function

const AddContact = () => {
  const [formData, setFormData] = useState({  image: "",phoneNo:"",location:"",email:"" });
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
      // Append the form data to FormData object
     
      if (formData.image) {
        data.append("image", formData.image);  // Append the image file
        data.append("phoneNo", formData.phoneNo);
        data.append("location", formData.location);
        data.append("email", formData.email);

      }
      console.log("FormData:", data);


      // Send the form data to the backend
      await postContact(data); // Pass the FormData to the API postportfolio function
      // console.log("Portfolio saved successfully:", formData);
      navigate("/admin/contact"); // Navigate to portfolio page after success
    } catch (error) {
      // Show the error message in an alert
      const errorMessage = error.response?.data?.message || "An error occurred while saving the Client.";
      alert(errorMessage);  // Display the error message
      // console.log(errorMessage); // Optional: log it to the console for debugging
    }




    
  };

    


  

  return (
    <div className="form">
      <h3>Add Contact Image</h3>
      
      <input
        type="file"
        name="image"
        placeholder="Upload Image"
        onChange={handleInputChange} // No value attribute here as file input does not support it
      />

<h3>Add Phone No</h3>
      
      <input
        type="number"
        name="phoneNo"
        placeholder="phoneNo"
        onChange={handleInputChange} // No value attribute here as file input does not support it
      />


<h3>Add location</h3>
      
      <input
        type="text"
        name="location"
        placeholder="location"
        onChange={handleInputChange} // No value attribute here as file input does not support it
      />


<h3>Add Email</h3>
      
      <input
        type="text"
        name="email"
        placeholder="email"
        onChange={handleInputChange} // No value attribute here as file input does not support it
      />


      
      
      <button type="button" onClick={handleSave}>Save</button>
      <button type="button" onClick={() => navigate("/admin/contact")}>Cancel</button>
    </div>
  );
};

export default AddContact;
