import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/FormModal.css";
import { postServices } from "../api/servicesApi"; // Import the postServices function


import QuillToolbar, { modules, formats } from "./Blogs/EiditorTool"; // Assuming you have the Quill Toolbar
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Blogs/style.css";


const AddService = () => {


    const [formData, setFormData] = useState({
        title: "",
        shortDescription: "",
        processOfMetal: "",
        ourWorkingProcess:"",
        content:"",
        image: "",
        
    });

    const navigate = useNavigate();
    const [content,setContent]=useState()


    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setFormData({ ...formData, [name]: files[0] }); // Use the first file for each field
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSave = async () => {
        try {
            const data = new FormData();

            // Append text fields
            data.append("title", formData.title);
            data.append("shortDescription", formData.shortDescription);
            data.append("processOfMetal", formData.processOfMetal);
            data.append("ourWorkingProcess", formData.ourWorkingProcess);
            data.append("content", content);



            // Append image files if they are selected
            if (formData.image) {
                data.append("image", formData.image);  // Append the image file
              }            

            // Send the FormData to the backend
            await postServices(data);
            navigate("/admin/services"); // Navigate on success
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "An error occurred while saving the service.";
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
            <h3>Add New Service</h3>
            <input
            
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="shortDescription"
                placeholder="Short Description"
                value={formData.shortDescription}
                onChange={handleInputChange}
            />
            <textarea
                            type="text"

                name="processOfMetal"
                placeholder="process Of Metal"
                value={formData.processOfMetal}
                onChange={handleInputChange}
            ></textarea>


<textarea
                            type="text"

                name="ourWorkingProcess"
                placeholder=" our Working Process"
                value={formData.ourWorkingProcess}
                onChange={handleInputChange}
            ></textarea>


{/* <textarea
                            type="text"

                name="details"
                placeholder=" More Details"
                value={formData.details}
                onChange={handleInputChange}
            ></textarea> */}


<QuillToolbar />
      <ReactQuill
        theme="snow"
        value={state.value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />

            <input
                type="file"
                name="image"
                onChange={handleInputChange}
            />
            
            
            <button type="button" onClick={handleSave}>
                Save
            </button>
            <button type="button" onClick={() => navigate("/admin/service")}>
                Cancel
            </button>
        </div>
    );
};

export default AddService;
