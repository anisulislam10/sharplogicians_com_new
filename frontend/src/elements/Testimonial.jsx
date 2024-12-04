// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // import "./../home/testimonial.css";

// const Testimonial = () => {
//   const [testimonials, setTestimonials] = useState([]);

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/admin/testimonial/get"
//         );
//         setTestimonials(response.data.testimonial);
//       } catch (error) {
//         console.error("Error fetching testimonials:", error);
//       }
//     };
//     fetchTestimonials();
//   }, []);

//   return (
//     <div className="testimonial-container">
//       <h2 className="testimonial-heading">What Our Clients Says</h2>
//       <div className="testimonial-slider">
//         {testimonials.map((item, index) => (
//           <div className="testimonial-card" key={index}>
//             <div className="testimonial-logo">
//               <img src={item.image} alt={item.companyName} />
//             </div>
//             <h3 className="company-name">{item.companyName}</h3>
//             <p className="testimonial-comment">"{item.comment}"</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Testimonial;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import './../assets/scss/elements/_testimonial'
// import "./../index.scss";  
import './../assets/scss/elements/_testimonial.scss'

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]); // Array to store testimonials
  const [selectedTestimonialId, setSelectedTestimonialId] = useState(null); // ID of the selected testimonial
  const [selectedTestimonial, setSelectedTestimonial] = useState(null); // Selected testimonial details
  const [error, setError] = useState(null);

  // Fetch all testimonials initially
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL_TESTIMONIAL_GET}`
        );
        setTestimonials(response.data.testimonial); // Assuming `testimonial` contains an array
        if (response.data.testimonial.length > 0) {
          setSelectedTestimonialId(response.data.testimonial[0]._id); // Set first testimonial ID by default
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Unable to fetch testimonials.");
      }
    };

    fetchTestimonials();
  }, []);

  // Fetch selected testimonial by ID
  useEffect(() => {
    const fetchTestimonialById = async () => {
      if (!selectedTestimonialId) return;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL_TESTIMONIAL}/${selectedTestimonialId}`
        );
        setSelectedTestimonial(response.data.testimonial); // Assuming `testimonial` is returned
      } catch (err) {
        console.error("Error fetching testimonial by ID:", err);
        setError("Unable to fetch selected testimonial.");
      }
    };

    fetchTestimonialById();
  }, [selectedTestimonialId]);

  // Handle image click to set selected testimonial ID
  const handleImageClick = (id) => {
    setSelectedTestimonialId(id);
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-12">
          <Tabs>


             {/* Testimonial Details */}
             {testimonials.map((testimonial) => (
              <TabPanel key={testimonial._id}>
                {selectedTestimonial &&
                selectedTestimonialId === testimonial._id ? ( // Match by ID
                  <div className="rn-testimonial-content text-center">
                    <div className="inner">
                      <p>
                        {selectedTestimonial.comment ||
                          "No comment available for this testimonial."}
                      </p>
                    </div>
                    <div className="author-info">
                    
                   
                    {/* <h6 style={{fontWeight:'lighter', fontSize:'19px',textTransform: 'uppercase'
 }}>
                      </h6 > */}
                      
                      <h6 >
                      { <span>{selectedTestimonial.personName}</span>  }{" - "}

                        {selectedTestimonial.companyName }{" "}
                      </h6>
                    </div>
                  </div>
                ) : (
                  <p></p>
                )}
              </TabPanel>
            ))}
            {/* Thumbnails */}
            <TabList className="testimonial-thumb-wrapper">
              {testimonials.map((testimonial) => (
                <Tab key={testimonial._id}>
                  <div className="testimonial-thumbnail">
                    <div className="thumb">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={`${testimonial.companyName} Image`}
                          onClick={() => handleImageClick(testimonial._id)} // Set selected testimonial ID
                        />
                      ) : (
                        <p>No image available</p>
                      )}
                    </div>
                  </div>
                </Tab>
              ))}
            </TabList>

           
          </Tabs>

        </div>
      </div>
    </React.Fragment>
  );
};

export default Testimonial;
