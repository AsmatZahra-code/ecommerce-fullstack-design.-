
import React, { useState,useEffect } from 'react';
import {
  fetchDataFromApi,
} from '../../utils/api.js';
const Sidebar_MainContent = () => {

  const [data,setData]=useState([]);
  useEffect(()=>{
    fetchDataFromApi("/api/product").then((res)=>{
      setData(res);
    })
  },[])
  const categories = [
    'Mobile accessory',
    'Electronics',
    'Smartphones',
    'Modern tech',
    'See all',
  ];
const [featuresList, setFeaturesList] = useState([
    { name: "Wireless", checked: false },
    { name: "Bluetooth", checked: false },
    { name: "Waterproof", checked: false },
    { name: "Noise Cancelling", checked: false },
    "See all",
  ]);
  const brands = [
    { name: 'Samsung', checked: false },
    { name: 'Apple', checked: true },
    { name: 'Huawei', checked: false },
    { name: 'Pocoo', checked: false },
    { name: 'Lenovo', checked: false },
    'See all',
  ];

  const products = [
    {
      id: 1,
      name: 'Canon Camera EOS 2000, Black 10x zoom',
      price: 998.00,
      originalPrice: 1128.00,
      rating: 7.5,
      orders: 154,
      shipping: 'Free Shipping',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: '/src/components/BlockItemsGroup/assets/OrangeWPMobile33.PNG',
    },
    {
      id: 2,
      name: 'GoPro HERO6 4K Action Camera - Black',
      price: 998.00,
      originalPrice: null,
      rating: 7.5,
      orders: 154,
      shipping: 'Free Shipping',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: '/src/components/SaleSection/assets/camera_28.PNG',
    },
    {
      id: 3,
      name: 'Modern Smartphone Pro X',
      price: 799.00,
      originalPrice: 899.00,
      rating: 8.2,
      orders: 210,
      shipping: 'Free Shipping',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      image: '/src/components/SaleSection/assets/mobile_23.PNG',
    },
    {
      id: 4,
      name: 'Ultra Slim Laptop 13"',
      price: 1299.00,
      originalPrice: 1499.00,
      rating: 8.9,
      orders: 95,
      shipping: 'Free Shipping',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: '/src/components/SaleSection/assets/Laptop_34.PNG',
    },
    {
      id: 5,
      name: 'Smartwatch Series 7',
      price: 249.00,
      originalPrice: null,
      rating: 7.8,
      orders: 320,
      shipping: 'Free Shipping',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      image: '/src/components/SaleSection/assets/SmartWatch_35.PNG',
    },
    {
      id: 6,
      name: 'Premium Wireless Headphones',
      price: 199.00,
      originalPrice: 249.00,
      rating: 8.5,
      orders: 180,
      shipping: 'Free Shipping',
      description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.',
      image: '/src/components/SaleSection/assets/headphones_29.PNG',
    },
    {
      id: 7,
      name: 'Premium Wireless Headphones',
      price: 199.00,
      originalPrice: 249.00,
      rating: 8.5,
      orders: 180,
      shipping: 'Free Shipping',
      description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.',
      image: '/src/components/SaleSection/assets/headphones_29.PNG',
    },
    {
      id: 8,
      name: 'Premium Wireless Headphones',
      price: 199.00,
      originalPrice: 249.00,
      rating: 8.5,
      orders: 180,
      shipping: 'Free Shipping',
      description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.',
      image: '/src/components/SaleSection/assets/SmartWatch_35.PNG',
    },
  ];
  const conditions = [
    { label: 'Any', value: 'any' },
    { label: 'Refurbished', value: 'refurbished' },
    { label: 'Brand new', value: 'brand_new' },
    { label: 'Old items', value: 'old_items' },
  ];

  const [localBrands, setLocalBrands] = useState(brands);
  const [isListView, setIsListView] = useState(false); // New state for toggling view
  const [minPrice, setMinPrice] = useState('');
   const [maxPrice, setMaxPrice] = useState('');
    const [selectedCondition, setSelectedCondition] = useState('any');
  const [selectedRatings, setSelectedRatings] = useState([]);

   // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const handleFeatureChange = (index) => {
    const updatedFeatures = [...featuresList];
    if (typeof updatedFeatures[index] === "object") {
      updatedFeatures[index].checked = !updatedFeatures[index].checked;
      setFeaturesList(updatedFeatures);
    }
  };

  const handleBrandChange = (index) => {
    const updatedBrands = [...localBrands];
    // Toggle checked state, but avoid toggling "See all" if it's a string
    if (typeof updatedBrands[index] !== 'string') {
      updatedBrands[index].checked = !updatedBrands[index].checked;
    }
    setLocalBrands(updatedBrands);
  };
 const handleRatingChange = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };
   const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        ))}
        {hasHalfStar && (
          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd"></path>
            <path className="text-gray-300" fillRule="evenodd" d="M10 2a1 1 0 011 1v1h4a1 1 0 110 2h-4v2h4a1 1 0 110 2h-4v2h4a1 1 0 110 2h-4v1a1 1 0 11-2 0v-1H5a1 1 0 01-1-1v-4a1 1 0 011-1h5v-1a1 1 0 01-1-1h-5a1 1 0 01-1-1V3a1 1 0 011-1h7z" clipRule="evenodd" transform="translate(-10 0)"></path>
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        ))}
      </div>
    );
   };
   // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  // const totalPages = Math.ceil(products.length / itemsPerPage);
