import React, { useState,useEffect } from 'react';

const ProductImageGallery = ({images=[]}) => {
  // Define a set of product image URLs.
  // Using placeholder images for demonstration. In a real app, these would come from props or an API.
  const productImages = [
    "src/components/ProductDetails/assets/grayShirt34.png",
    "src/components/ProductDetails/assets/backside35.png",
    "src/components/ProductDetails/assets/collar40.png",
    "src/components/ProductDetails/assets/boyInShirt36.png",
    "src/components/ProductDetails/assets/folded37.png",
    "src/components/ProductDetails/assets/grayShirt34.png",
  ];

  // State to keep track of the currently selected main image.
  // Initialize with the first image in the productImages array.
 const [mainImage, setMainImage] = useState(
    images.length > 0 ? images[0] : "https://placehold.co/600x600/EF4444/FFFFFF?text=No+Image"
  );

  // If images prop updates, update mainImage as well
  useEffect(() => {
    if (images.length > 0) {
      setMainImage(images[0]);
    }
  }, [images]);

  // Handle click on a thumbnail image to update the main image.
  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  return (
//     <div className="flex flex-col items-center  md:p-8 lg:p-2 bg-white  font-sans max-w-4xl mx-auto ">
//       {/* Main Image Section - Adjusted width and height to 380x380 */}
//       {/* <div className='border  w-[380px] h-[380px]'> */}
//       <div className="border rounded-md w-[380px] h-[380px] p-4 flex justify-center items-center"> {/* Changed max-w-[380px] to w-[380px] and added h-[380px] */}
//         <div className="relative w-full h-full rounded-xl overflow-hidden "> {/* Removed aspect-square */}
//           <img
//             src={mainImage}
//             alt="Main Product"
//             className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
//             // Fallback for broken image links
//             onError={(e) => {
//               e.target.onerror = null; // prevents infinite loop
//               e.target.src = "https://placehold.co/600x600/EF4444/FFFFFF?text=Image+Not+Found";
//             }}
//           />
//         </div>
//       </div>
// {/* </div> */}
//       {/* Thumbnails Section - Moved below main image and adjusted layout for horizontal scroll */}
//       <div className="w-full  flex flex-col items-center mt-6"> {/* Removed lg:w-1/3 and added mt-6 for spacing */}
        
//         <div className="flex overflow-x-auto gap-2 p-2 w-full justify-center"> {/* Added flex and overflow-x-auto for horizontal scroll */}
//           {productImages.map((image, index) => (
//             <div
//               key={index}
//               className={`flex-shrink-0 w-14 h-14 sm:w-14 sm:h-14 rounded-md overflow-hidden cursor-pointer shadow-sm border-2 outline-none${
//                  ' hover:border-indigo-400'
//               } transition-all duration-200 ease-in-out transform hover:scale-105`}
//               onClick={() => handleThumbnailClick(image)}
//             >
//               <img
//                 src={image}
//                 alt={`Thumbnail ${index + 1}`}
//                 className="w-full h-full object-cover"
//                 // Fallback for broken image links
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = "https://placehold.co/150x150/F87171/FFFFFF?text=Thumb";
//                 }}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
<div className="flex flex-col items-center md:p-8 lg:p-2 bg-white font-sans max-w-4xl mx-auto">
      {/* Main Image */}
      <div className="border rounded-md w-[380px] h-[380px] p-4 flex justify-center items-center">
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <img
            src={mainImage}
            alt="Main Product"
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/600x600/EF4444/FFFFFF?text=Image+Not+Found";
            }}
          />
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="w-full flex flex-col items-center mt-6">
        <div className="flex overflow-x-auto gap-2 p-2 w-full justify-center">
          {images.length > 0 ? (
            images.map((image, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-14 h-14 sm:w-14 sm:h-14 rounded-md overflow-hidden cursor-pointer shadow-sm border-2 hover:border-indigo-400 transition-all duration-200 ease-in-out transform hover:scale-105`}
                onClick={() => handleThumbnailClick(image)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/150x150/F87171/FFFFFF?text=Thumb";
                  }}
                />
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No images available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;
