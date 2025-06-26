import React, { useState, useRef, useEffect } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaApple,
} from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";

const languages = [
  { label: "English", code: "us" },
  { label: "Español", code: "eu" },
  { label: "Français", code: "eu" },
  { label: "Deutsch", code: "eu" },
  { label: "中文", code: "cn" },
  { label: "عربى", code: "sa" },
  { label: "日本語", code: "jp" },
  { label: "हिंदी", code: "in" },
];

const Footer = () => {
  const [selectedLan, setSelectedLan] = useState("us");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const lanDropdownRef = useRef(null);

  const handleLanguageSelect = (code) => {
    setSelectedLan(code);
    setIsLanguageOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        lanDropdownRef.current &&
        !lanDropdownRef.current.contains(event.target)
      ) {
        setIsLanguageOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <footer className="bg-white pt-12 pb-1 font-sans text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6  lg:px-8  flex flex-col md:flex-row md:flex-wrap justify-between gap-8 pb-8">
        {/* Brand Section */}
        <div className="order-1 flex flex-col items-center md:items-start text-center md:text-left flex-[1_1_200px] ml-8">
          <div className="flex items-center mb-4">
            <img
              src="/src/components/Header/assets/logo-colored.PNG"
              alt="brand logo"
              className="h-8 md:h-10"
            />
          </div>
          <p className="text-sm mb-4 max-w-xs">
            Best information about the company goes here but now lorem ipsum is
          </p>
          <div className="flex space-x-3">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube].map(
              (Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center bg-gray-400 hover:bg-gray-500 text-white rounded-full transition-colors duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            )}
          </div>
        </div>

        {/* Info Columns - Grid for small screens */}
        <div className="order-2 grid grid-cols-2 gap-6 sm:gap-8 md:flex md:flex-wrap">
          {[
            {
              title: "About",
              items: ["About Us", "Find store", "Categories", "Blogs"],
            },
            {
              title: "Partnership",
              items: ["About Us", "Find store", "Categories", "Blogs"],
            },
            {
              title: "Information",
              items: ["Help Center", "Money Refund", "Shipping", "Contact us"],
            },
            {
              title: "For users",
              items: ["Login", "Register", "Settings", "My Orders"],
            },
          ].map((section, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-[120px]"
            >
              <h3 className="font-semibold text-gray-800 mb-2">
                {section.title}
              </h3>
              <ul className="space-y-1 text-sm text-gray-500">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-blue-600">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* App Download Section */}
        <div className="order-3 flex flex-col items-center md:items-start text-center md:text-left flex-[1_1_150px]">
          <h3 className="font-semibold text-gray-800 mb-2">Get app</h3>
          <div className="flex flex-col space-y-2">
            <a
              href="#"
              className="flex items-center justify-start bg-black text-white px-2 py-3 rounded-lg shadow-lg hover:bg-gray-800 transition-colors duration-200"
              style={{ minWidth: "124px" }}
            >
              <FaApple className="text-4xl mr-3" />
              <div className="flex flex-col text-sm text-left">
                <span className="text-xs opacity-80">Download on the</span>
                <span className="font-semibold text-xl">App Store</span>
              </div>
            </a>

            <a
              href="#"
              className="flex items-center justify-start bg-black text-white px-2 py-3 rounded-lg shadow-lg hover:bg-gray-800 transition-colors duration-200"
              style={{ minWidth: "124px" }}
            >
              <IoLogoGooglePlaystore className="text-4xl mr-3" />
              <div className="flex flex-col text-sm text-left">
                <span className="text-xs opacity-80">GET IT ON</span>
                <span className="font-semibold text-xl">Google Play</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-slate-100 py-4 px-4 sm:px-6 lg:px-24">
        <div className="flex flex-col sm:flex-row items-center justify-between text-md text-black">
          <p className="mb-4 sm:mb-0">&copy; 2023 Ecommerce.</p>
          <div ref={lanDropdownRef} className="relative inline-block w-42">
            <div
              className="px-3 py-2 cursor-pointer w-full flex justify-between items-center"
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            >
              <div className="flex items-center">
                {selectedLan ? (
                  <div className="flex items-center space-x-2">
                    <img
                      src={`https://flagcdn.com/24x18/${selectedLan}.png`}
                      alt="flag"
                      className="inline w-5 h-4"
                    />
                    <span className="text-sm font-medium">
                      {languages.find((l) => l.code === selectedLan)?.label}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">
                    Select Language
                  </span>
                )}
              </div>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  isLanguageOpen ? "rotate-180" : ""
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
            {isLanguageOpen && (
              <div className="absolute bg-white border mt-1 w-48 z-10 shadow-lg rounded">
                {languages.map((l) => (
                  <div
                    key={l.code}
                    onClick={() => handleLanguageSelect(l.code)}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  >
                    <img
                      src={`https://flagcdn.com/24x18/${l.code}.png`}
                      alt={`${l.label} flag`}
                      className="mr-2"
                    />
                    {l.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
