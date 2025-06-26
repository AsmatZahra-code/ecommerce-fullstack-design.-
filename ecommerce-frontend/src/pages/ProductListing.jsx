import React from "react";
import Navbar from '../components/Navbar/Navbar.jsx'
import Header from '../components/Header/Header.jsx'
import Footer from '../components/footer/Footer.jsx'
import BreadCrumbNav from '../components/Navbar/BreadCrumbNav.jsx'
import Sidebar_MainContent from '../components/MainSection/Sidebar_MainContent.jsx'
import Newsletter from '../components/Newsletter/Newsletter.jsx'

const ProductListing = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <BreadCrumbNav/>
      <Sidebar_MainContent/>
      <Newsletter/>
      <Footer />
    </div>
  );
};

export default ProductListing;
