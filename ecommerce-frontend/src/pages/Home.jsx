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
// const Home = () => {
//      const homeAndOutdoorData = {
//     imageSrc: "/src/components/BlockItemsGroup/assets/HomeAndOutdoor_92.png", // Your original image path
//     imageAlt: "Home and Outdoor background",
//     title: "Home and\noutdoor", // Title with explicit line break
//     buttonText: "Source now",
//   };

//   const homeAndOutdoorProductItems = [
//     { name: "Soft chairs", priceRange: "From\n USD 19", imageSrc: "/src/components/BlockItemsGroup/assets/sofa.png", imageAlt: "Picture of sofa" },
//     { name: "Sofa & chair", priceRange: "From\n USD 19", imageSrc: "/src/components/BlockItemsGroup/assets/lamp_094.PNG", imageAlt: "Picture of lamp" },
//     { name: "Kitchen dishes", priceRange: "From\n USD 18", imageSrc: "/src/components/BlockItemsGroup/assets/KitchenDishes_93.PNG", imageAlt: "Picture of Dishes" },
//     { name: "Smart watches", priceRange: "From\n USD 18", imageSrc: "/src/components/BlockItemsGroup/assets/Pot_90.PNG", imageAlt: "Picture of pot" },
//     { name: "Kitchen mixer", priceRange: "From\n USD 100", imageSrc: "/src/components/BlockItemsGroup/assets/KitchenMixer.PNG", imageAlt: "Picture of kitchen Mixer" },
//     { name: "Blenders", priceRange: "From\n USD 39", imageSrc: "/src/components/BlockItemsGroup/assets/blender.PNG", imageAlt: "Picture of a blender" },
//     { name: "Home appliance", priceRange: "From\n USD 19", imageSrc: "/src/components/BlockItemsGroup/assets/homeAppliance.PNG", imageAlt: "Picture of home appliance" },
//     { name: "Coffee maker", priceRange: "From\n USD 10", imageSrc: "/src/components/BlockItemsGroup/assets/Plant_89.PNG", imageAlt: "Picture of a plant" },
//   ];

//   const electronicsData = {
//     imageSrc: "/src/components/BlockItemsGroup/assets/electronics_98.png", // Your original image path
//     imageAlt: "Electronics and Gadgets background",
//     title: "Customer\n electronics and\ngadgets", // Title with explicit line break
//     buttonText: "Source now",
//   };
//   const electronicsAndGadgetsProductItems = [
//     { name: "Smart watches", priceRange: "From\n USD 19", imageSrc: "/src/components/SaleSection/assets/SmartWatch_35.png", imageAlt: "Picture of smart watch" },
//     { name: "Cameras", priceRange: "From\n USD 89", imageSrc: "/src/components/SaleSection/assets/camera_28.PNG", imageAlt: "Picture of camera" },
//     { name: "Headphones", priceRange: "From\n USD 10", imageSrc: "/src/components/BlockItemsGroup/assets/WhiteHeadphones_86.PNG", imageAlt: "Picture of white headphones" },
//     { name: "Smart watches", priceRange: "From\n USD 90", imageSrc: "/src/components/BlockItemsGroup/assets/jug10.PNG", imageAlt: "Picture of jug" },
//     { name: "Gaming set", priceRange: "From\n USD 35", imageSrc: "/src/components/SaleSection/assets/headphones_29.PNG", imageAlt: "Picture of black headphones" },
//     { name: "Laptop & PC", priceRange: "From\n USD 340", imageSrc: "/src/components/SaleSection/assets/Laptop_34.PNG", imageAlt: "Picture of a laptop" },
//     { name: "Samrtphones", priceRange: "From\n USD 19", imageSrc: "/src/components/BlockItemsGroup/assets/MobileMultiWP32.PNG", imageAlt: "Picture of smart phones" },
//     { name: "Electric kattle", priceRange: "From\n USD 240", imageSrc: "/src/components/BlockItemsGroup/assets/OrangeWPMobile33.PNG", imageAlt: "Picture of a mobile" },
//   ];

// const Home = () => {
//   // const [data,setData]=useState([]);
//   // useEffect(()=>{
//   //   fetchDataFromApi("/api/category").then((res)=>{
//   //     setData(res);
//   //   })
//   // },[])
//    const homeAndOutdoorData = {
//     imageSrc: "/src/components/BlockItemsGroup/assets/HomeAndOutdoor_92.png", // Your original image path
//     imageAlt: "Home and Outdoor background",
//     title: "Home and\noutdoor", // Title with explicit line break
//     buttonText: "Source now",
//   };

