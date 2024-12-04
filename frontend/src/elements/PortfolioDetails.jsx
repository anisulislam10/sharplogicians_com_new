import React, { Component, useEffect, useState } from "react";
import PageHelmet from "../component/common/Helmet";
import ModalVideo from "react-modal-video";
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from "axios";
import {
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import ScrollToTop from "react-scroll-up";
import { FiChevronUp } from "react-icons/fi";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";

const SocialShare = [
  { Social: <FaFacebookF />, link: "https://www.facebook.com/sharer.php" },
  { Social: <FaLinkedinIn />, link: "https://www.linkedin.com/" },
  { Social: <FaInstagram />, link: "https://www.instagram.com/" },
  { Social: <FaTwitter />, link: "https://twitter.com/" },
];


import RandomRroject from './RandomProjects'

  
  const PortfolioDetails = () => {
    const [data, setData] = useState([]);
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Using useLocation hook to access query parameters
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search');
    console.log('Query Parameter:', query);
  
    // Using useParams hook to access route parameters
    const { id } = useParams();
    console.log('ID_PARAMS::', id);
  
    useEffect(() => {
      // Example of making an API call or other data fetching
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL_GET_PORTFOLIOO}/${id}`)
        .then((response) => {
          console.log('get data from portfolio:', response.data);
          setData(response.data.portfolio);
          setIsLoading(false);
        })
        .catch((error) => {
          // setError(error);
          // setIsLoading(false);
        });
    }, [id]);



    

    
  
    // Handle loading and error states
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error fetching data</div>;
    }

    return (

      
      <React.Fragment>
        <PageHelmet pageTitle="Portfolio Details" />

        <Header
          headertransparent="header--transparent"
          colorblack="color--black"
          logoname="logo.png"
        />

        {/* Start Breadcrump Area */}
        <div
          className="rn-page-title-area pt--120 pb--190 bg_image bg_image--4"
          data-black-overlay="7"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="rn-page-title text-center pt--100">
                  <h2 className="title theme-gradient">
                    {
                      data && data? (
                        <h1>{data.title}</h1>
                      ): (
                        <p>No Portolio Title Available</p>
                      )
                    }
                    
                  </h2>
                  <p>
                    
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Breadcrump Area */}

        {/* Start Portfolio Details */}
        <div className="rn-portfolio-details ptb--120 bg_color--1">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="portfolio-details">
                  <div className="inner">
                   


                    {
                      data && data? (
                        <h4>{data.title}</h4>
                      ): (
                        <p>No Portolio Title Available</p>
                      )
                    }


                    <p className="subtitle">
                   
                    </p>

                    <div className="portfolio-view-list d-flex flex-wrap">
                      <div className="port-view">
                        <span>Branch</span>
                        {
                      data && data? (
                        <h4>{data.branchType} </h4>
                      ): (
                        <h4>No Portolio Title Available</h4>
                      )
                    }

                      </div>

                      <div className="port-view">
                        <span>Project Types</span>

                        {
                      data && data? (
                        <h4>{data.projectType} </h4>
                      ): (
                        <h4></h4>
                      )
                    }

                      </div>

                      <div className="port-view">
                        <span>Program</span>

                        {
                      data && data? (
                        <h4>{data.program} </h4>
                      ): (
                        <h4>No Portolio  Available</h4>
                      )
                    }

                        
                      </div>
                    </div>

                    <div className="portfolio-share-link mt--20 pb--70 pb_sm--40">
                      <ul className="social-share rn-lg-size d-flex justify-content-start liststyle mt--15">
                        {SocialShare.map((val, i) => (
                          <li key={i}>
                            <a href={`${val.link}`}>{val.Social}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="portfolio-thumb-inner">
                    <div className="thumb position-relative mb--30">

                    <div className="thumb position-relative mb--30">
                    <div
                     />
        </div>
        <div
  dangerouslySetInnerHTML={{ __html: data.content }} // Render HTML content
  style={{
    
    
  }}
/>





{/* Video Section */}
{
  data && data.video ? (
    <div className="video-container">
      <h4>Project Video</h4>
      <video controls width="100%">
        <source src={data.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  ) : (
    <p></p>
  )
}
                      {/* <ModalVideo
                        channel="youtube"
                        isOpen={this.state.isOpen}
                        videoId="ZOoVOfieAF8"
                        onClose={() => this.setState({ isOpen: false })}
                      /> */}
                      {/* <button
                        className="video-popup position-top-center"
                        // onClick={this.openModal}
                      >
                        <span className="play-icon"></span>
                      </button> */}
                    </div>

                    <div className="thumb mb--30">
                      {/* {
                        data && data?(
                          <img src={data.image} alt="Portfolioooo Images" />

                        ):(
                          <p>No Image Available</p>
                        )
                      } */}
                    </div>

                    <div className="thumb">
                      {/* <img src={portfolio1} alt="Portfolio Images" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Portfolio Details */}

        {/* Start Related Work */}
        <div className="portfolio-related-work pb--120 bg_color--1">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <span className="theme-color font--18 fontWeight600">
                    Related Work
                  </span>
                  <h2>Our More Projects</h2>
                </div>
              </div>
            </div>
            <div className="row mt--10">
              {/* Start Single Portfolio */}
              <div className="col-lg-6 col-md-6 col-12">
                <div className="related-work text-center mt--30">
                  <div >
                  <Link to={`/portfolio-details/${id}`}>
                  {/* {
                        data && data?(
                          <img src={data.image} alt="Portfolioooo Images" />

                        ):(
                          <p>No Image Available</p>
                        )


                      } */}


                      <RandomRroject/>
                    </Link>
                  </div>
                  {/* <div className="inner">
                    <h4>
                      <Link to={`/portfolio-details/${data._id}`}>
                      {
                      data && data? (
                        <h4>{data.title} </h4>
                      ): (
                        <h4>No Portolio  Available</h4>
                      )
                    }
                      </Link>
                    </h4>
                  </div> */}
                </div>
              </div>
              {/* End Single Portfolio */}
              
              {/* End Single Portfolio */}
            </div>
          </div>
        </div>


        <div>
          {/* <RandomRroject/> */}
        </div>
        {/* End Related Work */}

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
  }

export default PortfolioDetails;
