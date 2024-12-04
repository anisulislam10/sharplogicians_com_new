import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  
import Table from "../../components/contact_us_table/Table";
import { fetchContact } from "../../api/ContactUs_Api";
import Pagination from "../../components/Pagination"; 
import './../../styles/ServicesPage.css';

const Contact  = () => {
    const [client, setClient] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1);   
    const clientPerPage = 5; 
    const navigate = useNavigate();

    useEffect(() => {
        const getContact = async () => {
            // console.log("Fetching client data...");
    
            try {
                setLoading(true); // Set loading to true before the API call
                
                const response = await fetchContact(currentPage, clientPerPage); // Fetch client data with pagination
                // console.log(response);
                
                setClient(response.data.contact); // Set the client data
                setTotalPages(Math.ceil(response.data.total / clientPerPage));  // Set total pages for pagination
                
            } catch (error) {
                console.error("Error fetching client:", error.message);
                console.log(`Failed to fetch client data: ${error.message}`);
            } finally {
                setLoading(false); // Set loading to false once the API call is complete
            }
        };
    
        getContact();
    }, [currentPage]); // Re-fetch data when currentPage changes

    const handlePageChange = (page) => {
        setCurrentPage(page); // Update current page when user changes page
    };

    return (
        <div className="menu-content">
            <button className="add-btn" onClick={() => navigate("/admin/contact/add-contact")}>Add Contact</button>
            {loading ? (
                <p>Loading...</p> // Show loading message while fetching data
            ) : (
                <Table data={client} setData={setClient} type="contact" />
            )}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange} // Handle page change event
            />
        </div>
    );
};

export default Contact;
