import React, { Component, Fragment } from "react";
import axios from 'axios';

import Slider from "react-slick";
import { Link } from "react-router-dom";
import { slickDot } from "../page-demo/script";

import ScrollToTop from "react-scroll-up";
import { FiChevronUp, FiX, FiMenu } from "react-icons/fi";
import ServiceList from "../elements/service/ServiceList";
import CounterOne from "../elements/counters/CounterOne";
import Testimonial from "../elements/Testimonial";
import Team from "../elements/Team";
import BlogContent from "../elements/blog/BlogContent";
import BrandTwo from "../elements/BrandTwo";
import FooterTwo from "../component/footer/FooterTwo";
import Contact from "../elements/contact/ContactTwo";
import Helmet from "../component/common/Helmet";

import logoLight from "../assets/images/logo/logo-white.png";
import logoAllDark from "../assets/images/logo/logo-dark.png";
import aboutImg from "../assets/images/about/about-3.jpg";
import ScrollSpy from "../component/common/ScrollSpy";
import AboutUs from "./AboutUs";
import QuoteForm from "../component/header/QuoteForm";

const SlideList = [
  {
    textPosition: "text-center",
    category: "",
    title: "Welcome to Sharplogicians! ",
    description:
      "Improve performance through design, development, & digital marketing.",
    buttonText: "Contact Us",
    buttonLink: "/#contact",
  },
];



class CreativeLanding extends Component {
  constructor(props) {
    super(props);
    this.menuTrigger = this.menuTrigger.bind(this);
    this.CLoseMenuTrigger = this.CLoseMenuTrigger.bind(this);
    this.stickyHeader = this.stickyHeader.bind(this);

    //state for dyamic items for portfolio
    this.state = {
      data:[],
      blogs:[],
      isLoading: true,
      error: null,
      isBlogLoading:true,
      blogError:null
    };

   
  


    //  this.subMetuTrigger = this.subMetuTrigger.bind(this);
    window.addEventListener("load", function () {
      console.log("All assets are loaded");
    });
  }
  menuTrigger() {
    document.querySelector(".header-wrapper")?.classList.toggle("menu-open");
  }
  CLoseMenuTrigger() {
    document.querySelector(".header-wrapper")?.classList.remove("menu-open");
  }
  stickyHeader() {}

  
    // Custom method for fetching data
    componentDidMount() {
      // Existing portfolio method remains unchanged
      axios.get(import.meta.env.VITE_API_API_GET_PORTFOLIO)
        .then(response => {
          console.log("bloggggsssss",response);

          this.setState({ data: response.data, isLoading: false });
        })
        .catch(error => {
          this.setState({ data: [], error, isLoading: false });
        });
        axios.get(import.meta.env.VITE_API_BASE_URL_GET_BLOG)
        .then(response => {
          console.log("bloggggsssss",response);
          
          this.setState({ blogs:  response.data.blog, isBlogLoading: false });
        })
        .catch(error => {
          this.setState({ blogs: [], blogError: error, isBlogLoading: false });
        });
      // Call the method to fetch blog data
    }
    
    // New method to fetch blog data
    



