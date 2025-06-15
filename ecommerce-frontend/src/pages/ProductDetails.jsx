import React from "react";
import Navbar from '../components/Navbar/Navbar.jsx'
import Header from '../components/Header/Header.jsx'
import Footer from '../components/footer/footer.jsx'
import BreadCrumbNav from '../components/Navbar/BreadCrumbNav.jsx'
import ProductImageGallery from '../components/ProductDetails/ProductImageGallery.jsx'
import ProductInfo from '../components/ProductDetails/ProductInfo.jsx'
import SellerInfo from '../components/ProductDetails/SellerInfo.jsx'
import ProductDescription from "../components/ProductDetails/ProductDescription.jsx";
import RelatedProducts from "../components/ProductDetails/RelatedProducts.jsx";
import Banner from "../components/ProductDetails/Banner.jsx";








const ProductDetails = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <BreadCrumbNav/>
      <div className="bg-slate-50  px-4 md:px-24 h-[580px] flex justify-center items-center ">
  <div className="bg-white rounded-md  py-6  w-full flex  h-[580px]  border">
    <ProductImageGallery />
    <ProductInfo />
    <SellerInfo />
    
   
  </div>

</div>

   <ProductDescription/>
   
   <RelatedProducts/>
  
  
   <Banner/>
      <Footer />
    </div>
  );
};

export default ProductDetails;
