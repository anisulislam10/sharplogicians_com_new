import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getContactById, updateContact } from "../../api/ContactUs_Api";
import './../../styles/EditClient.css'

const EditContact = () => {
    const { id } = useParams(); // Extract client ID from the URL
    const navigate = useNavigate();
    const [contact, setContact] = useState(null); // State for client data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch client data when component mounts
    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await getContactById(id); // API call to get client by ID
                setContact(response.contact); // Update state with fetched data
            } catch (err) {
                console.error("Error fetching Contact:", err);
                setError("Failed to fetch Contact data");
            } finally {
                setLoading(false); // Stop loading spinner
            }
        };

        fetchContact();
    }, [id]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContact((prevClient) => ({
            ...prevClient,
            [name]: value,
        }));
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setContact((prevClient) => ({
            ...prevClient,
            image: file,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();

        formData.append("phoneNo", contact.phoneNo);
        formData.append("location", contact.location);
        formData.append("email", contact.email);
        if (contact.image instanceof File) {
            formData.append("image", contact.image); // Append file only if updated
        }

        try {
            await updateContact(id, formData); // Call API to update client
            alert("contact updated successfully");
            navigate("/admin/contact"); // Redirect to client list
        } catch (error) {
            console.error("Error updating contact:", error);
            alert("Failed to update contact");
        }
    };

    if (loading) return <p>Loading contact data...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="edit-service-page"> {/* Use same class as EditService */}
            <h1>Edit Contact</h1>
            <form onSubmit={handleSubmit}>
                

                <div className="form-group">
                    <label>Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                    /> {contact.image && !(contact.image instanceof File) && (
                        <p>Current Image: {contact.image}</p>
                    )}




                    <label>phone No</label>
                    <input
                        type="number"
                        name="phoneNo"
                        value={contact?.phoneNo || ""}

                        onChange={handleInputChange}
                    />

<label>location</label>
                    <input
                        type="text"
                        name="location"
                        value={contact?.location || ""}

                        onChange={handleInputChange}
                    />

<label>email</label>
                    <input
                        type="text"
                        name="email"
                        value={contact?.email || ""}

                        onChange={handleInputChange}
                    />


                   
                </div>

                

                <button type="submit" className="btn-primary">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditContact;
