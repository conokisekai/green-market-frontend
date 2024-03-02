import React from "react";
import "./about.css"; // Import CSS file

export const About = (props) => {
  return (
    <div id="about" style={{  color: 'white', padding: '40px', marginLeft: "0.7cm", maxWidth:"1600px" }}>
      <div className="container-r">
        <div className="rowez2">
          <div className="col1">
            <img src="img/polly.jpg" className="img-responsive" alt=""  />
          </div>
          <div className="col2">
            <div className="about-text">
              <div className="subtitle">
                <h1 className="text-center mb-4" style={{ fontSize: '3rem' }}>About Us</h1>
                <p>{props.data ? props.data.paragraph : "loading..."}</p>
              </div>
              <h3>Why Choose Us?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why.map((d, i) => (
                          <li key={`${d}-${i}`}>{d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why2.map((d, i) => (
                          <li key={`${d}-${i}`}> {d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
