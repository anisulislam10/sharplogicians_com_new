import React, { Component,useState, useEffect } from "react";
import PageHelmet from "../component/common/Helmet";
import { FiClock, FiUser, FiMessageCircle, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios'
import './../Admin/pages/Blogs/EditorStyle.css'

import ScrollToTop from "react-scroll-up";
import { FiChevronUp } from "react-icons/fi";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";


const BlogDetails =()=> {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Using useLocation hook to access query parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('search');
  console.log('Query Parameter:', query);

  const { id } = useParams();
  console.log("ID_PARAMS::", id);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL_BLOGSS}/${id}`)
      .then(response => {
        console.log("get data from Blogs:",response);
        
        setData(response.data.blog);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, [id]);
    return (
      <React.Fragment>
        <PageHelmet pageTitle="Blog Details" />
        <Header
          headertransparent="header--transparent"
          colorblack="color--black"
          logoname="logo.png"
        />

        {/* Start Breadcrump Area */}
        <div
          className="rn-page-title-area pt--120 pb--190 bg_image bg_image--7"
          data-black-overlay="7"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="blog-single-page-title text-center pt--100">
                  <h2 className="title theme-gradient">

                    {
                    data && data ? (
                    <div>{data.title}</div>
 
                      ):(
                        <p>No Header Available</p>
                      )
                    }
                  </h2>
                  <ul className="blog-meta d-flex justify-content-center align-items-center">
                    <li>
                    <FiClock />
                      {data && data.createdAt ? (
                        <div>
                          {new Date(data.createdAt).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
 
                      ):(
                        <p>No Header Available</p>
                      )
                    }
                    </li>
                    <li>
                      <FiUser />
                      {
                    data && data ? (
                    <div>{data.author}</div>
 
                      ):(
                        <p>No Header Available</p>
                      )
                    }                    </li>
                    <li>
                      <FiMessageCircle />
                      15 Comments
                    </li>
                    <li>
                      <FiHeart />
                      Like
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Breadcrump Area */}

        {/* Start Blog Details */}
        <div className="rn-blog-details pt--110 pb--70 bg_color--1">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="inner-wrapper">
                  <div className="inner">
                    <p>
                    <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: data.content }} // Render HTML content
      />
                    
                    </p>
                    
                   
                    <div className="blog-single-list-wrapper d-flex flex-wrap">
                      <div className="thumbnail">
                        {/* <img className="w-100" src={imgTwo} alt="BLog Images" /> */}


                        
                        <span>
                          
                        </span>
                      </div>
                      <div className="content">
                        <p>
                          
                        </p>
                        
                        
                      </div>
                    </div>

                  
                    
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Blog Details */}

        {/* Start BLog Comment Form  */}
        <div className="blog-comment-form pb--120 bg_color--1">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="inner">
                  <h3 className="title mb--40 fontWeight500">Leave a Reply</h3>
                  <form action="#">
                    <div className="row">
                      <div className="col-lg-6 col-md-12 col-12">
                        <div className="rnform-group">
                          <input type="text" placeholder="Name" />
                        </div>
                        <div className="rnform-group">
                          <input type="email" placeholder="Email" />
                        </div>
                        <div className="rnform-group">
                          <input type="text" placeholder="Website" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-12">
                        <div className="rnform-group">
                          <textarea
                            type="text"
                            placeholder="Comment"
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="blog-btn">
                          {/* <a className="rn-button-style--2 btn-solid" href="#"></a> */}
                          <Link
                            className="rn-button-style--2 btn-solid"
                            to="/blog-details"
                          >
                            <span>SEND MESSAGE</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End BLog Comment Form  */}

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

export default BlogDetails;
