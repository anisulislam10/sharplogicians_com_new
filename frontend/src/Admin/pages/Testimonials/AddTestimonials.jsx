import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../styles/FormModal.css";
import { postTestimonial } from "../../api/TestimonialsApi";

const AddTestimonial = () => {
    const [formData, setFormData] = useState({ companyName: "", comment: "", image: "",personName:"" });
    const navigate = useNavigate();
    console.log("testi::",formData);
    

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setFormData({ ...formData, [name]: files[0] }); // Use the first file
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSave = async () => {
        try {
            const data = new FormData();
            data.append("companyName", formData.companyName);
            data.append("comment", formData.comment);
            data.append("image", formData.image);
            data.append("personName", formData.personName);


            console.log("FormData being sent:", formData);

            await postTestimonial(data);
            alert("Testimonial added successfully");
            navigate("/admin/testimonial");
        } catch (error) {
            console.error("Error while saving testimonial:", error);
            const errorMessage =
                error.response?.data?.message || "An error occurred while saving the testimonial";
            alert(errorMessage);
        }
    };

    return (
        <div className="form">
            <h3>Add Testimonial</h3>
            <textarea
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleInputChange}
            ></textarea>

            <textarea
              type="text"
                name="comment"
                placeholder="Comment"
                value={formData.comment}
                onChange={handleInputChange}
            ></textarea>


<textarea
              type="text"
                name="personName"
                placeholder="personName"
                value={formData.personName}
                onChange={handleInputChange}
            ></textarea>

            <input
                type="file"
                name="image"
                placeholder="Upload Image"
                onChange={handleInputChange}
            />

            <button type="button" onClick={handleSave}>
                Save
            </button>
            <button type="button" onClick={() => navigate("/admin/testimonial")}>
                Cancel
            </button>
        </div>
    );
};

export default AddTestimonial;
