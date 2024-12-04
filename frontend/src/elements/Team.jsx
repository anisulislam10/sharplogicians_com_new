import React, { useEffect, useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import axios from "axios";
import './../elements/team/style.css';

const socialIcons = {
  facebook: <FaFacebookF />,
  linkedin: <FaLinkedinIn />,
  twitter: <FaTwitter />,
};

const Team = ({ column }) => {
  const [TeamsValue, setTeam] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_BASE_URL_GET_TEAM);
        console.log(response.data);
        setTeam(response.data.ourTeam);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  return (
    <>
      {TeamsValue.map((value, i) => (
        <div className={`${column}`} key={i}>
          <div className="team">
            <div className="thumbnail">
              <img src={value.image} alt="Team Member" />
            </div>
            <div className="content">
              <h4 className="title">{value.name}</h4>
              <p className="designation" style={{ textAlign: "left" }}>
                {value.position}
              </p>
              <div className="social-icon" style={{ display: "flex", gap: "10px" }}>
                {/* Conditionally render social media icons only if link exists */}
                {value.facebook && value.facebook !== "" && (
                  <a href={value.facebook} target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
                    {socialIcons.facebook}
                  </a>
                )}
                {value.linkedin && value.linkedin !== "" && (
                  <a href={value.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
                    {socialIcons.linkedin}
                  </a>
                )}
                {value.twitter && value.twitter !== "" && (
                  <a href={value.twitter} target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
                    {socialIcons.twitter}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Team;
