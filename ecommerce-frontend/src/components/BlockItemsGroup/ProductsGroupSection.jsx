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
  <div className="bg-slate-50 pt-6 px-4 md:px-24">
      <div className="mx-auto w-full lg:w-[1180px] border border-gray-200 rounded-md overflow-hidden">
        <section className="bg-white shadow-md">
          <div className="flex flex-col md:flex-row">
            {/* Mobile View - Hero Title Only */}
            <article className="block md:hidden w-full p-4">
              <h2 className="text-xl font-semibold text-black mb-4">{hero.title}</h2>
            </article>

            {/* Desktop View - Hero with Background */}
            <article className="hidden md:block relative w-full lg:w-[320px] min-h-[150px] h-auto lg:h-[360px] flex-shrink-0">
              <img
                src={hero.imageSrc}
                alt={hero.imageAlt}
                className="absolute inset-0 w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/320x300/a0aec0/ffffff?text=Image+Not+Found";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-20"></div>
              <div className="relative z-10 p-6 flex flex-col h-full">
                <div>
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

            {/* Mobile View - Horizontal Scroll */}
            <article className="block md:hidden overflow-x-auto px-4">
              <div className="flex gap-4 w-max">
                {products.map((item, index) => (
                  <Link
                    to={`/ProductDetails/${item.id}`}
                    key={index}
                    className="min-w-[160px] border border-gray-200 rounded-md p-4 flex flex-col justify-between hover:bg-gray-50"
                  >
                    <div>
                      <h3 className="text-gray-800 text-base font-medium">{item.name}</h3>
                      <p className="text-gray-500 text-sm mt-1">{item.priceRange}</p>
                    </div>
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      className="w-16 h-16 object-contain self-end"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/64x64/d1d5db/000000?text=No+Img";
                      }}
                    />
                  </Link>
                ))}
              </div>
            </article>

            {/* Mobile View - Source Now Button */}
            <div className="block md:hidden px-4 mt-4">
  <button
  
    onClick={handleSourceNowClick}
    className="w-full text-left text-blue-600 py-2 rounded-md font-bold hover:underline transition"
  >
        {hero.buttonText}
    <span className="inline-block mr-2 ml-4 ">→</span>

  </button>
</div>


            {/* Desktop View - Product Grid */}
            <article className="hidden md:grid flex-grow grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 border-t md:border-t-0 md:border-l border-gray-200">
              {products.map((item, index) => (
                <Link
                  to={`/ProductDetails/${item.id}`}
                  key={index}
                  className={`p-4 pb-1 border-gray-200 flex flex-col items-start justify-between min-h-[150px]
                    ${index < products.length - 2 ? "border-b" : ""}
                    ${
                      (index + 1) % 2 !== 0 && index !== products.length - 1
                        ? "border-r"
                        : ""
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
                    <h3 className="text-gray-800 text-base font-medium">{item.name}</h3>
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
                    className="w-16 h-16 object-contain self-end"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/64x64/d1d5db/000000?text=No+Img";
                    }}
                  />
                </Link>
              ))}
            </article>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductsGroupSection;
