import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../styles/FormModal.css";
import { postQuote } from "../../api/quote"; // Assuming this function handles the API call

const AddQuote = () => {
  const [formData, setFormData] = useState({
    QuoteService: "", // Default value for servicesRequired
  });

  const navigate = useNavigate();

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSave = async () => {
    try {
      // Send the form data as JSON (no need for FormData here)
      const response = await postQuote(formData); // Sending the formData directly

      // Check if the response is successful and navigate accordingly
      if (response.status === 200) {
        navigate("/admin/quote"); // Redirect to quote page after success
      } else {
        alert("Error saving the quote");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while saving the quote.";
      alert(errorMessage);
    }
  };

  return (
    <div className="form">
      <h3>Add Quote Services</h3>

      {/* Input for the service required */}
      <input
        type="text"
        name="QuoteService" // Correct name based on your state
        placeholder="Service name"
        value={formData.QuoteService} // Make sure input is controlled
        onChange={handleInputChange}
      />

      <div className="form-actions">
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={() => navigate("/admin/quote")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddQuote;
