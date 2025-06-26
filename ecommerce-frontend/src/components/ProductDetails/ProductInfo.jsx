

import React from 'react';

const ProductInfo = ({ product }) => {
  const {
    name,
    rating,
    numReviews,
    orders,
    price,
    priceRanges = [],
    negotiablePrice,
    material,
    design,
    warranty,
    customization,
    protection,
    condition,
  } = product;

  return (
    // <div className="w-[400px] bg-white py-4 px-2 text-sm text-gray-800 h-[514px] overflow-y-auto">
     <div className="w-full md:w-[400px] bg-white py-4 px-4 text-sm text-gray-800 max-h-[514px] overflow-y-auto">
 
      {/* Availability */}
      <div className="flex items-center text-green-600 font-medium mb-2">
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        {product.availabilityStatus || 'In stock'}
      </div>

      {/* Title */}
      <h1 className="text-lg font-semibold leading-5 mb-2 text-gray-900">
        {name}
      </h1>

      {/* Rating + Reviews + Sold */}
      <div className="flex items-center text-gray-500 text-xs mb-3">
        <div className="flex items-center text-orange-500 font-medium">
          ★ {rating || 'N/A'}
        </div>
        <span className="mx-1">•</span>
        <div>{numReviews || 0} reviews</div>
        <span className="mx-1">•</span>
        <div>{orders || 0} sold</div>
      </div>

      {/* Price Tiers */}
    {priceRanges?.length > 0 ? (
  <div className="grid grid-cols-3 gap-0 mb-4 text-center text-xs border border-gray-300 rounded">
    {priceRanges.map((range, index) => {
      // Set background color based on index (or use range.color if available)
      let bgClass = '';
      let textColor = '';
      if (index === 0) {
        bgClass = 'bg-red-100';
        textColor = 'text-red-700';
      } else if (index === 1) {
        bgClass = 'bg-orange-100';
        textColor = 'text-orange-700';
      } else {
        bgClass = 'bg-yellow-100';
        textColor = 'text-yellow-700';
      }

      return (
        <div
          key={index}
          className={`${bgClass} ${textColor} p-2 font-semibold border-r border-gray-300 last:border-r-0`}
        >
          <div className="text-base font-bold">${range.price}</div>
          {range.quantityRange || `${range.minQty} - ${range.maxQty} pcs`}
        </div>
      );
    })}
  </div>
) : (
  <div className="mb-4 text-base font-bold text-gray-900">${price || 'N/A'}</div>
)}


      {/* Product Info */}
      <div className="text-gray-700 text-xs leading-5">
        {/* Row: Price */}
        <div className="grid grid-cols-[80px_1fr] gap-x-2 py-1">
          <span className="font-medium">Price:</span>
          <span>{negotiablePrice ? 'Negotiable' : `$${price}`}</span>
        </div>
        <div className="border-t border-gray-200 my-1"></div>

        {/* Row: Type */}
        <div className="grid grid-cols-[80px_1fr] gap-x-2 py-1">
          <span className="font-medium">Condition:</span>
          <span>{condition || 'N/A'}</span>
        </div>

        {/* Row: Material */}
        <div className="grid grid-cols-[80px_1fr] gap-x-2 py-1">
          <span className="font-medium">Material:</span>
          <span>{material || 'N/A'}</span>
        </div>

        {/* Row: Design */}
        <div className="grid grid-cols-[80px_1fr] gap-x-2 py-1">
          <span className="font-medium">Design:</span>
          <span>{design || 'N/A'}</span>
        </div>

        <div className="border-t border-gray-200 my-1"></div>

        {/* Row: Customization */}
        <div className="grid grid-cols-[80px_1fr] gap-x-2 py-1">
          <span className="font-medium">Customization:</span>
          <span>
            {customization?.logo || customization?.packaging
              ? [
                  customization.logo ? 'Logo' : null,
                  customization.packaging ? 'Packaging' : null,
                ]
                  .filter(Boolean)
                  .join(', ')
              : 'Not available'}
          </span>
        </div>

        <div className="border-t border-gray-200 my-1"></div>

        {/* Row: Protection */}
        <div className="grid grid-cols-[80px_1fr] gap-x-2 py-1">
          <span className="font-medium">Protection:</span>
          <span>
            {protection?.refundPolicy ? 'Refund Policy' : 'No protection'}
          </span>
        </div>

        {/* Row: Warranty */}
        <div className="grid grid-cols-[80px_1fr] gap-x-2 py-1">
          <span className="font-medium">Warranty:</span>
          <span>{warranty || 'No warranty'}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
