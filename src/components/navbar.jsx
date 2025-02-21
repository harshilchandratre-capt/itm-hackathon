import React from "react";
import { NavLink } from "react-router-dom";
import "../css/navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar w-full">
        <div className="logo">
          <img className="ayogo-main" src="/ayogo.png" alt="ayokrishi" />
          <label className="ayokrishi-title">AyoKrishi</label>
        </div>

        <ul className="navbar-list">
          <li className="navbar-item">
            <NavLink to="/" className="navbar-link home-active">
              Home
            </NavLink>
          </li>
          <li className="navbar-item">
            <a
              href="https://ayokrishi-connect-test.vercel.app/"
              className="navbar-link"
              target="_blank"
              rel="noreferrer"
            >
              Chat
            </a>
          </li>
          {/* <li className="navbar-item"><NavLink to='/articles' className="navbar-link">Articles</NavLink></li> */}
          <li className="navbar-item">
            <a href="#news-insights" className="navbar-link">
              News
            </a>
          </li>
          {/* <li className="navbar-item"><ScrollLink to="section1" smooth={true} duration={500}>News</ScrollLink></li> */}
          <li className="navbar-item">
            <NavLink to="/about" className="navbar-link">
              About
            </NavLink>
          </li>

          {/* <div className="separator"></div> */}

          <li className="navbar-item">
            <div className="profile-align">
              <label className="userName">
                <img className="nav-profile-pic" src="#" alt="Profile" />{" "}
              </label>
              <div className="logout-container">
                <NavLink className="navbar-link logout-border">Log Out</NavLink>
                &nbsp;
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
