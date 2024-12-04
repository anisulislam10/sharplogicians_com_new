import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuoteById, updateQuote } from "../../api/quote";
import "./../../styles/EditClient.css";


const EditQuote = () => {
    const { id } = useParams(); // Extract Quote ID from URL
    const navigate = useNavigate();

    const [quote, setQuote] = useState({
        QuoteService: "",
    });
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch Quote data when component mounts
    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await getQuoteById(id); // API call to get Quote by ID
                if (response && response.data) {
                    setQuote({
                        QuoteService: response.data.QuoteService || "",
                    });
                }
            } catch (err) {
                console.error("Error fetching Quote:", err);
                setError("Failed to fetch Quote");
            } finally {
                setLoading(false); // Stop loading spinner
            }
        };

        fetchQuote();
    }, [id]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuote((prevQuote) => ({
            ...prevQuote,
            [name]: value,
        }));
    };

    // Handle form submission to update the Quote
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateQuote(id, quote); // Call API to update Quote
            alert("Quote updated successfully");
            navigate("/admin/quote"); // Redirect to Quote list
        } catch (error) {
            console.error("Error updating Quote:", error);
            alert("Failed to update Quote");
        }
    };

    if (loading) return <p>Loading Quote data...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="edit-service-page">
            <h1>Edit Quote Service</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="QuoteService">Quote Service</label>
                    <textarea
                        id="QuoteService"
                        name="QuoteService"
                        value={quote.QuoteService}
                        onChange={handleInputChange}
                        placeholder="Enter the service required"
                    />
                </div>
                <button type="submit" className="btn-primary">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditQuote;
