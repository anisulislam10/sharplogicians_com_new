import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuoteById } from "../../api/QuoteRespAPI"; // Ensure you have this API function
import "./ViewQuote.css" // Optional: Create CSS for styling

const ViewQuote = () => {
    const { id } = useParams(); // Get the quote ID from the URL
    const [quote, setQuote] = useState(null); // State to hold the quote data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const result = await getQuoteById(id); // Fetch quote by ID
                console.log("dataaaaaaa:::",result);
                
                setQuote(result);
            } catch (err) {
                setError(err.message || "Failed to load the quote.");
            } finally {
                setLoading(false);
            }
        };

        fetchQuote();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="view-quote-container">
            <h1>Quote Details</h1>
            <table>
                <tbody>
                  


                    <tr>
                        <th>First Name</th>
                        <td>{quote.firstName}</td>
                    </tr>

                    <tr>
                        <th>Last Name</th>
                        <td>{quote.lastName}</td>
                    </tr>
                    <tr>
                        <th>Area Code</th>
                        <td>{quote.areaCode}</td>
                    </tr>
                    <tr>
                        <th>Phone Number</th>
                        <td>{quote.phoneNumber}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{quote.email}</td>
                    </tr>
                 
                    <tr>
                        <th>Company Name</th>
                        <td>{quote.companyName}</td>
                    </tr>
                    <tr>
                        <th>Website</th>
                        <td>{quote.website}</td>
                    </tr>
                    <tr>
                        <th>Service Required</th>
                        <td>{quote.servicesRequired}</td>
                    </tr>
                    <tr>
                        <th>Project Overview</th>
                        <td>{quote.projectOverview}</td>
                    </tr>
                    <tr>
                        <th>Budget</th>
                        <td>{quote.budget}</td>
                    </tr>
                    <tr>
                        <th>Ready to Start</th>
                        <td>{quote.readyToStart}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ViewQuote;
