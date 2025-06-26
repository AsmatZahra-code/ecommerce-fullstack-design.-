import React from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const SellerInfo = ({ supplier, productId, userId }) => {
  const nameInitial = supplier?.name?.charAt(0).toUpperCase() || 'S';
  const supplierName = supplier?.name || 'Unnamed Supplier';
  const companyName = supplier?.company || '';
  const city = supplier?.city || '';
  const country = supplier?.country || '';
  const countryCode = supplier?.countryCode || 'us';
  const isVerified = supplier?.isVerified ?? false;
  const shipsWorldwide = supplier?.shipping?.worldwide ?? false;

  const handleSaveToWishlist = async () => {
    if (!userId) {
      alert("You need to log in to save items to your wishlist.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Authorization token not found. Please log in.");
      return;
    }

    try {
      await axios.post(
        'http://localhost:4000/api/user/wishlist/add',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Product saved to wishlist!');
    } catch (err) {
      console.error('Error saving to wishlist', err);
      alert('Failed to save. Try again later.');
    }
  };

  return (
    <div className="w-[280px] h-[325px] bg-white mx-2 text-sm text-gray-800">
      <div className="border p-4 rounded-md">
        {/* Header */}
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded bg-teal-100 flex items-center justify-center text-teal-500 font-medium mr-3">
            {nameInitial}
          </div>
          <div>
            <p className="text-xs text-gray-500">Supplier</p>
            <h2 className="text-sm font-semibold text-gray-900 leading-tight">{supplierName}</h2>
            {companyName && <p className="text-xs text-gray-500">{companyName}</p>}
          </div>
        </div>

        {/* Seller Details */}
        <div className="mb-4 text-gray-700 text-xs">
          {/* Mobile: Horizontal layout */}
          <div className="flex flex-wrap gap-4 md:hidden">
            {(city || country) && (
              <div className="flex items-center gap-1">
                <img
                  src={`https://flagcdn.com/w20/${countryCode}.png`}
                  alt="flag"
                  className="w-4 h-3 object-cover"
                />
                <span>{country}</span>
              </div>
            )}
            {isVerified && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Verified</span>
              </div>
            )}
            {shipsWorldwide && (
              <div className="flex items-center gap-1">
                <GlobeAltIcon className="w-4 h-4 text-gray-500" />
                <span>Shipping</span>
              </div>
            )}
          </div>

          {/* Desktop: Vertical layout (original preserved) */}
          <div className="space-y-2 hidden md:block">
            {(city || country) && (
              <div className="flex items-center space-x-2">
                <img
                  src={`https://flagcdn.com/w20/${countryCode}.png`}
                  alt="flag"
                  className="w-4 h-3 object-cover"
                />
                <span>{`${city ? city + ',' : ''} ${country}`}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{isVerified ? 'Verified Seller' : 'Not Verified'}</span>
            </div>
            {shipsWorldwide && (
              <div className="flex items-center space-x-2 text-gray-700 text-sm">
                <GlobeAltIcon className="w-4 h-4 text-gray-500" />
                <span>Worldwide shipping</span>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2 mb-3">
          <button className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded hover:bg-blue-700 transition">
            Send inquiry
          </button>
          <button className="w-full border text-blue-600 text-sm font-medium py-2 rounded hover:bg-gray-200 transition">
            Seller's profile
          </button>
        </div>
      </div>

      {/* Save for later */}
      <div
        className="text-center text-blue-600 text-sm cursor-pointer hover:underline mt-4 flex items-center justify-center gap-1 font-semibold"
        onClick={handleSaveToWishlist}
      >
        <HeartIcon className="h-6 w-6" />
        Save for later
      </div>
    </div>
  );
};

export default SellerInfo;
