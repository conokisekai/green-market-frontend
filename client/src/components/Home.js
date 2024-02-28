import React, { useState, useEffect } from "react";
import { Navigation } from "./Homepage/navigation";
import { Header } from "./Homepage/header";
import { About } from "./Homepage/about";
import { Services } from "./Homepage/services";
import { Gallery } from "./Homepage/gallery";
import { Testimonials } from "./Homepage/testimonials";
import { Team } from "./Homepage/Team";
import { Contact } from "./Homepage/contact";
import JsonData from "../data/data.json";
import SmoothScroll from "smooth-scroll";
import "./homex.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Homex = () => {
  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navigation />
      <Header data={landingPageData.Header} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Gallery data={landingPageData.Gallery} />
      <Testimonials data={landingPageData.Testimonials} />
      <Team data={landingPageData.Team} />
      <Contact data={landingPageData.Contact} />
    </div>
  );
};

export default Homex;
