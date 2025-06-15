import React from 'react';

const RelatedProducts = () => {
  // Dummy data for related products
  const products = [
    {
      id: 1,
      name: 'Xiaomi Redmi 8 Original',
      priceRange: '$32.00 - $40.00',
      image: 'src/components/SectionRecommend/assets/blueBag24.png', // Placeholder image for wallet
    },
    {
      id: 2,
      name: 'Xiaomi Redmi 8 Original',
      priceRange: '$32.00 - $40.00',
      image: 'src/components/SaleSection/assets/SmartWatch_35.png', // Placeholder image for smartwatch
    },
    {
      id: 3,
      name: 'Xiaomi Redmi 8 Original',
      priceRange: '$32.00 - $40.00',
      image: 'src/components/SectionRecommend/assets/image 86.png', // Placeholder image for headphones
    },
    {
      id: 4,
      name: 'Xiaomi Redmi 8 Original',
      priceRange: '$32.00 - $40.00',
      image: 'src/components/SectionRecommend/assets/shorts.png', // Placeholder image for jeans
    },
    {
      id: 5,
      name: 'Xiaomi Redmi 8 Original',
      priceRange: '$32.00 - $40.00',
      image: 'src/components/SectionRecommend/assets/blueBag24.png', // Placeholder image for thermos
    },
    {
      id: 6,
      name: 'Xiaomi Redmi 8 Original',
      priceRange: '$32.00 - $40.00',
      image: 'src/components/SaleSection/assets/SmartWatch_35.png', // Placeholder image for document holder
    },
    // Add more products as needed
  ];

  return (
    <div className="bg-slate-50 py-4 px-4 md:px-24">
    <div className=" p-4 md:p-8 lg:px-12 bg-white rounded-md border font-sans max-w-7xl mx-auto ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Related products</h2>
      <div className="flex  space-x-5 pb-4 -mx-4 px-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-40 sm:w-42 bg-white   cursor-pointer ">
            <div className="w-full h-36 sm:h-40 bg-gray-100 flex items-center justify-center rounded-t-lg  rounded ">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain p-2 mix-blend-multiply"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/120x120/EF4444/FFFFFF?text=Image+Error";
                }}
              />
            </div>
            <div className="p-3 ">
              <p className="text-sm font-semibold text-gray-800 mb-1">{product.name}</p>
              <p className="text-xs text-gray-600">{product.priceRange}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default RelatedProducts;
