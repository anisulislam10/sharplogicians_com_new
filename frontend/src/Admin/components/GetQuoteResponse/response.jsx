import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteQuote } from "../../api/QuoteRespAPI";  
import "./../../styles/Table.css";

const Table = ({ data = [], type, setData }) => {
    const navigate = useNavigate();

    const handleView = (id) => {
        console.log("Navigating to view page with ID:", id);
        navigate(`/admin/quote/view-quote/${id}`); // Navigate to the view page
    };

    const handleDelete = async (id) => {
        try {
            const result = await deleteQuote(id);
            if (result.status) {
                setData((prevData) => prevData.filter((item) => item._id !== id));
                alert("Quote deleted successfully");
            navigate("/admin/quote-res")

            } else {
                alert(result.message || "Error deleting Quote");
            }
        } catch (error) {
            console.error("Error deleting Quote:", error);
            alert("Error deleting Quote: " + error.message);
        }
    };

    if (!Array.isArray(data)) {
        console.error("Invalid data passed to Table component:", data);
        return <p>Invalid Quote provided.</p>;
    }

    const renderTableHeader = () => {
        if (type === "quotee") {
            return (
                <>
                    <th key="servicesRequired">Service Required</th>
                    <th key="firstName">firstName</th>
                    <th key="email">Email</th>
                    <th key="budget">Budget</th>
                    <th key="readyToStart">Ready to Start</th>
                    <th key="actions">Actions</th>
                </>
            );
        }
    };

    const renderTableData = () => {
        console.log("Data in quote service: ", data);
        if (data && data.length > 0) {
            return data.map((item) => (
                <tr key={item._id}>
                    {type === "quotee" && (
                        <>
                            <td key={`servicesRequired-${item._id}`}>{item.servicesRequired}</td>
                            <td key={`firstName-${item._id}`}>{item.firstName}</td>


                            
                            <td key={`email-${item._id}`}>{item.email}</td>
                            <td key={`projectOverview-${item._id}`}>{item.projectOverview}</td>
                            <td key={`readyToStart-${item._id}`}>{item.readyToStart}</td>
                            <td key={`actions-${item._id}`}>
                                <FaEye
                                    style={{ cursor: "pointer", marginRight: "10px", color: "#007bff" }}
                                    onClick={() => handleView(item._id)}
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
                    <td colSpan="10">No Quote items available</td>
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
