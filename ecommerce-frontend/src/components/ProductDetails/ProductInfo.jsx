import React from 'react';

const ProductInfo = () => {
  return (
    <div className="w-[430px] bg-white py-4 px-4 text-sm text-gray-800 h-[514px]">

      {/* In stock */}
      <div className="flex items-center text-green-600 font-medium mb-2">
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        In stock
      </div>

      {/* Title */}
      <h1 className="text-lg font-semibold leading-5 mb-2 text-gray-900">
        Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle
      </h1>

      {/* Rating + Reviews + Sold */}
      <div className="flex items-center text-gray-500 text-xs mb-3">
        <div className="flex items-center text-orange-500 font-medium">
          ★ 9.3
        </div>
        <span className="mx-1">•</span> {/* Closer spacing and dot separator */}
        <div>32 reviews</div>
        <span className="mx-1">•</span> {/* Closer spacing and dot separator */}
        <div>154 sold</div>
      </div>

      {/* Price Tiers */}
      <div className="grid grid-cols-3 gap-0 mb-4 text-center text-xs border border-gray-300 rounded">
        <div className="bg-red-100 text-red-700 p-2 font-semibold border-r border-gray-300">
          <div className="text-base font-bold">$98.00</div>
          50-100 pcs
        </div>
        <div className="bg-orange-100 text-orange-700 p-2 font-semibold border-r border-gray-300">
          <div className="text-base font-bold">$90.00</div>
          100-700 pcs
        </div>
        <div className="bg-yellow-100 text-yellow-700 p-2 font-semibold">
          <div className="text-base font-bold">$78.00</div>
          700+ pcs
        </div>
      </div>

      {/* Product Info Section */}
      <div className="text-gray-700 text-xs leading-5">
        {/* Row 1: Price */}
        <div className="grid grid-cols-[80px_1fr] gap-x-2 py-1"> {/* Adjusted column widths for alignment */}
          <span className="font-medium">Price:</span>
          <span>Negotiable</span>
        </div>
        {/* Gray Line 1 */}
        <div className="border-t border-gray-200 my-1"></div> {/* Added gray line */}

        {/* Row 2: Type */}
        <div className="grid grid-cols-[80px_1fr] gap-x-2 py-1">
          <span className="font-medium">Type:</span>
          <span>Classic shoes</span>
        </div>
        {/* Row 3: Material */}
        <div className="grid grid-cols-[80px_1fr] gap-x-2 py-1">
          <span className="font-medium">Material:</span>
          <span>Plastic material</span>
        </div>
        {/* Row 4: Design */}
        <div className="grid grid-cols-[80px_1fr] gap-x-2 py-1">
          <span className="font-medium">Design:</span>
          <span>Modern nice</span>
        </div>
        {/* Gray Line 2 */}
        <div className="border-t border-gray-200 my-1"></div> {/* Added gray line */}

        {/* Row 5: Customization */}
        <div className="grid grid-cols-[80px_1fr] gap-x-2 py-1">
          <span className="font-medium">Customization:</span>
          <span className="text-left">Customized logo and design custom packages</span>
        </div>
        {/* Gray Line 3 */}
        <div className="border-t border-gray-200 my-1"></div> {/* Added gray line */}

        {/* Row 6: Protection */}
        <div className="grid grid-cols-[80px_1fr] gap-x-2 py-1">
          <span className="font-medium">Protection:</span>
          <span>Refund Policy</span>
        </div>
        {/* Row 7: Warranty */}
        <div className="grid grid-cols-[80px_1fr] gap-x-2 py-1">
          <span className="font-medium">Warranty:</span>
          <span>2 years full warranty</span>
        </div>
      </div>

    </div>
  );
};

export default ProductInfo;