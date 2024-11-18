import React from "react";
import "./Home.css";
import simg from "./images/salad2.png";
// Import animations from react-awesome-reveal
import { Fade, Zoom } from "react-awesome-reveal";

export const Home = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-text">
            {/* Adding animation to text elements */}
            <Zoom>
              <h1 className="brand-name">NutriNext</h1>
            </Zoom>
            <Fade direction="left" duration={1000}>
              <h1>Wholesome Food<br /> For Healthy Life</h1>
            </Fade>
            <Fade delay={500}>
              <p>Healthy & Tasty Food</p>
            </Fade>
            <Fade delay={700}>
              <p>
                NutriNext is a fun and interactive app designed to help people understand their daily nutrition needs. 
                With engaging visuals and simple tips, it empowers kids to make healthy food choices every day.
              </p>
            </Fade>
            <Fade direction="up" duration={1200}>
              <a href="/" className="btn">Visit us!</a>
            </Fade>
            <Fade delay={900}>
              <p className="visit-us">Come to visit us!</p>
            </Fade>
          </div>
          
          {/* Adding animation to the image */}
          <Zoom delay={300}>
            <div className="hero-image">
              <img src={simg} alt="Healthy Salad" />
            </div>
          </Zoom>
        </div>
      </section>
    </>
  );
};

export default Home;
