import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



/*****************************************
dynamically Show Services on Service Page
*****************************************/
const ServiceThree = ({ column, item }) => {
    const [servicesData, setServicesData] = useState([]);
  
    useEffect(() => {
      const fetchServices = async () => {
        try {
          const response = await axios.get(import.meta.env.VITE_API_API_GET_SERVICES);
          // console.log(response.data.services);
          setServicesData(response.data.services);

        } catch (error) {
          console.error("Error fetching services data:", error);
        }
      };
  
      fetchServices();
    }, []);
  
    // Limit services to the number specified by "item"
    const ServiceContent = servicesData.slice(0, item);
  
    return (
      <div className="row">
      {ServiceContent.map((service, i) => (
        <div className={`col-lg-4 col-md-4 col-sm-4 col-12 ${column}`} key={i}>
          <Link to={`/service-details/${service._id}`}>
            <div className="service service__style--2" style={{ width: '100%', height: 'auto' }}>
              {/* Display the service image */}
              <div className="icon" style={{ marginBottom: '10px', marginLeft:'14px' }}> {/* Adjust margin to reduce space */}
                <img 
                  className="icon" 
                  src={service.image} 
                  alt={service.title} 
                  style={{ width: "50px", height: "50px"   }} 
                />
              </div>
              <div className="content">
                <h3 className="title" style={{ marginBottom: '10px' }}>{service.title}</h3> {/* Adjust margin to reduce space */}
                <p style={{ textAlign: 'left', padding: '10px 0' }}>
                  {service.shortDescription.length > 20
                    ? `${service.shortDescription.slice(0, 83)}` // Added ellipsis for trimmed text
                    : service.shortDescription}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
    
    

    );
  };
  

export default ServiceThree;