const currentProducts = data.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="bg-slate-50 min-h-screen py-6 px-4 md:px-24 ">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Sidebar */}
        <aside className="md:w-1/4 lg:w-1/5  p-6 rounded-lg shadow-sm">
          {/* Category Section */}
          <div className="mb-6 pb-4 border-b border-gray-200">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Category</h3>
            <ul>
              {categories.map((category, index) => (
                <li key={index} className="mb-2">
                  <a href="#" className="text-gray-700 hover:text-blue-600 rounded-md py-1 px-2 transition-colors duration-200 block">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands Section */}
          <div className="mb-6 pb-4 border-b border-gray-200">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Brands</h3>
            <ul>
              {localBrands.map((brand, index) => (
                <li key={index} className="mb-2">
                  {typeof brand === 'string' ? ( // Check if it's "See all"
                    <a href="#" className="text-gray-700 hover:text-blue-600 rounded-md py-1 px-2 transition-colors duration-200 block">
                      {brand}
                    </a>
                  ) : (
                    <label className="flex items-center cursor-pointer text-gray-700 hover:text-blue-600">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600 rounded mr-2 focus:ring-blue-500"
                        checked={brand.checked}
                        onChange={() => handleBrandChange(index)}
                      />
                      {brand.name}
                    </label>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Features Section */}
         <div className="mb-6 pb-4 border-b border-gray-200">
  <h3 className="font-bold text-lg mb-4 text-gray-800">Features</h3>
  <ul>
    {featuresList.map((feature, index) => (
      <li key={index} className="mb-2">
        {typeof feature === 'string' ? ( // For "See all"
          <a
            href="#"
            className="text-gray-700 hover:text-blue-600 rounded-md py-1 px-2 transition-colors duration-200 block"
          >
            {feature}
          </a>
        ) : (
          <label className="flex items-center cursor-pointer text-gray-700 hover:text-blue-600">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600 rounded mr-2 focus:ring-blue-500"
              checked={feature.checked}
              onChange={() => handleFeatureChange(index)}
            />
            {feature.name}
          </label>
        )}
      </li>
    ))}
  </ul>
</div>
 {/* Price Range Section */}
          <div className="mb-6 pb-4 border-b border-gray-200">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Price range</h3>
            <div className="flex items-center justify-between mb-3">
              <input
                type="number"
                placeholder="Min"
                className="w-1/2 p-2 border border-gray-300 rounded-md mr-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                className="w-1/2 p-2 border border-gray-300 rounded-md ml-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm">
              Apply
            </button>
          </div>
 {/* Condition Section */}
          <div className="mb-6 pb-4 border-b border-gray-200">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Condition</h3>
            {conditions.map((condition, index) => (
              <label key={index} className="flex items-center cursor-pointer text-gray-700 hover:text-blue-600 mb-2">
                <input
                  type="radio"
                  name="condition"
                  value={condition.value}
                  checked={selectedCondition === condition.value}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="form-radio h-4 w-4 text-blue-600 rounded-full mr-2 focus:ring-blue-500"
                />
                {condition.label}
              </label>
            ))}
          </div>
           {/* Ratings Section */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800">Ratings</h3>
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center cursor-pointer text-gray-700 hover:text-blue-600 mb-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600 rounded mr-2 focus:ring-blue-500"
                  checked={selectedRatings.includes(rating)}
                  onChange={() => handleRatingChange(rating)}
                />
                {renderStars(rating)}
                <span className="ml-1 text-sm text-gray-600"> </span>
              </label>
            ))}
          </div>
        </aside>

        {/* Product Listing Content */}
        <section className="flex-1">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 bg-white p-4 rounded-lg shadow-sm">
            <span className="text-gray-700 text-sm mb-2 sm:mb-0">
              <span className="font-semibold">{data.length} items</span> in Mobile accessory
            </span>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-700 w-full sm:w-auto">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded mr-1" />
                Verified only
              </label>
              <div className="relative w-full sm:w-auto">
                <select className="block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option>Featured</option>
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
              <div className="flex space-x-1">
                {/* Grid View Button */}
                <button
                  className={`p-2 border border-gray-300 rounded-md hover:bg-gray-100 ${!isListView ? 'bg-gray-100' : ''}`}
                  onClick={() => {
                    setIsListView(false);
                    setItemsPerPage(9); // Default to 9 for grid view
                    setCurrentPage(1); // Reset to first page
                  }}
                  title="Grid View"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 9a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 13a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1zM3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
                {/* List View Button */}
                <button
                  className={`p-2 border border-gray-300 rounded-md hover:bg-gray-100 ${isListView ? 'bg-gray-100' : ''}`}
                 onClick={() => {
                    setIsListView(true);
                    setItemsPerPage(6); // Default to 6 for list view
                    setCurrentPage(1); // Reset to first page
                  }}
                  title="List View"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM11 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z"></path></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Product Cards Container - Conditional Styling */}
          <div className={isListView ? 'flex flex-col gap-4' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
            {/* {currentProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-white rounded-lg shadow-sm overflow-hidden p-4 ${
                  isListView ? 'flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6  ' : 'flex flex-col items-center'
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className={`object-contain ${isListView ? 'w-52 h-52 flex-shrink-0' : 'w-32 h-32 mb-4'}`}
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/e0e0e0/000000?text=Image+Error" }}
                />
                <div className={`text-center ${isListView ? 'sm:text-left flex-grow' : ''}`}>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {product.name}
                  </h4>
                  <p className="text-xl font-bold text-red-600 mb-1">
                    ${product.price.toFixed(2)} {product.originalPrice && <span className="text-gray-500 line-through text-sm">${product.originalPrice.toFixed(2)}</span>}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    ⭐ {product.rating} ({product.orders} orders)
                    {product.shipping && (
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full ml-2">
                        {product.shipping}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-700 mb-3 leading-tight">
                    {product.description}
                  </p>
                  <button className="text-blue-600 hover:underline text-sm font-medium">
                    View details
                  </button>
                </div>
              </div>
            ))} */}
            {currentProducts.map((product, index) => (
  <div
    key={index}
    className={`bg-white rounded-lg shadow-sm overflow-hidden p-4 ${
      isListView ? 'flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6' : 'flex flex-col items-center'
    }`}
  >
    <img
      src={product.images?.[0]}
      alt={product.name}
      className={`object-contain ${isListView ? 'w-52 h-52 flex-shrink-0' : 'w-32 h-32 mb-4'}`}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "https://placehold.co/150x150/e0e0e0/000000?text=No+Image";
      }}
    />
    <div className={`text-center ${isListView ? 'sm:text-left flex-grow' : ''}`}>
      <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
      <p className="text-xl font-bold text-red-600 mb-1">
        ${product.price.toFixed(2)}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        ⭐ {product.rating} ({product.numReviews} reviews)
        {product.countInStock > 0 && (
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full ml-2">
            In Stock
          </span>
        )}
      </p>
      <p className="text-xs text-gray-700 mb-3 leading-tight">{product.description}</p>
      <button className="text-blue-600 hover:underline text-sm font-medium">
        View details
      </button>
    </div>
  </div>
))}

          </div>
           {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <label htmlFor="itemsPerPageSelect" className="text-gray-700 text-sm">Show:</label>
              <select
                id="itemsPerPageSelect"
                className="block px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page when items per page changes
                }}
              >
                <option value="3">3</option>
                <option value="6">6</option>
                <option value="9">9</option>
                <option value="12">12</option>
              </select>
            </div>
            <nav className="flex items-center space-x-1" aria-label="Pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`p-2 border border-gray-300 rounded-md hover:bg-gray-100 ${currentPage === i + 1 ? 'bg-gray-200 font-semibold' : ''}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              </button>
            </nav>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sidebar_MainContent;
