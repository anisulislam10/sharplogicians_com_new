import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteTestimonial } from "../../api/TestimonialsApi";  
import "./../../styles/Table.css";
// import "./../../styles/Testimonial/Table.css"

const  Table= ({ data = [], type, setData }) => {
    const navigate = useNavigate(); // Navigate function to redirect

    const handleEdit = (id) => {
        console.log("Navigating to edit Testimonial with ID:", id); // Debugging

        // Navigate to edit page
        navigate(`/admin/testimonial/edit-testimonial/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            // Call the delete Testimonial API
            const result = await deleteTestimonial(id);
            if (result.status) {
                // Successfully deleted, update the UI
                setData((prevData) => prevData.filter((item) => item._id !== id));  // This is where setData is used
                alert("Testimonial deleted successfully");
            } else {
                alert(result.message || "Error deleting Testimonial");
            }
        } catch (error) {
            console.error("Error deleting Testimonial:", error);
            alert("Error deleting Testimonial: " + error.message);
        }
    };
    if (!Array.isArray(data)) {
        console.error("Invalid data passed to Table component:", data);
        return <p>Invalid Testimonial provided.</p>;
    }

    const renderTableHeader = () => {
        if (type === "testimonial") {
            return (
                <>
                    
                    <th key="companyName">company Name</th>
                    <th key="image">Image</th>
                    <th key="comment">Comment</th>
                    <th key="personName">Person Name</th>

                    <th key="actions">Actions</th>
                </>
            );
        }
    };

    const renderTableData = () => {
        // Log the Testimonial here to check if it is passed correctly
        console.log("testimonial in Table: ", data);
        // Check if Testimonial exists and has items
        if (data && data.length > 0) {
            return data.map((item) => (
                
                <tr key={item._id}>
                    {type === "testimonial" && (
                        <>
                           
                            <td key={`companyName-${item._id}`}>{item.companyName}</td>
                            <td key={`image-${item._id}`}><img src={item.image} alt="testimonial" width={100} /></td>
                            <td key={`comment-${item._id}`}>{item.comment}</td>
                            <td key={`personName-${item._id}`}>{item.personName}</td>


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
                    <td colSpan="4">No testimonial items available</td>
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
