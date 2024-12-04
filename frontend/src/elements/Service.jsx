import React, { Component } from "react";
import PageHelmet from "../component/common/Helmet";
import Breadcrumb from "../elements/common/Breadcrumb";
import { FiCast , FiLayers , FiUsers , FiMonitor ,FiChevronUp } from "react-icons/fi";
import ScrollToTop from 'react-scroll-up';
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


// const ServiceList = [
//     {
//         icon: <FiCast />,
//         title: 'Business Stratagy',
//         description: 'I throw myself down among the tall grass by the stream as I lie close to the earth.'
//     },
//     {
//         icon: <FiLayers />,
//         title: 'Website Development',
//         description: 'I throw myself down among the tall grass by the stream as I lie close to the earth.'
//     },
//     {
//         icon: <FiUsers />,
//         title: 'Marketing & Reporting',
//         description: 'I throw myself down among the tall grass by the stream as I lie close to the earth.'
//     },
//     {
//         icon: <FiMonitor />,
//         title: 'Mobile App Development',
//         description: 'I throw myself down among the tall grass by the stream as I lie close to the earth.'
//     },
//     {
//         icon: <FiCast />,
//         title: 'Website Development',
//         description: 'I throw myself down among the tall grass by the stream as I lie close to the earth.'
//     },
//     {
//         icon: <FiMonitor />,
//         title: 'Marketing & Reporting',
//         description: 'I throw myself down among the tall grass by the stream as I lie close to the earth.'
//     },
// ]
const Service =({ column, item })=>{
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
    const ServiceContent = servicesData.slice(0, item);

    // render(){
        return(
            <React.Fragment>
                <PageHelmet pageTitle='Service' />
                <Header headertransparent="header--transparent" colorblack="color--black" logoname="logo.png" />

                {/* Start Breadcrump Area */}
                <Breadcrumb title={'Service'}   />
                {/* End Breadcrump Area */}

                {/* Start Service Area */}
                <div className="row"  style={{margin:'100px'}}>
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
    
                {/* End Service Area */}

               

            

                {/* Start Back To Top */}
                <div className="backto-top">
                    <ScrollToTop showUnder={160}>
                        <FiChevronUp />
                    </ScrollToTop>
                </div>
                {/* End Back To Top */}
                
                <Footer />


            </React.Fragment>
        )
    }
// }
export default Service;