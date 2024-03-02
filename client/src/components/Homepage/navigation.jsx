import React from "react";
import { Link } from "react-router-dom";

export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top" style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div className="navigation">
        <div className="first">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            Agri-Soko
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse "
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-centre">
            <li>
              <a href="#features" className="page-scroll">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="page-scroll">
                About us
              </a>
            </li>
            <li>
              <a href="#products" className="page-scroll">
                Our Products
              </a>
            </li>
            <li>
              <a href="#farms" className="page-scroll">
              Our Farms
              </a>
            </li>
            <li>
              <a href="#articles" className="page-scroll">
              Farm Articles
              </a>
            </li>
          
            <li>
              <a href="#contact" className="page-scroll">
                Contact
              </a>
            </li>
            <li>
             <button> <Link to="/usersignup"> Get Started</Link></button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
