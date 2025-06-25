// import React, { useState } from "react";
// import { FaUser, FaShoppingCart, FaBars, FaTimes, FaSearch, FaHeart } from "react-icons/fa";
// import { MdMessage } from "react-icons/md";
// import { useNavigate } from "react-router-dom";

// export const Header = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//  const navigate = useNavigate();
//   return (
//     <div className="relative">
//       {/* Main Header Row */}
//       <div className="flex items-center justify-between py-4 border-b-2 border-gray-200 px-4 md:px-24 relative z-10 bg-white">
//         {/* Left Section (Hamburger Menu + Brand Logo) */}
//         <div className="flex items-center">
//           {/* Hamburger menu for mobile only */}
//           <div className="md:hidden mr-4">
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="text-gray-600 focus:outline-none"
//             >
//               {isMobileMenuOpen ? (
//                 <FaTimes className="text-2xl" />
//               ) : (
//                 <FaBars className="text-2xl" />
//               )}
//             </button>
//           </div>

//           {/* Brand Logo */}
//           <div>
//             <img
//               src="/src/components/Header/assets/logo-colored.PNG"
//               alt="brand logo"
//               className="h-8 md:h-10"
//             />
//           </div>
//         </div>

//         {/* Desktop Search Bar */}
//         <div className="hidden md:block border-2 border-primary rounded-lg h-fit pl-2 w-85">
//           <form className="flex">
//             <input
//               className="w-1/2 pr-11 mr-20 outline-none"
//               type="text"
//               placeholder="Search"
//             />
//             <select className="space-x-0 border-l-2 border-primary p-2 outline-none">
//               <option value="all">All Categories</option>
//               <option value="electronics">Electronics</option>
//               <option value="fashion">Fashion</option>
//               <option value="home">Home</option>
//               <option value="books">Books</option>
//               <option value="toys">Toys</option>
//             </select>
//             <button type="submit">
//               <img
//                 className="h-full"
//                 src="/src/components/Header/assets/btn-group.PNG"
//                 alt="Search"
//               />
//             </button>
//           </form>
//         </div>

//         {/* Right Section (Action Items) */}
//         <div className="flex items-center">
//           {/* Mobile Icons */}
//           <div className="flex md:hidden space-x-4 items-center">
//             <FaShoppingCart className="text-2xl text-gray-600" />
//             <FaUser className="text-2xl text-gray-600" />
//           </div>

//           {/* Desktop Icons */}
//           <div className="hidden md:flex justify-center">
//             <ul className="flex space-x-6">
//               <li className="flex flex-col items-center text-gray-500 cursor-pointer" onClick={() => navigate("/SignIn")}>
//                 <FaUser className="text-xl mb-1" />
//                 <span>Profile</span>
//               </li>
//               <li className="flex flex-col items-center text-gray-500">
//                 <a href="#" className="flex flex-col items-center">
//                   <MdMessage className="text-xl mb-1" />
//                   <span>Message</span>
//                 </a>
//               </li>
//               <li className="flex flex-col items-center text-gray-500">
//                 <a href="#" className="flex flex-col items-center">
//                   <FaHeart className="text-xl mb-1" />
//                   <span>Orders</span>
//                 </a>
//               </li>
//               <li className="flex flex-col items-center text-gray-500">
//                 <a href="/Cart" className="flex flex-col items-center">
//                   <FaShoppingCart className="text-xl mb-1" />
//                   <span>My cart</span>
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Search Bar */}
//       <div className="md:hidden px-4 py-3 border-b-2 border-gray-200 bg-white z-10 relative">
//         <div className="border-2 border-gray-300 rounded-lg h-fit pl-2 w-full flex items-center">
//           <FaSearch className="text-gray-400 mr-2" />
//           <input
//             className="flex-grow outline-none py-2"
//             type="text"
//             placeholder="Search"
//           />
//         </div>
//       </div>
// {/* Mobile Dropdown Menu */}
// {/* Mobile Dropdown Menu */}
// {isMobileMenuOpen && (
//   <div className="absolute left-4 top-12 w-48 bg-white z-30 p-6 shadow-lg border rounded-lg md:hidden">
//     <ul className="flex flex-col space-y-6">
//       <li className="flex items-center text-gray-700">
//        <FaUser
//               className="text-2xl text-gray-600 cursor-pointer"
//               onClick={() => navigate("/SignIn")}
//             />
//         <span>Profile</span>
//       </li>
//       <li className="flex items-center text-gray-700">
//         <MdMessage className="text-xl mr-3" />
//         <span>Message</span>
//       </li>
//       <li className="flex items-center text-gray-700">
//         <FaHeart className="text-xl mr-3" />
//         <span>Orders</span>
//       </li>
//       <li className="flex items-center text-gray-700">
//         <FaShoppingCart className="text-xl mr-3" />
//         <span>My cart</span>
//       </li>
//     </ul>
//   </div>
// )}

//     </div>
//   );
// };

// export default Header;
import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaSearch,
  FaHeart,
} from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin");
  };

  const goToDashboardOrProfile = () => {
    if (user?.isAdmin || user?.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/profile");
    }
  };

  return (
    <div className="relative">
      {/* Main Header Row */}
      <div className="flex items-center justify-between py-4 border-b-2 border-gray-200 px-4 md:px-24 relative z-10 bg-white">
        {/* Left Section */}
        <div className="flex items-center">
          <div className="md:hidden mr-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 focus:outline-none"
            >
              {isMobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
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
          <form className="flex">
            <input
              className="w-1/2 pr-11 mr-20 outline-none"
              type="text"
              placeholder="Search"
            />
            <select className="space-x-0 border-l-2 border-primary p-2 outline-none">
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
              <option value="books">Books</option>
              <option value="toys">Toys</option>
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

        {/* Right Section */}
        <div className="flex items-center">
          {/* Mobile Icons */}
          <div className="flex md:hidden space-x-4 items-center">
            <FaShoppingCart className="text-2xl text-gray-600" />
            <FaUser
              className="text-2xl text-gray-600 cursor-pointer"
              onClick={() => (user ? goToDashboardOrProfile() : navigate("/signin"))}
            />
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex justify-center">
            <ul className="flex space-x-6 items-center">
              <li className="relative text-gray-500 cursor-pointer">
                <div
                  className="flex flex-col items-center"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <FaUser className="text-xl mb-1" />
                  <span>{user ? user.name || user.email : "Profile"}</span>
                </div>

                {/* Dropdown */}
                {user && showDropdown && (
                  <div className="absolute right-0 mt-2 bg-white border shadow-lg rounded w-40 text-sm z-30">
                    <button
                      onClick={goToDashboardOrProfile}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      {user.role === "admin" || user.isAdmin ? "Admin Panel" : "My Profile"}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
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
        <div className="border-2 border-gray-300 rounded-lg h-fit pl-2 w-full flex items-center">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            className="flex-grow outline-none py-2"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-4 top-12 w-48 bg-white z-30 p-6 shadow-lg border rounded-lg md:hidden">
          <ul className="flex flex-col space-y-6">
            <li
              className="flex items-center text-gray-700 cursor-pointer"
              onClick={() => (user ? goToDashboardOrProfile() : navigate("/signin"))}
            >
              <FaUser className="text-xl mr-3" />
              <span>{user ? "Profile" : "Sign In"}</span>
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
              <FaShoppingCart className="text-xl mr-3" />
              <span>My cart</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
