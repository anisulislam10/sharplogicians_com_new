import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  
import Table from "../../components/GetQuoteResponse/response";
import { fetchQuote } from "../../api/QuoteRespAPI";
import Pagination from "../../components/Pagination"; 
import './../../styles/ServicesPage.css';

const QuoteResp  = () => {
    const [portfolio, setPortfolio] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1);   
    const portfolioPerPage = 5; 
    const navigate = useNavigate();

    useEffect(() => {
        const getQuote = async () => {
            // console.log("Fetching portfolio data...");
    
            try {
                // setLoading(true); // Set loading to true before the API call
                
                const response = await fetchQuote(currentPage, portfolioPerPage); // Fetch portfolio data with pagination
                
                setPortfolio(response.data.quotes); // Set the portfolio data
                setTotalPages(Math.ceil(response.data.total / portfolioPerPage));  // Set total pages for pagination
                
            } catch (error) {
                console.error("Error fetching quote:", error.message);
                console.log(`Failed to fetch quote data: ${error.message}`);
            } finally {
                setLoading(false); // Set loading to false once the API call is complete
            }
        };
    
        getQuote();
    }, [currentPage]); // Re-fetch data when currentPage changes

    const handlePageChange = (page) => {
        setCurrentPage(page); // Update current page when user changes page
    };

    return (
        <div className="menu-content">
            <button className="add-btn" onClick={() => navigate("/admin/quote/add-quote")}>Add Quote</button>
            {loading ? (
                <p>Loading...</p> // Show loading message while fetching data
            ) : (
                <Table data={portfolio} setData={setPortfolio} type="quotee" />
            )}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange} // Handle page change event
            />
        </div>
    );
};

export default QuoteResp;
