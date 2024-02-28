import { Image } from "../image";
import React from "react";

export const Gallery = (props) => {
  return (
    <div id="portfolio" className="text-center">
      <div className="container-g">
        <div className="section-title">
          <h2>Services</h2>
          <p>
            our products and produces.
          </p>
        </div>
        <div className="row">
          <div className="portfolio-items">
          "Agrisoko helps me find good food from farmers. I buy fresh fruits and vegetables easily."<br/>
          "I use Agrisoko to talk to farmers and buy fresh food. It's simple and good."<br/>
          "Agrisoko makes it easy to buy food. I order and it comes to me on time."<br/>
          "I like Agrisoko because it tells me where my food comes from. I trust it."<br/>
          "Buying food with Agrisoko is easy. I get what I need quickly and it's fresh."
          </div>
        </div>
      </div>
    </div>
  );
};
