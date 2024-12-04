import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-dom
import Table from "../../components/Aboutus_Table/Table";
import { fetchAbout } from "../../api/About_us";
import Pagination from "../../components/Pagination"; // Import Pagination component
import './../../styles/ServicesPage.css';

const About = () => {
    const [about, setAbout] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1);   
    const servicesPerPage = 5; 
    const navigate = useNavigate();  

    useEffect(() => {
        const getAbout = async () => {
            try {
                const response = await fetchAbout(currentPage, servicesPerPage);
                console.log("API Response:", response.data.aboutus);
    
                if (response.data && response.data) {
                    setAbout(response.data.aboutus); 
                    setTotalPages(Math.ceil(response.data.total / servicesPerPage)); 
                } else {
                    console.error("aboutus data is missing in the response");
                }
            } catch (error) {
                console.error("Error fetching about page:", error);
            } finally {
                setLoading(false);
            }
        };
    
        getAbout();
    }, [currentPage]); // Trigger the fetch when currentPage changes

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="menu-content">
            <button className="add-btn" onClick={() => navigate("/admin/about/add-about")}>Add About </button>
            {loading ? <p>Loading...</p> : <Table data={about} setData={setAbout} type="about" />}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default About;
