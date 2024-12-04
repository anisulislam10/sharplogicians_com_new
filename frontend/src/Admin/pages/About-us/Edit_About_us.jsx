import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAboutById, updateAbout } from "../../api/About_us";
import "./../../styles/EditClient.css";

const EditAbout = () => {
    const { id } = useParams(); // Extract about ID from URL
    console.log("-->Editing About with ID:", id); // Debugging

    const navigate = useNavigate();
    const [about, setAbout] = useState(null); // State for about data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch about data when component mounts
    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const response = await getAboutById(id); 
                console.log("sdfasdf", response);
                
                setAbout(response.aboutus); 
            } catch (err) {
                console.error("Error fetching About us:", err);
                setError("Failed to fetch about data");
            } finally {
                setLoading(false); 
            }
        };

        fetchAbout();
    }, [id]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAbout((prevAbout) => ({
            ...prevAbout,
            [name]: value,
        }));
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAbout((prevAbout) => ({
            ...prevAbout,
            image: file,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("description", about.description);
        formData.append("mission", about.mission);
        formData.append("vision", about.vision);
        if (about.image instanceof File) {
            formData.append("image", about.image); // Append file only if updated
        }

        try {
            await updateAbout(id, formData); // Call API to update about
            alert("About page updated successfully");
            navigate("/admin/about"); // Redirect to about list
        } catch (error) {
            console.error("Error updating about:", error);
            alert("Failed to update about");
        }
    };

    if (loading) return <p>Loading about data...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="edit-service-page"> {/* Use same class as EditService */}
            <h1>Edit About</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={about?.description || ""}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Mission</label>
                    <textarea
                        name="mission"
                        value={about?.mission || ""}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Vision</label>
                    <textarea
                        name="vision"
                        value={about?.vision || ""}
                        onChange={handleInputChange}
                        required
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

export default EditAbout;
