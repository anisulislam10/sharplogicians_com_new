  import React, { Component } from "react";
  import { Link } from "react-router-dom";
  import { FiX, FiMenu } from "react-icons/fi";

  import logoDefault from "../../assets/images/logo/logo-white.png";
  import logoLight from "../../assets/images/logo/logo-white.png";
  import logoDark from "../../assets/images/logo/logo-white.png";

  class Header extends Component {
    constructor(props) {
      super(props);
      this.menuTrigger = this.menuTrigger.bind(this);
      this.CLoseMenuTrigger = this.CLoseMenuTrigger.bind(this);
      window.addEventListener("load", function () {
        console.log("All assets are loaded");
      });
    }

    menuTrigger() {
      document.querySelector(".header-wrapper").classList.toggle("menu-open");
    }

    CLoseMenuTrigger() {
      document.querySelector(".header-wrapper").classList.remove("menu-open");
    }

    render() {
      const { logo, color = "default-color" } = this.props;
      let logoUrl;
      if (logo === "light") {
        logoUrl = <img src={logoLight} alt="Digital Agency" />;
      } else if (logo === "dark") {
        logoUrl = <img src={logoDark} alt="Digital Agency" />;
      } else {
        logoUrl = <img src={logoDefault} alt="Digital Agency" />;
      }

      return (
        <header
          className={`header-area formobile-menu header--transparent ${color}`}
        >
          <div className="header-wrapper" id="header-wrapper">
            <div className="header-left">
              <div className="logo">
                <a href="/">{logoUrl}</a>
              </div>
            </div>
            <div className="header-right">
              <nav className="mainmenunav d-lg-block">
                <ul className="mainmenu">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/service">Service</Link>
                  </li>
                  <li>
                    <Link to="/about" >About</Link>
                  </li>
                  <li>
                    <Link to="/team">Team</Link>
                  </li>
                  <li>
                    <Link to="/contact" >Contact</Link>
                  </li>
                </ul>
              </nav>
              <div className="header-btn">
                <a className="rn-btn" href="/quote">
                  <span>Get a quote</span>
                </a>
              </div>
              {/* Start Humberger Menu */}
              <div className="humberger-menu d-block d-lg-none pl--20">
                <span
                  onClick={this.menuTrigger}
                  className="menutrigger text-white"
                >
                  <FiMenu />
                </span>
              </div>
              {/* End Humberger Menu */}
              <div className="close-menu d-block d-lg-none">
                <span onClick={this.CLoseMenuTrigger} className="closeTrigger">
                  <FiX />
                </span>
              </div>
            </div>
          </div>
        </header>
      );
    }
  }

  export default Header;
