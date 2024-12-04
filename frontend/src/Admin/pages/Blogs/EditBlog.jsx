import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, updateBlog } from "../../api/BlogApi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import "./style.css";
import './../../styles/EditClient.css'
import "./../../styles/FormModal.css";


import QuillToolbar, { modules, formats } from "./EiditorTool"; // Assuming you have this toolbar


import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './EditorStyle.css'
import { EditorState } from 'draft-js';  // Import EditorState from draft-js

const EditBlog = () => {
    const { id } = useParams(); // Extract Blog ID from URL
    const navigate = useNavigate();
    
    const [blog, setBlog] = useState({
        title: "",
        image: "",
        author: ""
    });
    const [editorState, setEditorState] = useState(EditorState.createEmpty()); // Use EditorState from draft-js

    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [content, setContent] = useState(""); // Content state for Quill editor

    // Fetch Blog data when component mounts
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await getBlogById(id); // API call to get Blog by ID
                setBlog(response.blog); // Adjust response structure based on API
                setContent(response.blog.content); // Set initial content for Quill editor
            } catch (err) {
                console.error("Error fetching Blog:", err);
                setError("Failed to fetch Blog data");
            } finally {
                setLoading(false); // Stop loading spinner
            }
        };

        fetchBlog();
    }, [id]);

    // Handle input changes for text fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlog((prevBlog) => ({
            ...prevBlog,
            [name]: value,
        }));
    };

    // Handle file input changes for image upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setBlog((prevBlog) => ({
            ...prevBlog,
            image: file,
        }));
    };

    // Handle content changes in Quill editor
    const handleEditorChange = (value) => {
        setContent(value);
    };

    // Handle form submission to update the blog
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", blog.title);
        formData.append("content", content); // Use the updated content from Quill editor
        formData.append("author", blog.author);
        if (blog.image instanceof File) {
            formData.append("image", blog.image); // Append file only if updated
        }

        try {
            await updateBlog(id, formData); // Call API to update Blog
            alert("Blog updated successfully");
            navigate("/admin/blog"); // Redirect to Blog list
        } catch (error) {
            console.error("Error updating Blog:", error);
            alert("Failed to update Blog");
        }
    };

    if (loading) return <p>Loading Blog data...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="edit-blog-page">
            <h1>Edit Blog</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <textarea
                        name="title"
                        value={blog.title || ""}
                        onChange={handleInputChange}
                        placeholder="Blog Title"
                    />
                </div>








                <div className="form-group">
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
                    <label>Author</label>
                    <textarea
                        name="author"
                        value={blog.author || ""}
                        onChange={handleInputChange}
                        placeholder="Author"
                    />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                    />
                    {blog.image && !(blog.image instanceof File) && (
                        <p>Current Image: {blog.image}</p> // Display current image if it's not a file
                    )}
                </div>
                <button type="submit" className="btn-primary">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditBlog;
