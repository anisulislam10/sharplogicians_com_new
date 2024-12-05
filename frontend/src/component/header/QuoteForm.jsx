import React, { useRef, useState, useEffect } from "react";
import "./QuoteForm.css";
import Header from "./Header";
import axios from "axios";
import PageHelmet from "../../component/common/Helmet";
import ScrollToTop from "react-scroll-up";
import Footer from "../../component/footer/Footer";
import { toast, ToastContainer } from 'react-toastify';  // Import toastify
import 'react-toastify/dist/ReactToastify.css';  // Import CSS for toastify

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    areaCode: "",
    phoneNumber: "",
    companyName: "",
    website: "",
    servicesRequired: [],
    projectOverview: "",
    budget: "",
    readyToStart: "",
  });
  const [servicesOptions, setServicesOptions] = useState([]); // State to hold dynamic services
  const formRef = useRef();

  const budgetOptions = ["$10-$99", "$100-$500", "$500+"];
  const startOptions = ["Immediately", "Within a week", "Within a month", "Later"];

  // Fetch services dynamically from the backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_BASE_URL_BUDGED_GET);
        console.log("Fetched Quotes:", response.data.quotes);
        
        setServicesOptions(response.data.quotes); // Assuming the response contains an array of services
      } catch (error) {
        console.error("Error fetching services:", error);
        toast.error("An error occurred while fetching the services.");
      }
    };

    fetchServices();
  }, []); // Empty dependency array to run once on mount

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For the phoneNumber field, allow only numeric input.
    if (name === "phoneNumber") {
      const sanitizedValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      setFormData((prev) => ({ ...prev, phoneNumber: sanitizedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedServices = formData.servicesRequired.map(service => service.trim());
    const updatedFormData = {
        ...formData,
        servicesRequired: selectedServices,  // Ensuring it's an array of strings
      };
    try {
      // Send data to backend using Axios
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL_BUDGED }`,
         updatedFormData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle success
      toast.success("Thanku You for submiting a Quote, We Will contact you soon!");

      // Clear the form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        areaCode: '',
        phoneNumber: '',
        companyName: '',
        website: '',
        servicesRequired:"",
        projectOverview: '',
        budget: '',
        readyToStart: '',
      });

      console.log('Response:', response);
    } catch (error) {
      // Handle error
      console.error('Error submitting form:', error);
      toast.error("An error occurred while submitting your quote.");
    }
  };

  return (
    <React.Fragment>
      <PageHelmet pageTitle="Contact" />
      <Header
        headertransparent="header--transparent"
        colorblack="color--black"
        logoname="logo.png"
      />
      <div className="quote-form-container">
        <form ref={formRef} className="quote-form" onSubmit={handleSubmit}>
          <h2>Get a Quote</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="areaCode">Area Code</label>
              <input
                type="number"
                id="areaCode"
                name="areaCode"
                value={formData.areaCode}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber"><ph>Phone Number</ph></label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Services Required</label>
            <div className="checkbox-group">
              {servicesOptions.length > 0 ? (
                servicesOptions.map((service, index) => (
                  <div key={index} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={`service-${index}`}
                      name="servicesRequired"
                      value={service.QuoteService} 
                      checked={formData.servicesRequired.includes(service.QuoteService)}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        setFormData((prev) => {
                          const selectedServices = checked
                          ? [...prev.servicesRequired, value] 
                          : prev.servicesRequired.filter((item) => item !== value);
                          return { ...prev, servicesRequired: selectedServices };
                        });
                      }}
                    />
                    <label htmlFor={`service-${index}`}>{service.QuoteService}</label>
                  </div>
                ))
              ) : (
                <p>Loading services...</p> 
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="projectOverview">Project Overview</label>
            <textarea
              id="projectOverview"
              name="projectOverview"
              value={formData.projectOverview}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="budget">Budget</label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
            >
              <option value="">Select Budget</option>
              {budgetOptions.map((budget, index) => (
                <option key={index} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="readyToStart">Ready to Start</label>
            <select
              id="readyToStart"
              name="readyToStart"
              value={formData.readyToStart}
              onChange={handleChange}
            >
              <option value="">Select Start Time</option>
              {startOptions.map((start, index) => (
                <option key={index} value={start}>
                  {start}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>

        <ToastContainer
          position="top-right"
          autoClose={3000} // Auto-close after 3 seconds
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{
            width: "600px", // Adjust width here as needed
            height:'900px',
            marginTop:'300px',
            marginRight:'500px',
            whiteSpace: "nowrap", // Prevent wrapping to the next line
          }}
        />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default QuoteForm;
