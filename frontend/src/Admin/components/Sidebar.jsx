import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./../styles/Sidebar.css";
import './../styles/Dashboard.css';

// Import your icons (assuming you're using react-icons)
import { FaServicestack, FaBriefcase, FaUsers, FaTeamspeak, FaComment, FaBlog, FaFileContract } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";

const Sidebar = ({ menus = [], profile }) => {
    const location = useLocation();  // Get current path

    return (
        <div className="sidebar">
            {/* Profile Section */}
            <div className="profile-section">
                <img
                    src={profile?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} // Default image if none provided
                    alt="Profile"
                    className="profile-pic"
                />
                <p className="username">{profile?.username || "admin"}</p>
                <p className="email">{profile?.email || "user@example.com"}</p>
            </div>

            {/* Dashboard Header */}
            <h2 className="dashboard-text"></h2>

            {/* Menu List */}
            <ul>
                {menus.map((menu, index) => {
                    const isActive = location.pathname === menu.path; // Check if current path matches the menu path

                    return (
                        <li key={index} className={isActive ? "active" : ""}> {/* Add active class if it's the current menu */}
                            <Link to={menu.path} style={{gap:'10px'}}>
                                {menu.icon} {menu.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Sidebar;
