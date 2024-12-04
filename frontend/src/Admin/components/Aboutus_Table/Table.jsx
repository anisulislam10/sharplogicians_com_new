import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteAbout } from "../../api/About_us";  
import "./../../styles/Table.css";

const Table = ({ data = [], type, setData }) => {
    const navigate = useNavigate(); // Navigate function to redirect

    const handleEdit = (id) => {
        console.log("Navigating to edit page with ID:", id); // Debugging

        // Navigate to edit page
        navigate(`/admin/about/edit-about/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            // Call the delete About API
            const result = await deleteAbout(id);
            if (result.status) {
                // Successfully deleted, update the UI
                setData((prevData) => prevData.filter((item) => item._id !== id));  // This is where setData is used
                alert("About deleted successfully");
            } else {
                alert(result.message || "Error deleting About");
            }
        } catch (error) {
            console.error("Error deleting About:", error);
            alert("Error deleting About: " + error.message);
        }
    };
    if (!Array.isArray(data)) {
        console.error("Invalid data passed to Table component:", data);
        return <p>Invalid data provided.</p>;
    }

    const renderTableHeader = () => {
        if (type === "about") {
            return (
                <>
                    
                    <th key="description">description</th>
                    <th key="image">Image</th>
                    <th key="mission">mission</th>
                    <th key="vision">vision</th>
                    <th key="actions">Actions</th>
                </>
            );
        }
    };

    const renderTableData = () => {
        // Log the data here to check if it is passed correctly
        console.log("Data in Table: ", data);
        // Check if data exists and has items
        if (data && data.length > 0) {
            return data.map((item) => (
                <tr key={item._id}>
                    {type === "about" && (
                        <>
                           
                            <td key={`description-${item._id}`}>{item.description}</td>
                            <td key={`image-${item._id}`}><img src={item.image} alt="About" width={100} /></td>
                            <td key={`mission-${item._id}`}>{item.mission}</td>
                            <td key={`vision-${item._id}`}>{item.vision}</td>

                            <td key={`actions-${item._id}`}>
                                <FaEdit
                                    style={{ cursor: "pointer", marginRight: "10px", color: "#28a745" }}
                                    onClick={() => handleEdit(item._id)}
                                />
                                <FaTrash
                                    style={{ cursor: "pointer", color: "#dc3545" }}
                                    onClick={() => handleDelete(item._id)}
                                />
                            </td>
                        </>
                    )}
                </tr>
            ));
        } else {
            return (
                <tr>
                    <td colSpan="4">No About items available</td>
                </tr>
            );
        }
    };

    return (
        <table>
        <thead>
            <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
    </table>
);
};

export default Table;
