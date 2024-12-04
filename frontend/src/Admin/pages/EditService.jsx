import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getServiceById, updateService } from "../api/servicesApi";
// import "./../styles/EditPortfolio.css";


import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuillToolbar, { modules, formats } from "./Blogs/EiditorTool";
import "./Blogs/style.css";


const EditService = () => {
  const { id } = useParams(); // Extract portfolio ID from the URL
  const navigate = useNavigate();

  const [service, setService] = useState({
    title: "",
    shortDescription: "",
    processOfMetal: "",
    ourWorkingProcess:"",
    content:"",
    image: "",
  }); // State for portfolio data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [content, setContent] = useState(""); // State for rich text content

  // Fetch portfolio data when component mounts
  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await getServiceById(id); // API call to get portfolio by ID
        setService(response.service);
        console.log("Data From Edit Service",response);
        
        setContent(response.service.content || "") // Set initial content for Quill editor
      } catch (err) {
        console.error("Error fetching Service:", err);
        setError("Failed to fetch Service data");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setService((prevPortfolio) => ({
      ...prevPortfolio,
      [name]: value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setService((prevPortfolio) => ({
      ...prevPortfolio,
      image: file,
    }));
  };

  // Handle rich text editor changes
  const handleEditorChange = (value) => {
    setContent(value);
};


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", service.title);
    formData.append("shortDescription", service.shortDescription);
    formData.append("processOfMetal", service.processOfMetal);
    formData.append("ourWorkingProcess", service.ourWorkingProcess);
    formData.append("program", service.program);
    formData.append('content', content) // Use the updated content from Quill editor

    if (service.image instanceof File) {
      formData.append("image", service.image); // Append file only if updated
    }

    try {
      await updateService(id, formData); // Call API to update Service
      alert("Portfolio updated successfully");
      navigate("/admin/services"); // Redirect to Service list
    } catch (error) {
      console.error("Error updating Service:", error);
    }
  };

  if (loading) return <p>Loading Service data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="edit-portfolio-page">
      <h1>Edit Service</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={service.title || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        
        
        <div className="form-group">
          <label>short Description</label>
          <input
            type="text"
            name="shortDescription"
            value={service.shortDescription || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>process Of Metal</label>
          <input
            type="text"
            name="processOfMetal"
            value={service.processOfMetal || ""}
            onChange={handleInputChange}
          />
        </div>


        <div className="form-group">
          <label>our Working Process</label>
          <input
            type="text"
            name="ourWorkingProcess"
            value={service.ourWorkingProcess || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className='form-group'>
          <label>Content</label>
          <QuillToolbar />
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleEditorChange}
            modules={modules}
            formats={formats}
          />
        </div>
        <div className="form-group">
          <label>Cover Image</label>
          <input type="file" name="image" onChange={handleFileChange} />
          {service.image && !(service.image instanceof File) && (
            <p>Current Image: {service.image}</p>
          )}
        </div>
        <button type="submit" className="btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditService;
