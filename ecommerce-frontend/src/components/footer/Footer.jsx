import React, { useState, useRef, useEffect } from "react";
import {
  FaShoppingBag,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaChevronUp,
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
  const toggleLanguageDropdown = () => {
    setIsLanguageOpen(!isLanguageOpen);
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
    <footer className="bg-white pt-12 pb-1  font-sans text-gray-700">
      <div className="max-w-7xl  md:px-16 mx-auto flex flex-wrap justify-between gap-8 pb-8 ">
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-[1_1_200px]">
          <div className="flex items-center mb-4">
            <img
              src="/src/components/Header/assets/logo-colored.PNG"
              alt="brand logo"
              className="h-8 md:h-10"
            />
            {/* <FaShoppingBag className="w-8 h-8 text-blue-600 mr-2 rounded-lg" />
            <span className="text-2xl font-bold text-gray-800 rounded-lg">Brand</span> */}
          </div>
          <p className="text-sm mb-4 max-w-xs rounded-lg">
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

        {/* Info Columns */}
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
            className="flex flex-col items-center md:items-start text-center md:text-left flex-none w-[120px]"
          >
            <h3 className="font-semibold text-gray-800 mb-2 rounded-lg">
              {section.title}
            </h3>
            <ul className="space-y-1 text-sm text-gray-500">
              {section.items.map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-blue-600 rounded-lg">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Get App */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-[1_1_150px]">
          <h3 className="font-semibold text-gray-800 mb-2 rounded-lg">
            Get app
          </h3>
          <div className="flex flex-col space-y-1">
            <a
  href="#"
  className="flex items-center justify-start bg-black text-white px-2 py-3 rounded-lg shadow-lg hover:bg-gray-800 transition-colors duration-200"
  style={{ minWidth: '124px' }}
>
  <FaApple className="text-4xl mr-3" />
  <div className="flex flex-col text-sm text-left">
    <span className="text-xs opacity-80">Download on the</span>
    <span className="font-semibold text-xl">App Store</span>
  </div>
</a>

             {/* Google Play Store Button */}
        <a
          href="#"
          className="flex items-center justify-center bg-black text-white px-2 py-3 rounded-lg shadow-lg hover:bg-gray-800 transition-colors duration-200"
          style={{ minWidth: '124px' }} // Ensures a consistent minimum width
        >
          {/* Google Play Font Awesome Icon */}
          {/* <i className="fab fa-google-play fa-lg mr-3"></i> */}
          <IoLogoGooglePlaystore className="text-4xl mr-3"/>
          <div className="flex flex-col text-sm text-left">
            <span className="text-xs opacity-80">GET IT ON</span>
            <span className="font-semibold text-xl">Google Play</span>
          </div>
        </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer Separated */}

      <div className="bg-slate-100 py-4 md:px-24">
        <div className=" flex flex-col sm:flex-row items-center justify-between text-md text-black px-8">
          <p className="mb-4 sm:mb-0 rounded-lg">&copy; 2023 Ecommerce.</p>
          <div>
            <div ref={lanDropdownRef} className="relative inline-block w-42 mr-12">
              <div
                className="px-3 py-2 cursor-pointer  w-full flex justify-between items-center"
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

                {/* Arrow icon */}
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
                <div className="absolute bg-white border mt-1 w-48 z-10 shadow-lg rounded ">
                  {languages.map((l) => (
                    <div
                      key={l.code}
                      onClick={() => handleLanguageSelect(l.code)}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    >
                      <img
                        src={`https://flagcdn.com/24x18/${l.code}.png`}
                        alt={`${l.name} flag`}
                        className="mr-2"
                      />
                      {l.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* <div className="relative">
            <button
              onClick={toggleLanguageDropdown}
              className="flex items-center space-x-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-haspopup="true"
              aria-expanded={isLanguageOpen}
            >
              <img
                src="https://placehold.co/20x15/fff/000?text=US"
                alt="US Flag"
                className="w-5 h-auto rounded-sm"
              />
              <span>English</span>
              <FaChevronUp
                className={`w-4 h-4 transition-transform duration-200 ${
                  isLanguageOpen ? 'rotate-0' : 'rotate-180'
                }`}
              />
            </button>
            {isLanguageOpen && (
              <div className="absolute bottom-full mb-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <ul className="py-1">
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded-lg">
                      English
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded-lg">
                      Spanish
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded-lg">
                      French
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