  render() {


//for dynamic items for portfolio
    const { data,blogs, isLoading, error } = this.state;

    // if (error) {
    //   return <div>Error: {error.message}</div>;
    // }

    // if (isLoading) {
    //   return <div>Loading...</div>;
    // }

    const PostList = BlogContent.slice(0, 5);

    window.addEventListener("scroll", function () {
      var value = window.scrollY;
      if (value > 100) {
        document.querySelector(".header--fixed")?.classList.add("sticky");
      } else {
        document.querySelector(".header--fixed")?.classList.remove("sticky");
      }
    });

    var elements = document.querySelectorAll(".has-droupdown > a");
    for (var i in elements) {
      if (elements.hasOwnProperty(i)) {
        elements[i].onclick = function () {
          this.parentElement
            .querySelector(".submenu")
            ?.classList.toggle("active");
          this?.classList.toggle("open");
        };
      }
    }

    return (
      <Fragment>
        <Helmet pageTitle="Sharplogicians | Creative Digital" />
        {/* Start Header Area  */}
        <header className="header-area formobile-menu header--fixed default-color">
          <div className="header-wrapper" id="header-wrapper">
            <div className="header-left">
              <div className="logo">
                <a href="/">
                  <img className="logo-1" src={logoLight} alt="Logo Images" />
                  <img className="logo-2" src={logoAllDark} alt="Logo Images" />
                </a>
              </div>
            </div>
            <div className="header-right">
              <nav className="mainmenunav d-lg-block">
                <ul className="mainmenu">
                  <ScrollSpy
                    sectionIds={[
                      "#home",
                      "#service",
                      "#about",
                      "#portfolio",
                      "#team",
                      "#testimonial",
                      "#blog",
                      "#contact",

                    ]}
                  />
                </ul>
              </nav>
              <div className="header-btn">
                <a
                  className="rn-btn"
                  href="/quote"
                 
                > 
                  <span>Get a quote</span>
                </a>
              </div>
              {/* Start Humberger Menu  */}
              <div className="humberger-menu d-block d-lg-none pl--20">
                <span
                  onClick={this.menuTrigger}
                  className="menutrigger text-white"
                >
                  <FiMenu />
                </span>
              </div>
              {/* End Humberger Menu  */}
              <div className="close-menu d-block d-lg-none">
                <span onClick={this.CLoseMenuTrigger} className="closeTrigger">
                  <FiX />
                </span>
              </div>
            </div>
          </div>
        </header>
        {/* End Header Area  */}

        {/* Start Slider Area   */}
        <div className="slider-activation slider-creative-agency" id="home">
          <div className="bg_image bg_image--26" data-black-overlay="6">
            {SlideList.map((value, index) => (
              <div
                className="slide slide-style-2 slider-paralax d-flex align-items-center justify-content-center"
                key={index}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className={`inner ${value.textPosition}`}>
                        {value.category ? <span>{value.category}</span> : ""}
                        {value.title ? (
                          <h1 className="title theme-gradient">
                            {value.title}
                          </h1>
                        ) : (
                          ""
                        )}
                        {value.description ? (
                          <p className="description">{value.description}</p>
                        ) : (
                          ""
                        )}
                        {value.buttonText ? (
                          <div className="slide-btn">
                            <a
                              className="rn-button-style--2 btn-primary-color"
                              href={`${value.buttonLink}`}
                            >
                              {value.buttonText}
                            </a>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* End Slider Area   */}

        {/* Start Service Area  */}
        <div
          className="service-area creative-service-wrapper ptb--120 bg_color--1"
          id="service"
        >
          <div className="container">
            <div className="row creative-service">
              <div className="col-lg-12">
                <ServiceList
                  item="6"
                  column="col-lg-4 col-md-6 col-sm-6 col-12 text-left"
                />
              </div>
            </div>
          </div>
        </div>
        {/* End Service Area  */}

        {/* Start About Area */}
        


        {/* Start About Area */}
       <>
       <AboutUs/>
       </>
        {/* End About Area */}

        {/* Start Portfolio Area */}
        <div
          className="portfolio-area pt--120 pb--140 bg_color--1"
          id="portfolio"
        >
          <div className="rn-slick-dot">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="section-title service-style--3 text-left mb--15 mb_sm--0">
                    <h2 className="title">Our Portfolio</h2>
                    <p style={{textAlign:'left'}}>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration.
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="slick-space-gutter--15 slickdot--20">
                  {data && data.portfolio?.length > 0 ? (
  <Slider {...slickDot}>
    {data.portfolio.map((item, index) => (
      <div className="portfolio" key={index}>
        <div className="thumbnail-inner">
          <div >
            <img className="thumbnaiss" src={item.image} alt={item.title} style={{height:'580px'}}/>
          </div>
        </div>
        <div className="content">
          <div className="inner">
            <p style={{ textAlign: "left" }}>{item.type}</p>
            <h4>
              <Link to={`portfolio-details/${item._id}`}>{item.title}</Link>
            </h4>
            <div className="portfolio-button">
                                <Link className="rn-btn" to={`/portfolio-details/${item._id}`}>
                                  Case Study
                                </Link>
                              </div>
          </div>
        </div>
                              <Link className="link-overlay"
                            
                            to={`/portfolio-details/${item._id}`}>
                            </Link>
                        </div>
      
    ))}
  </Slider>
) : (
  <div>No portfolio items available</div>
)}

                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Portfolio Area */}

        {/* Start CounterUp Area */}
        <div className="rn-counterup-area pt--140 p pb--110 bg_color--5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <h3 className="fontWeight500">Our Fun Facts</h3>
                </div>
              </div>
            </div>
            <CounterOne />
          </div>
        </div>
        {/* End CounterUp Area */}

        {/* Start Team Area  */}
        <div className="rn-team-area ptb--120 bg_color--1" id="team">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="section-title service-style--3 text-left mb--25 mb_sm--0">
                  <h2 className="title">Skilled Team</h2>
                  <p style={{textAlign:'left'}}>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <Team column="col-lg-4 col-md-6 col-sm-6 col-12" />
            </div>
          </div>
        </div>
        {/* End Team Area  */}

        {/* Start Testimonial Area */}
        <div
          className="rn-testimonial-area bg_color--5 ptb--120"
          id="testimonial"
        >
          <div className="container">
            <Testimonial />
          </div>
        </div>
        {/* End Testimonial Area */}

       {/* Start Blog Area */}
<div className="rn-blog-area pt--120 pb--140 bg_color--1" id="blog">
  <div className="container">
    <div className="row align-items-end">
      <div className="col-lg-6">
        <div className="section-title text-left">
          <h2>Latest News</h2>
          <p style={{textAlign:'left'}}>
            There are many variations of passages of Lorem Ipsum
            available, but the majority have suffered alteration.
          </p>
        </div>
      </div>
    </div>
    <div className="row mt--55 mt_sm--30 rn-slick-dot slick-space-gutter--15 slickdot--20 row--0">
      <div className="col-lg-12">
      {Array.isArray(blogs) && blogs.length > 0 ? (
  <Slider {...slickDot}>
    {blogs.map((item, index) => (
      <div key={index}>
        <div className="blog blog-style--1">
          <div className="thumbnail">
            <Link to={`/blog-details/${item._id}`}>
              <img src={item.image} alt="Blog Images" />
            </Link>
          </div>
          <div className="content">
            <p className="blogtype" style={{textAlign:'left'}}>{item.author}</p>
            <h4 className="title">
              <Link to={`/blog-details/${item._id}`}>{item.title}</Link>
            </h4>
            <div className="blog-btn">
              <Link to={`/blog-details/${item._id}`} className="rn-btn text-white">
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </Slider>
) : (
  <div>No blogs items available</div>
)}

      </div>
    </div>
  </div>
</div>
{/* End Blog Area */}


        {/* Start Contact Us */}
        <div className="rn-contact-us ptb--120 bg_color--5" id="contact">
          <Contact />
        </div>
        {/* End Contact Us */}






        {/* Start Brand Area */}
        <div className="rn-brand-area bg_color--1 ptb--120">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <BrandTwo />
              </div>
            </div>
          </div>
        </div>
        {/* End Brand Area */}

        {/* Start Footer Style  */}
        <FooterTwo />
        {/* End Footer Style  */}
        {/* Start Back To Top */}
        <div className="backto-top">
          <ScrollToTop showUnder={160}>
            <FiChevronUp />
          </ScrollToTop>
        </div>
        {/* End Back To Top */}
      </Fragment>
    );
  }
}

export default CreativeLanding;
