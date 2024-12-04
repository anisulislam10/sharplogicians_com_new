import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-dom
import Table from "../../components/TeamTable/Table";
import { fetchTeam } from "../../api/TeamApi";
import Pagination from "../../components/Pagination"; // Import Pagination component
import './../../styles/ServicesPage.css';

const Team = () => {
    const [about, setAbout] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(1);   // Track total pages
    const servicesPerPage = 5; // Number of services to display per page
    const navigate = useNavigate();  // Use the navigate function

    useEffect(() => {
        const getTeam = async () => {
            try {
                const response = await fetchTeam(currentPage, servicesPerPage);
                console.log("ourteamdata",response);
                
                setAbout(response.data.ourTeam); // Set the data from the API response
                setTotalPages(Math.ceil(response.data.total / servicesPerPage)); // Calculate total pages
            } catch (error) {
                console.error("Error fetching Team page:", error);
            } finally {
                setLoading(false);
            }
        };

        getTeam();
    }, [currentPage]); // Trigger the fetch when currentPage changes

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="menu-content">
            <button className="add-btn" onClick={() => navigate("/admin/team/add-team")}>Add Team </button>
            {loading ? <p>Loading...</p> : <Table data={about} setData={setAbout} type="team" />}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Team;
