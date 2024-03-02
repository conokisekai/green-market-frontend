import React, { useState, useEffect } from "react";
import { Navigation } from "./Homepage/navigation";
import { Header } from "./Homepage/header";
import { About } from "./Homepage/about";
import { Services } from "./Homepage/services";
import { Gallery } from "./Homepage/gallery";
import { Testimonials } from "./Homepage/testimonials";
import { Contact } from "./Homepage/contact";
import JsonData from "../data/data.json";
import SmoothScroll from "smooth-scroll";
import "./homex.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Home= () => {
  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div className="home" 
    style={{ 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
      alignItems: "center",
      minHeight: "100vh", // Make sure it covers at least the full viewport height
      width: "100%", // Set to cover 80% of the screen width
      margin: "auto", // Center the content horizontally
    }}
    >
      <Navigation />
      <Header data={landingPageData.Header} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Gallery data={landingPageData.Gallery} />
      <Testimonials data={landingPageData.Testimonials} />
      <Contact data={landingPageData.Contact} />
    </div>
  );
};

export default Home;
