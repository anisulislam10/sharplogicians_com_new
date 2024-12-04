import React, { useEffect, useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FiChevronUp } from "react-icons/fi"; // Missing import added
import axios from "axios";
// import "./../../elements/team/style.css";
import PageHelmet from "../../component/common/Helmet";
import Breadcrumb from "../../elements/common/Breadcrumb";
import ScrollToTop from "react-scroll-up";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";

const socialIcons = {
  facebook: <FaFacebookF />,
  linkedin: <FaLinkedinIn />,
  twitter: <FaTwitter />,
};

const Team = ({ column = "col-lg-4 col-md-6 col-sm-12" }) => {
  const [TeamsValue, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/team/get");
        setTeam(response.data.ourTeam);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };
    fetchTeamData();
  }, []);

  return (
    <React.Fragment>
      <PageHelmet pageTitle="Our Team" />
      <Header
        headertransparent="header--transparent"
        colorblack="color--black"
        logoname="logo.png"
      />

      {/* Start Breadcrumb Area */}
      <Breadcrumb title={"Our Team"} />
      {/* End Breadcrumb Area */}

      {/* Start Team Area */}
      <div className="team-area ptb--120 bg_color--5" >
        <div className="container">
          <div className="row">
            {TeamsValue.length > 0 ? (
              TeamsValue.map((value, i) => (
                <div className={`${column}`} key={i}>
                  <div className="team">
                    <div className="thumbnail">
                      <img src={value.image} alt={value.name} />
                    </div>
                    <div className="content">
                      <h4 className="title">{value.name}</h4>
                      <p className="designation" style={{textAlign:'left'}}>{value.position}</p>
                      <div className="social-icon">
                        {value.facebook && (
                          <a style={{color:'white',paddingRight:'8px' }}
                            href={value.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                          >
                            {socialIcons.facebook}
                          </a>
                        )}
                        {value.linkedin && (
                          <a style={{color:'white',paddingRight:'8px' }}
                            href={value.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                          >
                            {socialIcons.linkedin}
                          </a>
                        )}
                        {value.twitter && (
                          <a style={{color:'white',paddingRight:'8px' }}
                            href={value.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                          >
                            {socialIcons.twitter}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading team members...</p>
            )}
          </div>
        </div>
      </div>
      {/* End Team Area */}

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

export default Team;
