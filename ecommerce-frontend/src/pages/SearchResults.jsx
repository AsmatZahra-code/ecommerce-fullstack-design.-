import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
import { fetchDataFromApi } from "../utils/api.js";
import BreadCrumbNav from '../components/Navbar/BreadCrumbNav.jsx'

const SearchResults = () => {
  const { categoryName } = useParams();
  const [data, setData] = useState([]);
  const [isListView, setIsListView] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetchDataFromApi(`/api/product/by-category/${categoryName}`);
      if (Array.isArray(res)) setData(res);
      else if (res?.products) setData(res.products);
    };
    fetchProducts();
  }, [categoryName]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div >
      <Header />
      <Navbar />
<BreadCrumbNav/>
      <section className="flex-1 px-4 md:px-20 py-6 bg-gray-50">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 bg-white p-4 rounded-lg shadow-sm">
          <span className="text-gray-700 text-sm mb-2 sm:mb-0">
            <span className="font-semibold">{data.length} items</span> in {categoryName}
          </span>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-700 w-full sm:w-auto">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded mr-1" />
              Verified only
            </label>
            <div className="relative w-full sm:w-auto">
              <select className="block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm">
                <option>Featured</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
            <div className="flex space-x-1">
              <button
                className={`p-2 border border-gray-300 rounded-md hover:bg-gray-100 ${!isListView ? 'bg-gray-100' : ''}`}
                onClick={() => {
                  setIsListView(false);
                  setItemsPerPage(9);
                  setCurrentPage(1);
                }}
                title="Grid View"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM11 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
</svg>

              </button>
              <button
                className={`p-2 border border-gray-300 rounded-md hover:bg-gray-100 ${isListView ? 'bg-gray-100' : ''}`}
                onClick={() => {
                  setIsListView(true);
                  setItemsPerPage(6);
                  setCurrentPage(1);
                }}
                title="List View"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
  <path fillRule="evenodd" d="M4 6h12v2H4V6zm0 4h12v2H4v-2zm0 4h12v2H4v-2z" clipRule="evenodd" />
</svg>

              </button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className={isListView ? 'flex flex-col gap-4' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
          {currentProducts.map((product, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-sm overflow-hidden p-4 ${
                isListView
                  ? 'flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6'
                  : 'flex flex-col items-center'
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
                <p className="text-xs text-gray-700 mb-3 leading-tight">
                  {product.description}
                </p>
                <button className="text-blue-600 hover:underline text-sm font-medium">
                  View details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <label htmlFor="itemsPerPageSelect" className="text-gray-700 text-sm">Show:</label>
            <select
              id="itemsPerPageSelect"
              className="block px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none text-sm"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
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
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`p-2 border border-gray-300 rounded-md hover:bg-gray-100 ${
                  currentPage === i + 1 ? 'bg-gray-200 font-semibold' : ''
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              →
            </button>
          </nav>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SearchResults;
