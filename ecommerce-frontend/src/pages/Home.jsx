import React from 'react'
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
import Footer from '../components/footer/footer.jsx'
const Home = () => {
     const homeAndOutdoorData = {
    imageSrc: "/src/components/BlockItemsGroup/assets/HomeAndOutdoor_92.png", // Your original image path
    imageAlt: "Home and Outdoor background",
    title: "Home and\noutdoor", // Title with explicit line break
    buttonText: "Source now",
  };

  const homeAndOutdoorProductItems = [
    { name: "Soft chairs", priceRange: "From\n USD 19", imageSrc: "/src/components/BlockItemsGroup/assets/sofa.png", imageAlt: "Picture of sofa" },
    { name: "Sofa & chair", priceRange: "From\n USD 19", imageSrc: "/src/components/BlockItemsGroup/assets/lamp_094.PNG", imageAlt: "Picture of lamp" },
    { name: "Kitchen dishes", priceRange: "From\n USD 18", imageSrc: "/src/components/BlockItemsGroup/assets/KitchenDishes_93.PNG", imageAlt: "Picture of Dishes" },
    { name: "Smart watches", priceRange: "From\n USD 18", imageSrc: "/src/components/BlockItemsGroup/assets/Pot_90.PNG", imageAlt: "Picture of pot" },
    { name: "Kitchen mixer", priceRange: "From\n USD 100", imageSrc: "/src/components/BlockItemsGroup/assets/KitchenMixer.PNG", imageAlt: "Picture of kitchen Mixer" },
    { name: "Blenders", priceRange: "From\n USD 39", imageSrc: "/src/components/BlockItemsGroup/assets/blender.PNG", imageAlt: "Picture of a blender" },
    { name: "Home appliance", priceRange: "From\n USD 19", imageSrc: "/src/components/BlockItemsGroup/assets/homeAppliance.PNG", imageAlt: "Picture of home appliance" },
    { name: "Coffee maker", priceRange: "From\n USD 10", imageSrc: "/src/components/BlockItemsGroup/assets/Plant_89.PNG", imageAlt: "Picture of a plant" },
  ];

  const electronicsData = {
    imageSrc: "/src/components/BlockItemsGroup/assets/electronics_98.png", // Your original image path
    imageAlt: "Electronics and Gadgets background",
    title: "Customer\n electronics and\ngadgets", // Title with explicit line break
    buttonText: "Source now",
  };
  const electronicsAndGadgetsProductItems = [
    { name: "Smart watches", priceRange: "From\n USD 19", imageSrc: "/src/components/SaleSection/assets/SmartWatch_35.png", imageAlt: "Picture of smart watch" },
    { name: "Cameras", priceRange: "From\n USD 89", imageSrc: "/src/components/SaleSection/assets/camera_28.PNG", imageAlt: "Picture of camera" },
    { name: "Headphones", priceRange: "From\n USD 10", imageSrc: "/src/components/BlockItemsGroup/assets/WhiteHeadphones_86.PNG", imageAlt: "Picture of white headphones" },
    { name: "Smart watches", priceRange: "From\n USD 90", imageSrc: "/src/components/BlockItemsGroup/assets/jug10.PNG", imageAlt: "Picture of jug" },
    { name: "Gaming set", priceRange: "From\n USD 35", imageSrc: "/src/components/SaleSection/assets/headphones_29.PNG", imageAlt: "Picture of black headphones" },
    { name: "Laptop & PC", priceRange: "From\n USD 340", imageSrc: "/src/components/SaleSection/assets/Laptop_34.PNG", imageAlt: "Picture of a laptop" },
    { name: "Samrtphones", priceRange: "From\n USD 19", imageSrc: "/src/components/BlockItemsGroup/assets/MobileMultiWP32.PNG", imageAlt: "Picture of smart phones" },
    { name: "Electric kattle", priceRange: "From\n USD 240", imageSrc: "/src/components/BlockItemsGroup/assets/OrangeWPMobile33.PNG", imageAlt: "Picture of a mobile" },
  ];
  return (
    <div>
         <Header/>
         <Navbar/>
         <MainSection/>
         <SaleSection/>
         <ProductsGroupSection hero={homeAndOutdoorData} products={homeAndOutdoorProductItems} />
   
         <ProductsGroupSection hero={electronicsData} products={electronicsAndGadgetsProductItems} />
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