import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

import PageHelmet from "../component/common/Helmet";
import ModalVideo from "react-modal-video";
import ScrollToTop from "react-scroll-up";
import { FiChevronUp } from "react-icons/fi";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";

const ServiceDetails = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Using useLocation hook to access query parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("search");
  console.log("Query Parameter:", query);

  // Using useParams hook to access route parameters
  const { id } = useParams();
  console.log("ID_PARAMS::", id);

  useEffect(() => {
    // Example of making an API call or other data fetching
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL_SERVICES}/${id}`)
      .then((response) => {
        console.log("get data from services:", response.data);

        setData(response.data.service);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <React.Fragment>
      {/* Start Pagehelmet */}
      <PageHelmet pageTitle="Service Details" />
      {/* End Pagehelmet */}

      <Header
        headertransparent="header--transparent"
        colorblack="color--black"
        logoname="logo.png"
      />

      {/* Start Breadcrump Area */}
      <div
        className="rn-page-title-area pt--120 pb--190 bg_image bg_image--5"
        data-black-overlay="5"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="rn-page-title text-center pt--100">
                {data && data ? (
                  <div>
                    <h2 className="title theme-gradient">{data.title}</h2>
                    <p>{data.shortDescription}</p>
                  </div>
                ) : (
                  <p>No services available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Breadcrumb Area */}

      {/* Start Page Wrapper */}
      <div className="rn-service-details ptb--120 bg_color--1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="service-details-inner">
                <div className="inner">
                  {/* Start Single Area */}
                  <div className="row sercice-details-content pb--80 align-items-center">
                    <div className="col-lg-6 col-12">
                      <div className="thumb">
                        {isLoading ? (
                          <p>Loading...</p>
                        ) : error ? (
                          <p>Error fetching data</p>
                        ) : data && data.image ? (
                          <img
                            className="w-100"
                            src={data.image}
                            alt="Service Image"
                          />
                        ) : (
                          <p>No image available</p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-12">
                      <div className="details mt_md--30 mt_sm--30">
                        {data && data.processOfMetal ? (
                          <div>
                            <h4 className="title">Process of Metal</h4>
                            <ul className="liststyle">
                              <li>{data.processOfMetal}</li>
                            </ul>
                          </div>
                        ) : (
                          <p>No services available.</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* End Single Area */}

                  {/* Start Single Area */}
                  <div className="row service-details-content align-items-center">
                    {/* Content Section */}
                    <div className="col-lg-6 col-12 order-2 order-lg-1">
                      <div className="details mt_md--30 mt_sm--30">
                      {data && data.content ? (
  <div
    style={{

      textAlign: 'left',
      // margin: '0 auto', // Center align the container
      // width: '1200px', // Occupy full width
      // padding: '20px', // Optional: Add padding for readability
      // boxSizing: 'border-box', // Ensure padding is included in width calculation
      // background:'white',
    }}
    dangerouslySetInnerHTML={{
      __html: data.content.replace(
      ), // This will float the images to the left and add a margin to the right.
    }}
  />
) : (
  <p>No content available.</p>
)}
 </div>
                        {data && data.ourWorkingProcess ? (
                          <div>
                            <h3  style={{paddingLeft:'110px', paddingTop:'200px',}}>Our Working Process</h3>
                            <ul className="">
                              <li style={{paddingLeft:'110px'}}>{data.ourWorkingProcess}</li>
                            </ul>
                          </div>
                        ) : (
                          <p >No working process available.</p>
                        )}
                      </div>
                    </div>

                    {/* Image Section */}
                    <div className="col-lg-6 col-12 order-1 order-lg-2">
                      <div className="thumb position-relative">
                        {/* {data && data.image ? (
                          <img style={{marginLeft:'700px',}}
                            className="w-100"
                            src={data.image}
                            alt="Service Image"
                          />
                        ) : (
                          <p>No image available</p>
                        )} */}
                      </div>
                    </div>
                 
                  {/* End Single Area */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Page Wrapper */}

      {/* Start Back To Top */}
      <div className="backto-top">
        <ScrollToTop showUnder={160}>
          <FiChevronUp />
        </ScrollToTop>
      </div>
      {/* End Back To Top */}

      <Footer />
    </React.Fragment>
  );
};

export default ServiceDetails;
