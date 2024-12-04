import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-dom
import Table from "../../components/Testimonials_Table/Table";
import { fetchTestimonial } from "../../api/TestimonialsApi";
import Pagination from "../../components/Pagination"; // Import Pagination component
import './../../styles/ServicesPage.css';

const Testimonial = () => {
    const [about, setAbout] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(1);   // Track total pages
    const servicesPerPage = 5; // Number of services to display per page
    const navigate = useNavigate();  // Use the navigate function

    useEffect(() => {
        const getTestimonial = async () => {
            try {
                const response = await fetchTestimonial(currentPage, servicesPerPage);
                console.log("Testimoninial data",response.data);
                
                setAbout(response.data.testimonial); // Set the data from the API response
                setTotalPages(Math.ceil(response.data.total / servicesPerPage)); // Calculate total pages
            } catch (error) {
                console.error("Error fetching testimonial page:", error);
            } finally {
                setLoading(false);
            }
        };

        getTestimonial();
    }, [currentPage]); // Trigger the fetch when currentPage changes

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="menu-content">
<button className="add-btn" onClick={() => navigate("/admin/testimonial/add-testimonial")}>
    Add Testimonial
</button>
            {loading ? <p>Loading...</p> : <Table data={about} setData={setAbout} type="testimonial" />}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Testimonial;
