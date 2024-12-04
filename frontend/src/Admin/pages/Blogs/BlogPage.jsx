import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-dom
import Table from "../../components/blogs_table/Table";
import { fetchBlog } from "../../api/BlogApi";
import Pagination from "../../components/Pagination"; // Import Pagination component
import './../../styles/ServicesPage.css';

const Blog = () => {
    const [about, setAbout] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(1);   // Track total pages
    const servicesPerPage = 5; // Number of services to display per page
    const navigate = useNavigate();  // Use the navigate function

    useEffect(() => {
        const getBlog = async () => {
            try {
                const response = await fetchBlog(currentPage, servicesPerPage);
                console.log("Blog Posts",response.data);
                
                setAbout(response.data); // Set the data from the API response
                setTotalPages(Math.ceil(response.data.total / servicesPerPage)); // Calculate total pages
            } catch (error) {
                console.error("Error fetching Blog page:", error);
            } finally {
                setLoading(false);
            }
        };

        getBlog();
    }, [currentPage]); // Trigger the fetch when currentPage changes

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="menu-content">
            <button className="add-btn" onClick={() => navigate("/admin/blog/add-blog")}>Add Blog </button>
            {loading ? <p>Loading...</p> : <Table data={about} setData={setAbout} type="blog" />}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Blog;
