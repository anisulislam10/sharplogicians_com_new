import React, { Component, useEffect, useState } from "react";
import ContactForm from "./ContactForm";

import about from "../../assets/images/about/about-6.jpg";
import axios from "axios";

const ContactTwo =()=> {
const [Value, setValue] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL_CONTACT}/get`);
        console.log("get from contact:", response.data.contact);
        setValue(response.data.contact)
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };

    fetchData();
  }, []);
  
 
    return (
      <div className="contact-form--1">
        <div className="container">
          <div className="row row--35 align-items-start">
            <div className="col-lg-6 order-2 order-lg-1">
              <div className="section-title text-left mb--50">
                <h2 className="title">Contact Us.</h2>
                <p className="description" style={{textAlign:'left'}}> 
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Architecto cupiditate aperiam neque.
                </p>
              </div>
              <div className="form-wrapper">
                <ContactForm />
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2">
              <div className="thumbnail mb_md--30 mb_sm--30">

{
  Value && Value?(
    

  <img src={Value[0].image} alt="trydo" />

  ):(
    <p>No Image Available</p>
  )
}

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default ContactTwo;
