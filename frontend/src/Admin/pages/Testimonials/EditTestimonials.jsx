import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTestimonialById, updateTestimonial } from "../../api/TestimonialsApi";
import "./../../styles/EditClient.css";

const EditTestimonial = () => {
    const { id } = useParams(); // Extract Team ID from URL
    console.log("-->Editing Testimonial with ID:", id); // Debugging

    const navigate = useNavigate();
    const [about, setAbout] = useState(null); // State for Team data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch Team data when component mounts
    useEffect(() => {
        const fetch = async () => {
            try {

                const response = await getTestimonialById(id); // API call to get aboTeamut by ID
                console.log("testimonial data===:",response.testimonial);
                
                setAbout(response.testimonial ); // Adjust response structure
            } catch (err) {
                console.error("Error fetching testimonial :", err);
                setError("Failed to fetch testimonial data");
            } finally {
                setLoading(false); // Stop loading spinner
            }
        };

        fetch();
    }, [id]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAbout((prevTeam) => ({
            ...prevTeam,
            [name]: value,
        }));
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAbout((prevTeam) => ({
            ...prevTeam,
            image: file,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("companyName", about.companyName);
        formData.append("comment", about.comment);
        formData.append("personName", about.personName);

        if (about.image instanceof File) {
            formData.append("image", about.image); // Append file only if updated
        }

        try {
            await updateTestimonial(id, formData); // Call API to update Team
            alert("Testimonial updated successfully");
            navigate("/admin/testimonial"); // Redirect to Team list
        } catch (error) {
            console.error("Error updating Testimonial:", error);
            alert("Failed to update Testimonial");
        }
    };

    if (loading) return <p>Loading Testimonial data...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="edit-service-page"> {/* Use same class as EditService */}
            <h1>Edit Testimonial</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Company Name</label>
                    <textarea
                        name="companyName"
                        value={about?.companyName || ""}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>comment</label>
                    <textarea
                        name="comment"
                        value={about?.comment || ""}
                        onChange={handleInputChange}
                    ></textarea>
                </div>




                <div className="form-group">
                    <label>Person Name</label>
                    <textarea
                        name="personName"
                        value={about?.personName || ""}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                
                <div className="form-group">
                    <label>Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                    />
                    {about?.image && !(about.image instanceof File) && (
                        <p>Current Image: {about.image}</p>
                    )}
                </div>
                <button type="submit" className="btn-primary">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditTestimonial;