//   const homeAndOutdoorProductItems = [
//     { name: "Soft chairs", priceRange: "From\n USD 19", imageSrc: "/src/components/BlockItemsGroup/assets/sofa.png", imageAlt: "Picture of sofa" },
//     { name: "Sofa & chair", priceRange: "From\n USD 19", imageSrc: "/src/components/BlockItemsGroup/assets/lamp_094.PNG", imageAlt: "Picture of lamp" },
//     { name: "Kitchen dishes", priceRange: "From\n USD 18", imageSrc: "/src/components/BlockItemsGroup/assets/KitchenDishes_93.PNG", imageAlt: "Picture of Dishes" },
//     { name: "Smart watches", priceRange: "From\n USD 18", imageSrc: "/src/components/BlockItemsGroup/assets/Pot_90.PNG", imageAlt: "Picture of pot" },
//     { name: "Kitchen mixer", priceRange: "From\n USD 100", imageSrc: "/src/components/BlockItemsGroup/assets/KitchenMixer.PNG", imageAlt: "Picture of kitchen Mixer" },
//     { name: "Blenders", priceRange: "From\n USD 39", imageSrc: "/src/components/BlockItemsGroup/assets/blender.PNG", imageAlt: "Picture of a blender" },
//     { name: "Home appliance", priceRange: "From\n USD 19", imageSrc: "/src/components/BlockItemsGroup/assets/homeAppliance.PNG", imageAlt: "Picture of home appliance" },
//     { name: "Coffee maker", priceRange: "From\n USD 10", imageSrc: "/src/components/BlockItemsGroup/assets/Plant_89.PNG", imageAlt: "Picture of a plant" },
//   ];

//   const electronicsData = {
//     imageSrc: "/src/components/BlockItemsGroup/assets/electronics_98.png", // Your original image path
//     imageAlt: "Electronics and Gadgets background",
//     title: "Customer\n electronics and\ngadgets", // Title with explicit line break
//     buttonText: "Source now",
//   };
//   const electronicsAndGadgetsProductItems = [
//     { name: "Smart watches", priceRange: "From\n USD 19", imageSrc: "/src/components/SaleSection/assets/SmartWatch_35.png", imageAlt: "Picture of smart watch" },
//     { name: "Cameras", priceRange: "From\n USD 89", imageSrc: "/src/components/SaleSection/assets/camera_28.PNG", imageAlt: "Picture of camera" },
//     { name: "Headphones", priceRange: "From\n USD 10", imageSrc: "/src/components/BlockItemsGroup/assets/WhiteHeadphones_86.PNG", imageAlt: "Picture of white headphones" },
//     { name: "Smart watches", priceRange: "From\n USD 90", imageSrc: "/src/components/BlockItemsGroup/assets/jug10.PNG", imageAlt: "Picture of jug" },
//     { name: "Gaming set", priceRange: "From\n USD 35", imageSrc: "/src/components/SaleSection/assets/headphones_29.PNG", imageAlt: "Picture of black headphones" },
//     { name: "Laptop & PC", priceRange: "From\n USD 340", imageSrc: "/src/components/SaleSection/assets/Laptop_34.PNG", imageAlt: "Picture of a laptop" },
//     { name: "Samrtphones", priceRange: "From\n USD 19", imageSrc: "/src/components/BlockItemsGroup/assets/MobileMultiWP32.PNG", imageAlt: "Picture of smart phones" },
//     { name: "Electric kattle", priceRange: "From\n USD 240", imageSrc: "/src/components/BlockItemsGroup/assets/OrangeWPMobile33.PNG", imageAlt: "Picture of a mobile" },
//   ];
//   const [homeCategory, setHomeCategory] = useState(null);
//   const [electronicsCategory, setElectronicsCategory] = useState(null);
//   const [homeProducts, setHomeProducts] = useState([]);
//   const [electronicsProducts, setElectronicsProducts] = useState([]);

//   // Helper: Format products into display format
//   const transformProducts = (products) =>
//     products.map((p) => ({
//       name: p.name,
//       priceRange: `From\n USD ${p.price}`,
//       imageSrc: p.images[0], // assuming first image
//       imageAlt: `Picture of ${p.name}`,
//     }));

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const [homeFeat, homeCat, electronicsCat, electronicsFeat] = await Promise.all([
        
//         fetchFeaturedProductsByCategory("Home and Outdoor"),
//         fetchCategoryByName("Home and Outdoor"),
//         fetchCategoryByName("Customer electronics and gadgets"),
//         fetchFeaturedProductsByCategory("Customer electronics and gadgets"),
//       ]);
//       console.log(homeFeat);
//       setHomeCategory(homeCat);
//       setElectronicsCategory(electronicsCat);
//       setHomeProducts(transformProducts(homeFeat));
//       setElectronicsProducts(transformProducts(electronicsFeat));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   fetchData();
// }, []);
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
 console.log("homeCategory from API:", homeCat);
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