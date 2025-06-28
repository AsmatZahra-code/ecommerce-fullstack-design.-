import React from "react";
import Navbar from '../components/Navbar/Navbar.jsx'
import Header from '../components/Header/Header.jsx'
import Footer from '../components/footer/Footer.jsx'
import Banner from "../components/ProductDetails/Banner.jsx";
import MycartMainContent from "../components/Cart/MycartMainContent.jsx";

const Cart = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <MycartMainContent/>
      <Banner/>
      <Footer />
    </div>
  );
};

export default Cart;
