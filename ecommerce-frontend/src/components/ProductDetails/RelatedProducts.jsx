// import React from 'react';

const RelatedProducts = ({ related = [] }) => {
  return (
    <div className="bg-slate-50 py-4 px-4 md:px-24">
      <div className="p-4 md:p-8 lg:px-12 bg-white rounded-md border font-sans max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
        {related.length > 0 ? (
          <div className="flex space-x-5 pb-4 -mx-4 px-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 overflow-x-auto">
            {related.map((product, index) => (
              <div key={product.id || index} className="flex-shrink-0 w-40 sm:w-42 bg-white cursor-pointer">
                <div className="w-full h-36 sm:h-40 bg-gray-100 flex items-center justify-center rounded-t-lg rounded">
                  <img
                    src={product.images[0] || "https://placehold.co/120x120?text=No+Image"}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain p-2 mix-blend-multiply"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/120x120/EF4444/FFFFFF?text=Image+Error";
                    }}
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-gray-800 mb-1">{product.name}</p>
                  <p className="text-xs text-gray-600">${product.price || 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 px-4">No related products available.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
