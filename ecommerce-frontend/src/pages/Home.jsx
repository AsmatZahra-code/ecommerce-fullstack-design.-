import React, { useEffect, useState } from 'react'
import {
  fetchDataFromApi,
  fetchCategoryByName,
  fetchFeaturedProductsByCategory
} from '../utils/api.js';
import Navbar from '../components/Navbar/Navbar.jsx'
import Header from '../components/Header/Header.jsx'
import MainSection  from '../components/MainSection/MainSection.jsx'
import SaleSection from '../components/SaleSection/SaleSection.jsx'
import ProductsGroupSection from '../components/BlockItemsGroup/ProductsGroupSection.jsx'
import InquirySection from '../components/InquiryForm/InquirySection.jsx'
import SectionRecommend from '../components/SectionRecommend/SectionRecommend.jsx'
import SectionService from '../components/SectionService/SectionService.jsx'
import SuppliersSection from '../components/SuppliersSection/SupplierSection.jsx'
import Newsletter from '../components/Newsletter/Newsletter.jsx'
import Footer from '../components/footer/Footer.jsx'

const Home = () => {
 const getFullImageUrl = (imagePath) => {
  if (!imagePath) return "https://placehold.co/320x300/a0aec0/ffffff?text=Image+Not+Found";
  if (imagePath.startsWith("http")) return imagePath; // already a full URL
  return `${import.meta.env.VITE_REACT_APP_BASE_URL}/${imagePath.replace(/^\/+/, "")}`; // remove leading slashes
};


  const [homeCategory, setHomeCategory] = useState([]);
  const [electronicsCategory, setElectronicsCategory] = useState([]);
  const [homeProducts, setHomeProducts] = useState([]);
  const [electronicsProducts, setElectronicsProducts] = useState([]);

  const transformProducts = (products) =>
    products.map((p) => ({
      id:p.id,
      name: p.name,
      priceRange: `From\n USD ${p.price}`,
      imageSrc: p.images[0],
      imageAlt: `Picture of ${p.name}`,
    }));

const getHeroFromCategory = (category) => ({
  imageSrc: category.images[0],  // <-- Fix: access first item of images array
  imageAlt: `${category.name} background`,
  title: category.name,
  buttonText: "Source now",
});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeFeat, homeCat, electronicsCat, electronicsFeat] = await Promise.all([
          fetchFeaturedProductsByCategory("Home and Outdoor"),
          fetchCategoryByName("Home and Outdoor"),
          fetchCategoryByName("Customer electronics"),
          fetchFeaturedProductsByCategory("Customer electronics"),
        ]);
 
        setHomeCategory(homeCat);
        setElectronicsCategory(electronicsCat);
        setHomeProducts(transformProducts(homeFeat));
        setElectronicsProducts(transformProducts(electronicsFeat));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
         <Header/>
         <Navbar/>
         <MainSection/>
         <SaleSection/>
         {/* <ProductsGroupSection hero={homeAndOutdoorData} products={homeAndOutdoorProductItems} />
   
         <ProductsGroupSection hero={electronicsData} products={electronicsAndGadgetsProductItems} /> */}
          {homeCategory && homeProducts.length > 0 && (
        <ProductsGroupSection hero={getHeroFromCategory(homeCategory)} products={homeProducts} />
      )}

      {electronicsCategory && electronicsProducts.length > 0 && (
        <ProductsGroupSection hero={getHeroFromCategory(electronicsCategory)} products={electronicsProducts} />
      )}

        <InquirySection/>
        <SectionRecommend/>
        <SectionService/>
        <SuppliersSection/>
        <Newsletter/>
        <Footer/>
        
       </div>
  )
}

export default Home