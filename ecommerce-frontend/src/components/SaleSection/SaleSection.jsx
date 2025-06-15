import React from "react";
// Link is used for navigation, assuming react-router-dom is available.
import { Link } from "react-router-dom"; 

const SaleSection = () => {
  return (
    <section className="md:bg-slate-50 px-2 md:py-8 md:px-6 lg:px-24 ">
      <div className="mx-auto flex flex-col lg:flex-row bg-white rounded-md py-4 md:p-6  max-w-full lg:max-w-[1180px] md:border md:border-gray-200 ">
        {/* Deals Info + Timer */}
       {/* Deals Info + Timer */}
        {/* The article itself is made horizontally scrollable on mobile (flex-row flex-nowrap overflow-x-auto) */}
        {/* On medium screens and above, it switches to a column layout (md:flex-col) */}
        <article className="flex md:flex-col flex-row flex-nowrap overflow-x-auto items-center lg:items-start justify-start lg:w-[285px] lg:border-r-2 lg:border-gray-200 md:pb-4 lg:pb-0 border-b-2 lg:border-b-0 border-gray-200 "> {/* Changed justify-center to justify-start */}
          {/* Ensure the text content part takes its space and doesn't shrink on mobile */}
          <div className="flex-shrink-0 px-4 md:px-0"> {/* Added px-4 for better spacing on mobile */}
            <h3 className="md:text-xl text-base font-semibold mb-1 md:text-center text-left lg:text-left">Deals and offers</h3> {/* Changed text-[8px] to text-base for readability */}
            <p className="md:text-sm text-xs text-gray-500 mb-4 md:text-center text-left lg:text-left">Hygiene equipments</p> {/* Changed text-[8px] to text-xs for readability */}
          </div>
          {/* The timer part also needs to contribute to the width and not shrink */}
          <div className="flex gap-2 text-center justify-center lg:justify-start w-full lg:w-auto md:ml-0  flex-shrink-0 min-w-[280px]"> {/* Changed ml-28 to ml-4 for less extreme spacing, added min-w to force overflow */}
            {/* The time values are hardcoded for demonstration. In a real app, these would come from state or props. */}
            {["04 Days", "13 Hour", "34 Min", "56 Sec"].map((item, index) => {
              const [num, label] = item.split(" ");
              return (
                <div key={index} className="	bg-[#606060] text-white px-2 py-1 rounded-md w-11 sm:w-12  flex-shrink-0">
                  <div className="text-lg font-bold">{num}</div>
                  <div className="text-xs">{label}</div>
                </div>
              );
            })}
          </div>
        </article>

        {/* Product List - Now horizontally scrollable with hidden scrollbar */}
        <article className="flex flex-nowrap overflow-x-auto pb-4 -mb-4 items-center justify-start gap-x-4 gap-y-6 flex-grow w-full lg:w-[calc(100%-285px-24px)]">
          {[
            {
              src: "/src/components/SaleSection/assets/SmartWatch_35.PNG", 
              alt: "Smart Watch",
              label: "Smart watches",
              discount: "-25%",
            },
            {
              src: "/src/components/SaleSection/assets/Laptop_34.PNG",
              alt: "Laptop",
              label: "Laptops",
              discount: "-15%",
            },
            {
              src: "/src/components/SaleSection/assets/camera_28.PNG",
              alt: "GoPro camera",
              label: "GoPro cameras",
              discount: "-40%",
            },
            {
              src: "/src/components/SaleSection/assets/headphones_29.PNG",
              alt: "Headphones",
              label: "Headphones",
              discount: "-25%",
            },
            {
              src: "/src/components/SaleSection/assets/mobile_23.PNG",
              alt: "Canon camera", 
              label: "Canon cameras", 
              discount: "-25%",
            },
            // Added a few more items to demonstrate scrolling
           
            
          ].map((item, index) => (
            <Link
              to="/ProductDetails" // Assuming this route exists or will be handled
              key={index}
              className="flex flex-col items-center text-center w-32 sm:w-36 flex-shrink-0 hover:opacity-80 transition-opacity duration-300 ease-in-out cursor-pointer "
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain mb-2" 
              />
              <p className="mt-2 text-sm font-medium text-gray-800">{item.label}</p>
              <span className="text-sm font-semibold bg-red-100 text-red-600 px-3 py-1 rounded-full inline-block mt-1">
                {item.discount}
              </span>
            </Link>
          ))}
        </article>
      </div>
    </section>
  );
};

export default SaleSection;
