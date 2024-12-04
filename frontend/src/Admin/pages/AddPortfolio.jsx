import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/FormModal.css";
import { postPortfolio } from "../api/portfolioApi"; // Import the postPortfolio function
import QuillToolbar, { modules, formats } from "./Blogs/EiditorTool"; // Assuming you have the Quill Toolbar
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Blogs/style.css";

const AddPortfolio = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    type: "",
    projectType: "",
    branchType: "",
    program: "",
    //
  content:""
  });
  const [content,setContent]=useState()
  const navigate = useNavigate();

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle Quill editor change
  // const handleEditorChange = (value) => {
  //   setContent(value); // Update content state with editor value
  // };

  // Handle form submission
  const handleSave = async () => {
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", content);
      data.append("projectType", formData.projectType);
      data.append("branchType", formData.branchType);
      data.append("program", formData.program);


      if (formData.image) {
        data.append("image", formData.image);
      }

      data.append("type", formData.type);

      // Send the form data to the backend
      await postPortfolio(data); // Submit the form data to API
      navigate("/admin/portfolio"); // Redirect to portfolio page after success
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while saving the portfolio.";
      alert(errorMessage);
    }
  };

  const preloadedDoc = ``;
 
 
 
    const [state, setState] = React.useState({ value: preloadedDoc });
  const handleChange = (value) => {
    setState({ value });
    setContent(value)
  };

  return (
    <div className="form">
      <h3>Add New Portfolio</h3>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleInputChange}
      />

      <input
        type="file"
        name="image"
        placeholder="Upload Image"
        onChange={handleInputChange}
      />

      <select
        name="type"
        value={formData.type}
        onChange={handleInputChange}
      >
        <option value="">Select Type</option>
        <option value="Magento">Magento</option>
        <option value="Wordpress">Wordpress</option>
        <option value="Drupal">Drupal</option>
        <option value="React">React</option>
      </select>

      <select
        name="projectType"
        value={formData.projectType}
        onChange={handleInputChange}
      >
        <option value="">Select Project Type</option>
        <option value="mobile">Mobile App</option>
        <option value="web">Web App</option>
        <option value="desktop">Desktop App</option>
      </select>

      <input
        type="text"
        name="branchType"
        placeholder="Branch Type"
        value={formData.branchType}
        onChange={handleInputChange}
      />

      <input
        type="text"
        name="program"
        placeholder="Program"
        value={formData.program}
        onChange={handleInputChange}
      />

<QuillToolbar />
      <ReactQuill
        theme="snow"
        value={state.value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />

{/* <input
        type="text"
        name="shortDesc"
        placeholder="shortDesc"
        value={formData.shortDesc}
        onChange={handleInputChange}
      /> */}

      <button type="button" onClick={handleSave}>Save</button>
      <button type="button" onClick={() => navigate("/admin/portfolio")}>Cancel</button>
    </div>
  );
};

export default AddPortfolio;
