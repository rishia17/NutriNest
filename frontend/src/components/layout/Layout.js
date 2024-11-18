import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header"; // Import the Header component
import Footer from "../footer/Footer"; // Corrected import path

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header /> {/* Include the Header component */}
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
