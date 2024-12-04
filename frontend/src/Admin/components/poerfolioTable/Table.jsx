import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deletePortfolio } from "../../api/portfolioApi";  // Import deletePortfolio API call
import "./../../styles/Table.css";

const Table = ({ data = [], type, setData }) => {
    const navigate = useNavigate(); 
    const truncateText = (text, maxLength = 20) => {
        if (!text) return "";
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };
    const handleEdit = (id) => {
        // Navigate to edit page
        navigate(`/admin/portfolio/edit-portfolio/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            const result = await deletePortfolio(id);
            if (result.status) {
                setData((prevData) => prevData.filter((item) => item._id !== id));  // This is where setData is used
                alert("Portfolio deleted successfully");
            } else {
                alert(result.message || "Error deleting Portfolio");
            }
        } catch (error) {
            console.error("Error deleting Portfolio:", error);
            alert("Error deleting Portfolio: " + error.message);
        }
    };
    if (!Array.isArray(data)) {
        console.error("Invalid data passed to Table component:", data);
        return <p>Invalid data provided.</p>;
    }

    const renderTableHeader = () => {
        if (type === "portfolio") {
            return (
                <>
                    <th key="title">Title</th>
                    {/* <th key='content'>content</th> */}

                    {/* <th key="shortDesc">shortDesc</th> */}
                    <th key="type">Type</th>
                    <th key="projectType">Project Type</th>
                    <th key="branchType">branch Type</th>
                    <th key="program">Program</th>
                    <th key="image">Image</th>
                    <th key="actions">Actions</th>
                </>
            );
        }
    };

    const renderTableData = () => {
        // Log the data here to check if it is passed correctly
        // console.log("Data in Table: ", data);
        // Check if data exists and has items
        if (data && data.length > 0) {
            return data.map((item) => (
                <tr key={item._id}>
                    {type === "portfolio" && (
                        <>
                            <td key={`title-${item._id}`}>{truncateText(item.title)}</td>
                            {/* <td key={`shortDesc-${item._id}`}>{truncateText(item.shortDesc)}</td> */}
                            {/* <td key={`content-${item._id}`}>{truncateText(item.content)}</td> */}

                            <td key={`type-${item._id}`}>{item.type}</td>
                            <td key={`projectType-${item._id}`}>{truncateText(item.projectType)}</td>
                            <td key={`branchType-${item._id}`}>{item.branchType}</td>
                            <td key={`program-${item._id}`}>{item.program}</td>
                            <td key={`image-${item._id}`}><img src={item.image} alt="Portfolio" width={100} /></td>
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
                    <td colSpan="4">No portfolio items available</td>
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
