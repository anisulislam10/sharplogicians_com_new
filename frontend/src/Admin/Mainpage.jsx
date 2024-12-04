import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Services from "./pages/ServicesPage";
import AddService from "./pages/AddService";
import AddClient from "./pages/AddClient";
import Topbar from "./components/Topbar";
import { FaServicestack, FaUsers, FaBriefcase, FaTeamspeak, FaComment, FaBlog, FaFileContract } from "react-icons/fa";
import EditServices from "./pages/EditService";
import EditPortfolio from "./pages/EditPortfolio";
import AddPortfolio from "./pages/AddPortfolio";
import Portfolio from "./pages/PortfolioPage";
import Client from "./pages/ClientPage";
import EditClient from "./pages/EditClient";
import SignIn from "./pages/auth/Signin";

import "./App.css";
import { SiAboutdotme } from "react-icons/si";
import { BsFillChatQuoteFill, BsInfoCircle, BsQuote } from "react-icons/bs";
import AddAbout from "./pages/About-us/Add_about_us";
import About from "./pages/About-us/About_Us_Page";
import EditAbout from "./pages/About-us/Edit_About_us";
import Team from "./pages/Add_Team/TeamPage";
import EditTeam from "./pages/Add_Team/EditTeam";
import AddTeam from "./pages/Add_Team/AddTeam";
import Testimonial from "./pages/Testimonials/TestimonialPage";
import EditTestimonial from "./pages/Testimonials/EditTestimonials";
import AddTestimonial from "./pages/Testimonials/AddTestimonials";
import AddContact from "./pages/ContactUs/AddContact";
import Contact from "./pages/ContactUs/ContactPage";
import EditContact from "./pages/ContactUs/EditContact";
import Blog from "./pages/Blogs/BlogPage";
import EditBlog from "./pages/Blogs/EditBlog";
import AddBlog from "./pages/Blogs/AddBlog";
import AddQuote from "./pages/Quote/Add_Quote";
import Quote from "./pages/Quote/QuotePage";
import EditQuote from "./pages/Quote/Edit_Quote";
import QuoteResp from "./pages/QuoteResp/QuoteRespPage";
import ViewQuote from "./pages/QuoteResp/ViewQuote";

const Mainpage = () => {

    const menus = [
    { name: "Services ", path: "/admin/services", icon: <FaServicestack /> },
    { name: "Portfolio ", path: "/admin/portfolio", icon: <FaBriefcase /> },
    { name: "Clients ", path: "/admin/clients", icon: <FaUsers /> },
    { name: "About US ", path: "/admin/about", icon: <BsInfoCircle /> },
    { name: "Team ", path: "/admin/team", icon: <FaTeamspeak /> },
    { name: "Testimonials ", path: "/admin/testimonial", icon: <FaComment /> },
    { name: "Blogs ", path: "/admin/blog", icon: <FaBlog /> },
    { name: "Contact ", path: "/admin/contact", icon: <FaFileContract /> },
    { name: "Quote ", path: "/admin/quote", icon: <BsQuote /> },
    { name: "Quote Response ", path: "/admin/quote-res", icon: <BsFillChatQuoteFill /> },


    ];

    const profile = {
        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        email: "admin",
    };

    return (
        
                <>
                    <Topbar />
                    <div className="app">
                        <Sidebar menus={menus} profile={profile} />
                        <div className="content">
                            <Routes>
                                <Route path="/services" element={<Services />} />
                                <Route path="/portfolio" element={<Portfolio />} />
                                <Route path="/clients" element={<Client />} />
                                <Route path="/about" element={< About/>} />
                                <Route path="/team" element={< Team/>} />
                                <Route path="/testimonial" element={< Testimonial/>} />
                                <Route path="/contact" element={< Contact/>} />
                                <Route path="/blog" element={< Blog/>} />
                                <Route path="/quote" element={< Quote/>} />
                                <Route path="/quote-res" element={< QuoteResp/>} />




                                




                                <Route path="/service/edit-service/:id" element={<EditServices />} />
                                <Route path="/portfolio/edit-portfolio/:id" element={<EditPortfolio />} />
                                <Route path="/client/edit-client/:id" element={<EditClient />} />
                                <Route path="/about/edit-about/:id" element={<EditAbout />} />
                                <Route path="/team/edit-team/:id" element={<EditTeam />} />
                                <Route path="/testimonial/edit-testimonial/:id" element={<EditTestimonial />} />

                                <Route path="/contact/edit-contact/:id" element={<EditContact />} />
                                <Route path="/blog/edit-blog/:id" element={<EditBlog />} />
                                <Route path="/quote/edit-quote/:id" element={<EditQuote />} />
                                <Route path="/quote/view-quote/:id" element={<ViewQuote />} />













                                <Route path="/service/add-service" element={<AddService />} />
                                <Route path="/portfolio/add-portfolio" element={<AddPortfolio />} />
                                <Route path="/client/add-client" element={<AddClient />} />
                                <Route path="/about/add-about" element={<AddAbout />} />
                                <Route path="/team/add-team" element={<AddTeam />} />
                                <Route path="/testimonial/add-testimonial" element={<AddTestimonial />} />
                                <Route path="/contact/add-contact" element={<AddContact />} />
                                <Route path="/quote/add-quote" element={ <AddQuote/>} />
                                <Route path="/blog/add-blog" element={ <AddBlog/>} />


                               







                                {/* <Route path="*" element={<Navigate to="/admin/services" />} /> */}

                                {/* new added */}


                            </Routes>
                        </div>
                    </div>
                </>
           
    );
};

export default Mainpage;
