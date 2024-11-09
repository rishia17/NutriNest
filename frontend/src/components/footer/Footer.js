import React from 'react';
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import './Footer.css'; // Adjust the path if necessary

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>About Us</h3>
          <p>We are dedicated to providing the freshest, healthiest food options for your wellness journey.</p>
        </div>
        <div className="footer-column">
          <h3>Contact Us</h3>
          <p>Email: support@healthyfood.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div className="footer-column">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><CiFacebook /></a>
            <a href="#"><CiTwitter /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Healthy Food. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
