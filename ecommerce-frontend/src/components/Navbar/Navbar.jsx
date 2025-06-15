import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa"; // Import FaBars icon

const countries = [
  { name: "United States", code: "us" },
  { name: "United Kingdom", code: "gb" },
  { name: "India", code: "in" },
  { name: "Japan", code: "jp" },
  { name: "Germany", code: "de" },
  { name: "France", code: "fr" },
  { name: "Canada", code: "ca" },
  { name: "Australia", code: "au" },
];
const locales = [
  { label: "English, USD", value: "en-us" },
  { label: "Español, EUR", value: "es-eu" },
  { label: "Français, EUR", value: "fr-eu" },
  { label: "Deutsch, EUR", value: "de-eu" },
  { label: "中文, CNY", value: "zh-cn" },
  { label: "عربى, SAR", value: "ar-sa" },
  { label: "日本語, JPY", value: "ja-jp" },
  { label: "हिंदी, INR", value: "hi-in" },
];
const helpOptions = [
  { label: "Help", value: "help" },
  { label: "Payment", value: "payment" },
  { label: "Delivery", value: "delivery" },
];

// Sample category data with subcategories
const categories = [
  {
    name: "Electronics",
    subcategories: [
      { name: "Smartphones" },
      { name: "Laptops" },
      { name: "Cameras" },
      { name: "Headphones" },
    ],
  },
  {
    name: "Computers",
    subcategories: [
      { name: "Desktops" },
      { name: "Monitors" },
      { name: "Keyboards" },
      { name: "Mice" },
    ],
  },
  {
    name: "Smart Home",
    subcategories: [
      { name: "Smart Lighting" },
      { name: "Smart Speakers" },
      { name: "Security Cameras" },
    ],
  },
  { name: "Art & Crafts" },
  { name: "Automotive" },
  {
    name: "Fashion",
    subcategories: [
      { name: "Men's Apparel" },
      { name: "Women's Apparel" },
      { name: "Footwear" },
      { name: "Accessories" },
    ],
  },
  { name: "Books & Media" },
  { name: "Software" },
  { name: "Sports & Outdoors" },
  { name: "Beauty & Personal care" },
];

