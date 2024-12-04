import React, { useEffect, useState } from "react";
import axios from "axios";
import PageHelmet from "../component/common/Helmet";
import Breadcrumb from "../elements/common/Breadcrumb";
import ScrollToTop from "react-scroll-up";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import { FiChevronUp } from "react-icons/fi";

const AboutUs = () => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL_ABOUT_GET}`
        );
        setValues(response.data.aboutus);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const firstItem = values[0];

  return (
    <React.Fragment>
      <PageHelmet pageTitle="About Us" />
      <Header
        headertransparent="header--transparent"
        colorblack="color--black"
        logoname="logo.png"
      />

      {/* Start Breadcrumb Area */}
      <Breadcrumb title={"About Us"} />
      {/* End Breadcrumb Area */}

      <div className="about-area ptb--120 bg_color--5" id="about">
        <div className="about-wrapper">
          <div className="container">
            <div className="row row--35 align-items-center">
              <div className="col-lg-5">
                <div className="thumbnail">
                  {firstItem ? (
                    <img src={firstItem.image} alt="About Us" />
                  ) : (
                    <p>Loading image...</p>
                  )}
                </div>
              </div>
              <div className="col-lg-7">
                <div className="about-inner inner">
                  <div className="section-title">
                    <h2 className="title">About Us</h2>
                    {firstItem ? (
                      <p  style={{textAlign:'left'}} className="description">{firstItem.description}</p>
                    ) : (
                      <p>Loading description...</p>
                    )}
                  </div>
                  <div className="row mt--30">
                    <div className="col-lg-6">
                      <div className="about-us-list">
                        <h3 className="title">Who we are</h3>
                        {firstItem ? (
                          <p style={{textAlign:'left'}}>{firstItem.mission}</p>
                        ) : (
                          <p>Loading mission...</p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="about-us-list">
                        <h3 className="title">Vision</h3>
                        {firstItem ? (
                          <p style={{textAlign:'left'}}>{firstItem.vision}</p>
                        ) : (
                          <p>Loading vision...</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default AboutUs;
