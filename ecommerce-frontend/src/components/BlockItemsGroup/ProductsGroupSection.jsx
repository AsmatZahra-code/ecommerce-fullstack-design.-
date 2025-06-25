import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
/**
 * Reusable Product Group Section Component
 *
 * This component displays a section featuring a main hero item on the left
 * and a grid of related product items on the right. All content is dynamic
 * via props.
 *
 * @param {object} hero - Data for the main featured item on the left.
 * @param {string} hero.imageSrc - The source URL for the hero background image.
 * @param {string} hero.imageAlt - The alt text for the hero background image.
 * @param {string} hero.title - The title for the hero section (e.g., "Home and outdoor").
 * @param {string} hero.buttonText - The text for the call-to-action button (e.g., "Source now").
 * @param {Array<object>} products - An array of objects, each representing a product item in the grid.
 * @param {string} products.name - The name of the product (e.g., "Soft chairs").
 * @param {string} products.priceRange - The price range or starting price (e.g., "From USD 19").
 * @param {string} products.imageSrc - The source URL for the product item image.
 * @param {string} products.imageAlt - The alt text for the product item image.
 */
const ProductsGroupSection = ({ hero, products }) => {
  const navigate = useNavigate();
console.log(products);
  const handleSourceNowClick = () => {
    // Navigate to a route like /products or /listing
    navigate("/ProductListing"); // Make sure this route exists in your app
  };
  return (
    <div className="bg-slate-50 pt-6 px-4 md:px-24  ">
      {/* Container div to match the width and alignment of the SaleSection's inner container */}
      <div className="mx-auto w-full lg:w-[1180px] border border-gray-200 rounded-md overflow-hidden">
        <section className="flex flex-col lg:flex-row bg-white shadow-md">
          {/* Left Block: Hero/Featured Item */}
          <article className="relative w-full lg:w-[320px] min-h-[150px]  h-auto  lg:h-[360px] flex-shrink-0">
            <img
              src={hero.imageSrc}
              alt={hero.imageAlt}
              className="absolute inset-0 w-full h-full object-contain lg:block "
              // Fallback for image loading errors
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/320x300/a0aec0/ffffff?text=Image+Not+Found";
              }}
            />
            {/* Optional subtle gradient overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-20"></div>

            <div className="relative z-10 p-6 flex flex-col h-full">
              <div>
                {/* Split title for line break effect */}
                <h2 className="text-xl md:text-2xl font-semibold text-black mb-4 mt-6">
                  {hero.title.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < hero.title.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </h2>
              </div>
              <button
                className="bg-white text-gray-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition duration-300 self-start"
                onClick={handleSourceNowClick}
              >
                {hero.buttonText}
              </button>
            </div>
          </article>

          {/* Right Grid of Product Items */}
          <article className="flex-grow grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 border-t lg:border-t-0 lg:border-l border-gray-200">
          
            {products.map((item, index) => (
              
              <Link
                // key={index}
                // className={`p-4 pb-1 border-gray-200 flex flex-col items-start justify-between min-h-[150px]
                //   ${index < (products.length - 2) ? 'border-b' : ''}
                //   ${(index + 1) % 2 !== 0 && index !== products.length -1 ? 'border-r' : ''}
                //   ${(index + 1) % 4 !== 0 && index !== products.length -1 && index !== products.length -2 ? 'lg:border-r' : ''}
                // `}
                debugger
                to={`/ProductDetails/${item.id}`} // Dynamic product ID
                key={index}
                className={`p-4 pb-1 border-gray-200 flex flex-col items-start justify-between min-h-[150px]
      ${index < products.length - 2 ? "border-b" : ""}
      ${
        (index + 1) % 2 !== 0 && index !== products.length - 1 ? "border-r" : ""
      }
      ${
        (index + 1) % 4 !== 0 &&
        index !== products.length - 1 &&
        index !== products.length - 2
          ? "lg:border-r"
          : ""
      }
      hover:bg-gray-50 transition cursor-pointer
    `}
              >
                <div>
                  <h3 className="text-gray-800 text-base font-medium">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {item.priceRange.split("\n").map((line, lineIndex) => (
                      <React.Fragment key={lineIndex}>
                        {line}
                        {lineIndex < item.priceRange.split("\n").length - 1 && (
                          <br />
                        )}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  className="w-16 h-16 object-contain self-end" // self-end to push image to bottom
                  // Fallback for image loading errors
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/64x64/d1d5db/000000?text=No+Img";
                  }}
                />
              </Link>
            ))}
          </article>
        </section>
      </div>
    </div>
  );
};

export default ProductsGroupSection;
