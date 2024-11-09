import React from "react";
import './Home.css'
import heroImg from "./images/main.jpg";
import heroImgback from "./images/hero-shape-purple.png";
import { FiSearch } from "react-icons/fi";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { FaGraduationCap, FaUsers } from "react-icons/fa";
import aboutImg from "./images/about.jpg";
import imgs from "./images/join1.png";
import { AiOutlineCheck } from "react-icons/ai";
import { GiEvilBook, GiWorld } from "react-icons/gi";
import imgs1 from "./images/award1.jpg";
import imgs2 from "./images/award2.jpg";
import simg from "./images/salad2.png"

export const Home = () => {
  return (
    <>
     <section class="hero">
    <div class="container">
        <div class="hero-text">
            <h1 class="brand-name">NutriNext</h1>
            <h1>Wholesome Food<br/> For Healthy Life</h1>
            <p>Healthy & Tasty Food</p>
            <p>NutriNext is a fun and interactive app designed to help children understand their daily nutrition needs. With engaging visuals and simple tips, it empowers kids to make healthy food choices every day.</p>
            <a href="/" class="btn">Visit us!</a>
            <p class="visit-us">Come to visit us!</p>
        </div>
        <div class="hero-image">
            <img src={simg} alt="Healthy Salad"/>
        </div>
    </div>
</section>

    </>
  );
};



export default Home;
