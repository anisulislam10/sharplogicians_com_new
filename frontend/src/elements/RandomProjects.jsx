import React, { useState, useEffect } from "react";

// Utility function to shuffle the array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 2));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
};

const PortfolioRelatedWork = () => {
  const [projects, setProjects] = useState([]);
  const [randomProjects, setRandomProjects] = useState([]); // To hold two random projects

  useEffect(() => {
    // Fetching data from the API
    const fetchProjects = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL_GETT_PORTFOLIOO); // Replace with your API endpoint
        const data = await response.json();

        console.log("Data from API:", data); // Debugging: Check the structure of data

        if (data.portfolio && data.portfolio.length > 0) {
          setProjects(data.portfolio); // Set the fetched data into state

          // Shuffle the array and pick two random projects
          shuffleArray(data.portfolio); // Shuffle the projects
          const selectedProjects = data.portfolio.slice(0, 2); // Get first two projects after shuffle
          setRandomProjects(selectedProjects); // Set two random projects
        } else {
          console.error("No portfolio data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProjects();
  }, []); // Empty dependency ensures this only runs on mount

  return (
    <div className="portfolio-related-work pb--120 bg_color--1">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center">
              
            </div>
          </div>
        </div>
        <div className="row mt--10" style={{ display: "flex", gap: "80px", width:'900px'}}>
          {randomProjects.length > 0 ? (
            randomProjects.map((project, index) => (
              <div key={index} className="thumb mb--30" style={{ flex: "1", maxWidth: "100%" }}>
                {project.image ? (
                  <img src={project.image} alt={`Portfolio Image ${index + 1}`} style={{ width: "100%", height: "auto" }} />
                ) : (
                  <p>No Image Available</p>
                )}
              </div>
            ))
          ) : (
            <p>No random projects available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioRelatedWork;
