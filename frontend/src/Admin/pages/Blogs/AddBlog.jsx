import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../styles/FormModal.css";
import { postBlog } from "../api/../../api/BlogApi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import './EditorStyle.css';
import QuillToolbar, { modules, formats } from "./../Blogs/EiditorTool"; // Assuming you have the Quill Toolbar

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    image: "", // URL or file
  });
  const [content, setContent] = useState(""); // Content for the editor
  const navigate = useNavigate();

  // Handle changes in the editor
  const handleEditorChange = (value) => {
    setContent(value);
  };

  // Handle input changes for other fields (title, author, image)
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle blog save
  const handleSave = async () => {
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", content); // Use content from the editor
      data.append("author", formData.author);
      if (formData.image instanceof File) {
        data.append("image", formData.image); // Append image if file is provided
      } else {
        data.append("image", formData.image); // If image URL is provided
      }

      await postBlog(data);
      alert("Blog added successfully");
      navigate("/admin/blog");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred while saving the Blog";
      alert(errorMessage);
    }
  };

  return (
    <div className="form">
      <h3>Add Blog</h3>
      
      {/* Title */}
      <textarea
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleInputChange}
      ></textarea>

      {/* Quill Toolbar and Editor */}
      <QuillToolbar />
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
      />

      {/* Author */}
      <textarea
        type="text"
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleInputChange}
      ></textarea>

      {/* Image URL or File */}
      
      <input
        type="file"
        name="image"
        onChange={handleInputChange}
      />

      {/* Save Button */}
      <button onClick={handleSave}>Save Blog</button>
    </div>
  );
};

export default AddBlog;
