import React, { useState } from 'react';
import SellerInfo from './SellerInfo'; // Adjust path as needed

const ProductDescription = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const recommendedProducts = [
    {
      id: 1,
      name: 'Men Blazers Sets Elegant Formal',
      price: '$7.00 - $99.50',
      image: 'src/components/SectionRecommend/assets/blueCoat_30.png',
    },
    {
      id: 2,
      name: 'Men Shirt Sleeve Polo Contrast',
      price: '$7.00 - $99.50',
      image: 'src/components/SectionRecommend/assets/hoodie.png',
    },
    {
      id: 3,
      name: 'Apple Watch Series Space Gray',
      price: '$7.00 - $99.50',
      image: 'src/components/SectionRecommend/assets/blueshirt.png',
    },
    {
      id: 4,
      name: 'Basketball Crew Socks Long Stuff',
      price: '$7.00 - $99.50',
      image: 'src/components/SectionRecommend/assets/shorts.png',
    },
    {
      id: 5,
      name: 'New Summer Men\'s castrol T-Shirts',
      price: '$7.00 - $99.50',
      image: 'src/components/SectionRecommend/assets/blueCoat_30.png',
    },
  ];

  return (
      <div className="bg-slate-50  px-4 md:px-24 pt-4">

    <div className="flex gap-6 bg-white border rounded-md  font-sans mx-auto " style={{ width: '1160px', height: '618px' }}>
      
      {/* Main Content Area */}
   
      {/* dynamic */}
 <div className="p-6 flex flex-col" style={{ width: '880px', height: '618px' }}>
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {['description', 'reviews', 'shipping', 'about-seller'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="tab-content pr-2" style={{ flex: 1 }}>
            {activeTab === 'description' && (
              <div className="text-gray-700 leading-relaxed space-y-6">
                <p>{product?.description || 'No description available.'}</p>

                {/* Technical Specifications Table */}
                <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 font-medium text-gray-600 w-1/4">Model</td>
                      <td className="px-4 py-2 text-gray-900">{product?.model || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium text-gray-600">Style</td>
                      <td className="px-4 py-2 text-gray-900">{product?.style || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium text-gray-600">Certificate</td>
                      <td className="px-4 py-2 text-gray-900">{product?.certificate || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium text-gray-600">Size</td>
                      <td className="px-4 py-2 text-gray-900">{product?.size || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium text-gray-600">Memory</td>
                      <td className="px-4 py-2 text-gray-900">{product?.memory || 'N/A'}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Features List */}
                <ul className="space-y-2 mt-4 text-gray-700">
                  {product?.features?.length > 0 ? (
                    product.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-500">No features listed.</li>
                  )}
                </ul>
              </div>
              
            )}
           {activeTab === 'about-seller' && (
  <div className="text-gray-700 leading-relaxed space-y-6">
    <h2 className="text-lg font-semibold text-gray-800">Seller Information</h2>

    <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
      <tbody className="divide-y divide-gray-200">
        <tr>
          <td className="px-4 py-2 font-medium text-gray-600 w-1/4">Name</td>
          <td className="px-4 py-2 text-gray-900">{product?.supplier?.name || 'N/A'}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 font-medium text-gray-600">Company</td>
          <td className="px-4 py-2 text-gray-900">{product?.supplier?.company || 'N/A'}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 font-medium text-gray-600">Location</td>
          <td className="px-4 py-2 text-gray-900">
            {product?.supplier?.city}, {product?.supplier?.country}
            {product?.supplier?.countryCode && (
              <img
                src={`https://flagcdn.com/w20/${product.supplier.countryCode}.png`}
                alt="flag"
                className="inline-block ml-2 w-4 h-3 object-cover"
              />
            )}
          </td>
        </tr>
        <tr>
          <td className="px-4 py-2 font-medium text-gray-600">Verified</td>
          <td className="px-4 py-2 text-gray-900">
            {product?.supplier?.isVerified ? 'Yes ✅' : 'No ❌'}
          </td>
        </tr>
        <tr>
          <td className="px-4 py-2 font-medium text-gray-600">Worldwide Shipping</td>
          <td className="px-4 py-2 text-gray-900">
            {product?.supplier?.shipping?.worldwide ? 'Available 🌍' : 'Not available'}
          </td>
        </tr>
        <tr>
          <td className="px-4 py-2 font-medium text-gray-600">Email</td>
          <td className="px-4 py-2 text-gray-900">{product?.supplier?.email || 'N/A'}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 font-medium text-gray-600">Phone</td>
          <td className="px-4 py-2 text-gray-900">{product?.supplier?.phone || 'N/A'}</td>
        </tr>
      </tbody>
    </table>
  </div>
)}
{activeTab === 'shipping' && (
  <div className="text-gray-700 leading-relaxed space-y-6">
    <h2 className="text-lg font-semibold text-gray-800">Shipping Information</h2>

    <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
      <tbody className="divide-y divide-gray-200">
        <tr>
          <td className="px-4 py-2 font-medium text-gray-600 w-1/3">Worldwide Shipping</td>
          <td className="px-4 py-2 text-gray-900">
            {product?.supplier?.shipping?.worldwide ? 'Available 🌍' : 'Not Available'}
          </td>
        </tr>
        <tr>
          <td className="px-4 py-2 font-medium text-gray-600">Estimated Processing Time</td>
          <td className="px-4 py-2 text-gray-900">1–3 business days</td>
        </tr>
        <tr>
          <td className="px-4 py-2 font-medium text-gray-600">Estimated Delivery Time</td>
          <td className="px-4 py-2 text-gray-900">5–10 business days (international)</td>
        </tr>
        <tr>
          <td className="px-4 py-2 font-medium text-gray-600">Shipping Method</td>
          <td className="px-4 py-2 text-gray-900">DHL, FedEx, Local Courier</td>
        </tr>
        <tr>
          <td className="px-4 py-2 font-medium text-gray-600">Shipping Cost</td>
          <td className="px-4 py-2 text-gray-900">Calculated at checkout</td>
        </tr>
        {product?.supplier?.shipping?.notes && (
          <tr>
            <td className="px-4 py-2 font-medium text-gray-600">Supplier Notes</td>
            <td className="px-4 py-2 text-gray-900">{product.supplier.shipping.notes}</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)}

          </div>
        </div>
      {/* "You may like" section */}
      {/* <div className="p-4 border-l border-gray-200 flex flex-col" style={{ width: '280px', height: '553px' }}>
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-indigo-500 pb-2">You may like</h3>
        <div className="space-y-4 overflow-y-auto pr-1">
          {recommendedProducts.map((product) => (
            <div key={product.id} className="flex items-center gap-3 group cursor-pointer">
              <div className="w-16 h-16 rounded-md overflow-hidden shadow border border-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/80x80/F87171/FFFFFF?text=Product";
                  }}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 group-hover:text-indigo-600 transition">{product.name}</p>
                <p className="text-xs text-gray-600">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <div className="p-4 border-l border-gray-200 flex flex-col" style={{ width: '280px', height: '553px' }}>
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-indigo-500 pb-2">You may like</h3>
          <div className="space-y-4 overflow-y-auto pr-1">
            {product?.relatedProducts?.length > 0 ? (
              product.relatedProducts.map((item, i) => (
                <div key={i} className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-16 h-16 rounded-md overflow-hidden shadow border border-gray-200">
                    <img
                      src={item.images[0] || "https://placehold.co/80x80/F87171/FFFFFF?text=Product"}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-indigo-600 transition">{item.name}</p>
                    <p className="text-xs text-gray-600">${item.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No related products.</p>
            )}
          </div>
        </div>
      
    </div>
    </div>
  );
};

export default ProductDescription;
