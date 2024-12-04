import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTeamById, updateTeam } from "../../api/TeamApi";
import "./../../styles/EditClient.css";

const EditTeam = () => {
    const { id } = useParams(); // Extract Team ID from URL
    console.log("-->Editing tEAM with ID:", id); // Debugging

    const navigate = useNavigate();
    const [about, setAbout] = useState(null); // State for Team data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch Team data when component mounts
    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await getTeamById(id); // API call to get aboTeamut by ID

                console.log("editTeamAPI:", response);
                
                setAbout(response.ourTeam ); // Adjust response structure
            } catch (err) {
                console.error("Error fetching About us:", err);
                setError("Failed to fetch Team data");
            } finally {
                setLoading(false); // Stop loading spinner
            }
        };

        fetchTeam();
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

        formData.append("position", about.position);
        formData.append("name", about.name);
        formData.append("facebook", about.facebook);
        formData.append("linkedin", about.linkedin);
        formData.append("twitter", about.twitter);


        if (about.image instanceof File) {
            formData.append("image", about.image); // Append file only if updated
        }

        try {
            await updateTeam(id, formData); // Call API to update Team
            alert("Team updated successfully");
            navigate("/admin/team"); // Redirect to Team list
        } catch (error) {
            console.error("Error updating Team:", error);
            alert("Failed to update Team");
        }
    };

    if (loading) return <p>Loading Team data...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="edit-service-page"> {/* Use same class as EditService */}
            <h1>Edit Team</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Position</label>
                    <textarea
                        name="description"
                        value={about?.position || ""}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <textarea
                        name="name"
                        value={about?.name || ""}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                



                <div className="form-group">
                    <label>Facebook</label>
                    <textarea
                        name="facebook"
                        value={about?.facebook || ""}
                        onChange={handleInputChange}
                    ></textarea>
                </div>


                <div className="form-group">
                    <label>LinkedIn</label>
                    <textarea
                        name="linkedin"
                        value={about?.linkedin || ""}
                        onChange={handleInputChange}
                    ></textarea>
                </div>


                <div className="form-group">
                    <label>Twitter</label>
                    <textarea
                        name="twitter"
                        value={about?.twitter || ""}
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

export default EditTeam;
