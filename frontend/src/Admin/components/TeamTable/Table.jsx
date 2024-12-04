import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteTeam } from "../../api/TeamApi";  
import "./../../styles/Table.css";

const Table = ({ data = [], type, setData }) => {
    const navigate = useNavigate(); // Navigate function to redirect

    const handleEdit = (id) => {
        console.log("Navigating to edit page with ID:", id); // Debugging

        // Navigate to edit page
        navigate(`/admin/team/edit-team/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            // Call the delete About API
            const result = await deleteTeam(id);
            if (result.status) {
                // Successfully deleted, update the UI
                setData((prevData) => prevData.filter((item) => item._id !== id));  // This is where setData is used
                alert("Team deleted successfully");
            } else {
                alert(result.message || "Error deleting Team");
            }
        } catch (error) {
            console.error("Error deleting Team:", error);
            alert("Error deleting Team: " + error.message);
        }
    };
    if (!Array.isArray(data)) {
        console.error("Invalid data passed to Table component:", data);
        return <p>Invalid Team provided.</p>;
    }

    const renderTableHeader = () => {
        if (type === "team") {
            return (
                <>
                    
                    <th key="image">Image</th>
                    <th key="position">position</th>
                    <th key="name">name</th>
                    <th key="facebook">Facebook</th>
                    <th key="linkedin">LinkedIn</th>
                    <th key="twotter">Twitter</th>

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
                    {type === "team" && (
                        <>
                           
                            <td key={`image-${item._id}`}><img src={item.image} alt="position" width={100} /></td>
                            <td key={`position-${item._id}`}>{item.position}</td>
                            <td key={`name-${item._id}`}>{item.name}</td>
                            <td key={`facebook-${item._id}`}>{item.facebook}</td>
                            <td key={`linkedin-${item._id}`}>{item.linkedin}</td>
                            <td key={`twitter-${item._id}`}>{item.twitter}</td>


                            

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