const Navbar = () => {
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countryDropdownRef = useRef(null);

  const [selectedLocale, setSelectedLocale] = useState(locales[0]);
  const [isLocaleDropdownOpen, setIsLocaleDropdownOpen] = useState(false);
  const localeDropdownRef = useRef(null);

  const [selectedHelp, setSelectedHelp] = useState(helpOptions[0]);
  const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState(false);
  const helpDropdownRef = useRef(null);

  // State for "All category" desktop dropdown
  const [isAllCategoryDropdownOpen, setIsAllCategoryDropdownOpen] = useState(false);
  const allCategoryDropdownRef = useRef(null);
  // State to track which subcategory dropdown is open
  const [openSubcategory, setOpenSubcategory] = useState(null);

  const handleLocaleSelect = (locale) => {
    setSelectedLocale(locale);
    setIsLocaleDropdownOpen(false);
  };

  const handleCountrySelect = (code) => {
    setSelectedCountry(code);
    setIsCountryDropdownOpen(false);
  };
  const handleHelpSelect = (option) => {
    setSelectedHelp(option);
    setIsHelpDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
      }
      if (localeDropdownRef.current && !localeDropdownRef.current.contains(event.target)) {
        setIsLocaleDropdownOpen(false);
      }
      if (helpDropdownRef.current && !helpDropdownRef.current.contains(event.target)) {
        setIsHelpDropdownOpen(false);
      }
      if (allCategoryDropdownRef.current && !allCategoryDropdownRef.current.contains(event.target)) {
        setIsAllCategoryDropdownOpen(false);
        setOpenSubcategory(null); // Close subcategories when main dropdown closes
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="py-2 border-b-2 border-gray-200 px-4 md:px-24">
      {/* Mobile Scrollable Category List - Visible on small screens (up to md breakpoint) */}
      <div className="overflow-x-auto whitespace-nowrap scrollbar-hide py-2 md:hidden">
        <ul className="inline-flex space-x-2">
          <li>
            <button className="px-4 py-2 rounded-md bg-gray-200 text-primary">All category</button>
          </li>
          <li>
            <button className="px-4 py-2 rounded-md bg-gray-200 text-primary">Gadgets</button>
          </li>
          <li>
            <button className="px-4 py-2 rounded-md bg-gray-200 text-primary">Clothes</button>
          </li>
          <li>
            <button className="px-4 py-2 rounded-md bg-gray-200 text-primary">Accessories</button>
          </li>
          <li>
            <button className="px-4 py-2 rounded-md bg-gray-200 text-primary">Electronics</button>
          </li>
          <li>
            <button className="px-4 py-2 rounded-md bg-gray-200 text-primary">Books</button>
          </li>
          <li>
            <button className="px-4 py-2 rounded-md bg-gray-200 text-primary">Sports</button>
          </li>
          <li>
            <button className="px-4 py-2 rounded-md bg-gray-200 text-primary">Home Decor</button>
          </li>
        </ul>
      </div>

      {/* Desktop Navigation List and Dropdowns - Visible on md screens and larger (including iPads) */}
      <div className="hidden md:flex justify-between items-center w-full">
        {/* Left Section: All Category Dropdown and Main Nav Links */}
        <div className="flex items-center gap-4"> {/* Container for All Category and nav links */}
          {/* "All category" dropdown for desktop */}
          <div className="relative inline-block" ref={allCategoryDropdownRef}>
            <button
              onClick={() => setIsAllCategoryDropdownOpen(!isAllCategoryDropdownOpen)}
              className="px-2 py-2 flex items-center rounded-md font-semibold"
            >
              <FaBars className="text-xl mr-2" />
              <span>All category</span>
            </button>
            {isAllCategoryDropdownOpen && (
              <div className="absolute bg-white border mt-2 w-64 z-20 shadow-lg rounded">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className="relative"
                    onMouseEnter={() => setOpenSubcategory(category.name)}
                    onMouseLeave={() => setOpenSubcategory(null)}
                  >
                    <div className="px-6 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                      {category.name}
                      {category.subcategories && category.subcategories.length > 0 && (
                        <svg
                          className="w-4 h-4 text-gray-500 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7" // Right arrow icon
                          />
                        </svg>
                      )}
                    </div>
                    {category.subcategories && category.subcategories.length > 0 && openSubcategory === category.name && (
                      <div className="absolute left-full top-0 bg-white border mt-0  w-64 z-30 shadow-lg rounded-b">
                        {category.subcategories.map((sub) => (
                          <div key={sub.name} className="px-6 py-2 hover:bg-gray-100 cursor-pointer">
                            {sub.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Main Desktop Nav Links */}
          <ul className="flex gap-4 font-semibold py-2">
            <li>
              <a href="#">Hot offers</a>
            </li>
            <li>
              <a href="#">Gift boxes</a>
            </li>
            <li>
              <a href="#">Projects</a>
            </li>
            <li>
              <a href="#">Menu item</a>
            </li>
            <li>
              <div className="relative inline-block" ref={helpDropdownRef}>
                <div
                  className="px-3 cursor-pointer bg-white min-w-[80px] flex justify-between items-center"
                  onClick={() => setIsHelpDropdownOpen(!isHelpDropdownOpen)}
                >
                  <span className="font-semibold">{selectedHelp.label}</span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      isHelpDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {isHelpDropdownOpen && (
                  <div className="absolute bg-white border mt-1 w-full z-10 shadow-lg rounded min-w-max">
                    {helpOptions.map((option) => (
                      <div
                        key={option.value}
                        onClick={() => handleHelpSelect(option)}
                        className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${
                          selectedHelp.value === option.value ? "font-bold" : ""
                        }`}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>

        {/* Right Section: Language/Currency and Ship To Dropdowns */}
        <div className="flex gap-4">
          {/* Language/Currency dropdown */}
          <div>
            <div ref={localeDropdownRef} className="relative inline-block w-42">
              <div
                className="px-3 py-2 cursor-pointer bg-white w-full justify-between flex items-center"
                onClick={() => setIsLocaleDropdownOpen(!isLocaleDropdownOpen)}
              >
                <span className="font-semibold mr-2">{selectedLocale.label}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    isLocaleDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {isLocaleDropdownOpen && (
                <div className="absolute bg-white border mt-1 w-48 z-10 shadow-lg rounded">
                  {locales.map((locale) => (
                    <div
                      key={locale.value}
                      onClick={() => handleLocaleSelect(locale)}
                      className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${
                        selectedLocale.value === locale.value ? "font-bold" : ""
                      }`}
                    >
                      {locale.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Ship To */}
          <div>
            <div ref={countryDropdownRef} className="relative inline-block w-42">
              <div
                className="px-3 py-2 cursor-pointer bg-white w-full flex justify-between items-center"
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
              >
                <div className="flex items-center">
                  {selectedCountry ? (
                    <span className="font-semibold">
                      {" "}
                      Ship To
                      <img
                        src={`https://flagcdn.com/24x18/${selectedCountry}.png`}
                        alt="flag"
                        className="inline ml-3 mr-2"
                      />
                    </span>
                  ) : (
                    "Ship To:"
                  )}
                </div>

                {/* Arrow icon */}
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    isCountryDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Dropdown List */}
              {isCountryDropdownOpen && (
                <div className="absolute bg-white border mt-1 w-48 z-10 shadow-lg rounded ">
                  {countries.map((c) => (
                    <div
                      key={c.code}
                      onClick={() => handleCountrySelect(c.code)}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    >
                      <img
                        src={`https://flagcdn.com/24x18/${c.code}.png`}
                        alt={`${c.name} flag`}
                        className="mr-2"
                      />
                      {c.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;