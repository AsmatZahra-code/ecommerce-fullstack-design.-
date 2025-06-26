
import React, { useState, useEffect, useRef } from "react";
import {
  FaUser,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaSearch,
  FaHeart,
} from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { useNavigate,useLocation } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Load user from localStorage

   useEffect(() => {
    const pathParts = location.pathname.split("/");
    if (pathParts[1] === "search" && pathParts[2] === "category") {
      const query = decodeURIComponent(pathParts[3] || "");
      setSearchTerm(query);
      setSelectedCategory(query);
    }
  }, [location.pathname]);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetchDataFromApi("/api/category");
      if (Array.isArray(response)) {
        setCategories(response);
      } else if (response?.data) {
        setCategories(response.data);
      }
    };
    fetchCategories();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    if (user) {
      setShowProfileDropdown((prev) => !prev);
    } else {
      navigate("/SignIn");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/SignIn");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = selectedCategory || searchTerm.trim();
    if (query) {
      navigate(`/search/category/${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between py-4 border-b-2 border-gray-200 px-4 md:px-24 relative z-10 bg-white">
        {/* Logo + Hamburger */}
        <div className="flex items-center">
          <div className="md:hidden mr-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>

          <div>
            <img
              src="/src/components/Header/assets/logo-colored.PNG"
              alt="brand logo"
              className="h-8 md:h-10"
            />
          </div>
          
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:block border-2 border-primary rounded-lg h-fit pl-2 w-85">
          <form className="flex" onSubmit={handleSearch}>
             <input
              className="w-1/2 pr-11 mr-20 outline-none"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedCategory(""); // Clear dropdown if manually typing
              }}
            />
            <select
              className="space-x-0 border-l-2 border-primary outline-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button type="submit">
              <img
                className="h-full"
                src="/src/components/Header/assets/btn-group.PNG"
                alt="Search"
              />
            </button>
          </form>
        </div>

        {/* Action Icons */}
        <div className="flex items-center">
           {/* Mobile Icons */}
         <div className="flex md:hidden space-x-4 items-center">
           <FaShoppingCart className="text-2xl text-gray-600" />
           <FaUser className="text-2xl text-gray-600" />
          </div>
          <div className="hidden md:flex justify-center relative">
            <ul className="flex space-x-6 items-center">
              <li
                className="flex flex-col items-center text-gray-500 cursor-pointer relative"
                onClick={handleProfileClick}
              >
                <FaUser className="text-xl mb-1" />
                <span>Profile</span>
                {showProfileDropdown && user && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-10 right-0 bg-white shadow-md border rounded-md px-4 py-3 z-50 w-48 text-sm"
                  >
                    <p className="font-semibold">{user.name}</p>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="text-red-500 hover:underline mt-1"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
              <li className="flex flex-col items-center text-gray-500">
                <MdMessage className="text-xl mb-1" />
                <span>Message</span>
              </li>
              <li className="flex flex-col items-center text-gray-500">
                <FaHeart className="text-xl mb-1" />
                <span>Orders</span>
              </li>
              <li className="flex flex-col items-center text-gray-500">
                <a href="/Cart" className="flex flex-col items-center">
                  <FaShoppingCart className="text-xl mb-1" />
                  <span>My cart</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 py-3 border-b-2 border-gray-200 bg-white z-10 relative">
        <form
          onSubmit={handleSearch}
          className="border-2 border-gray-300 rounded-lg h-fit pl-2 w-full flex items-center"
        >
          <FaSearch className="text-gray-400 mr-2" />
          <input
            className="flex-grow outline-none py-2"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-4 top-12 w-48 bg-white z-30 p-6 shadow-lg border rounded-lg md:hidden">
          <ul className="flex flex-col space-y-6">
            <li
              className="flex items-center text-gray-700 cursor-pointer"
              onClick={handleProfileClick}
            >
              <FaUser className="text-xl mr-3" />
              <span>Profile</span>
            </li>
            <li className="flex items-center text-gray-700">
              <MdMessage className="text-xl mr-3" />
              <span>Message</span>
            </li>
            <li className="flex items-center text-gray-700">
              <FaHeart className="text-xl mr-3" />
              <span>Orders</span>
            </li>
            <li className="flex items-center text-gray-700">
              <a href="/Cart" className="flex items-center">
                <FaShoppingCart className="text-xl mr-3" />
                <span>My cart</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
 {/* Mobile Icons */}
//           <div className="flex md:hidden space-x-4 items-center">
//             <FaShoppingCart className="text-2xl text-gray-600" />
//             <FaUser className="text-2xl text-gray-600" />
//           </div>