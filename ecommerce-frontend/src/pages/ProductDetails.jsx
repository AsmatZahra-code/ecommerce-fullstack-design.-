import React, { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api";
import Navbar from "../components/Navbar/Navbar.jsx";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/footer/footer.jsx";
import BreadCrumbNav from "../components/Navbar/BreadCrumbNav.jsx";
import ProductImageGallery from "../components/ProductDetails/ProductImageGallery.jsx";
import ProductInfo from "../components/ProductDetails/ProductInfo.jsx";
import SellerInfo from "../components/ProductDetails/SellerInfo.jsx";
import ProductDescription from "../components/ProductDetails/ProductDescription.jsx";
import RelatedProducts from "../components/ProductDetails/RelatedProducts.jsx";
import Banner from "../components/ProductDetails/Banner.jsx";

const ProductDetails = () => {
   const { id } = useParams();
  const [product, setProduct] = useState(null);

   useEffect(() => {
    console.log("Product ID:", id);
    const loadProduct = async () => {
      const data = await fetchDataFromApi(`/api/product/${id}`);
      setProduct(data);
    };
    loadProduct();
  }, [id]);

  if (!product) return <div className="text-center py-10">Loading...</div>;
  return (
    <div>
      <Header />
      <Navbar />
      <BreadCrumbNav />
      <div className="bg-slate-50  px-4 md:px-24 h-[580px] flex justify-center items-center ">
        <div className="bg-white rounded-md  py-6  w-full flex  h-[580px]  border">
          <ProductImageGallery images={product.images} />
          <ProductInfo product={product}/>
          <SellerInfo supplier={product.supplier}/>
        </div>
      </div>

      <ProductDescription product={product} />

      <RelatedProducts related={product.relatedProducts}/>

      <Banner />
      <Footer />
    </div>
  );
};

export default ProductDetails;
