import React, { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api";
import Navbar from "../components/Navbar/Navbar.jsx";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import BreadCrumbNav from "../components/Navbar/BreadCrumbNav.jsx";
import ProductImageGallery from "../components/ProductDetails/ProductImageGallery.jsx";
import ProductInfo from "../components/ProductDetails/ProductInfo.jsx";
import SellerInfo from "../components/ProductDetails/SellerInfo.jsx";
import ProductDescription from "../components/ProductDetails/ProductDescription.jsx";
import RelatedProducts from "../components/ProductDetails/RelatedProducts.jsx";
import Banner from "../components/ProductDetails/Banner.jsx";
import { useAuth } from '../context/AuthContext';

const ProductDetails = () => {
  const { currentUser } = useAuth();
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
   
      <div className="bg-slate-50 px-4 md:px-24 py-6">
  <div className="bg-white rounded-md w-full border flex flex-col lg:flex-row gap-4 p-4">
    {/* Image Gallery */}
    <div className="flex-1">
      <ProductImageGallery images={product.images} />
    </div>

    {/* Product Info */}
    <div className="flex-1">
      <ProductInfo product={product} />
    </div>

    {/* Seller Info */}
    <div className="flex-1">
      <SellerInfo
        supplier={product.supplier}
        productId={product._id}
        userId={currentUser?.id}
      />
    </div>
  </div>
</div>

<div className="hidden md:block">
      <ProductDescription product={product} />
</div>
      <RelatedProducts related={product.relatedProducts}/>

      <Banner />
      <Footer />
    </div>
  );
};

export default ProductDetails;
