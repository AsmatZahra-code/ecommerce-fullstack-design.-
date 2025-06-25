// // import React from 'react';
// // import { FaGoogle, FaFacebookF } from 'react-icons/fa';

// // const SignIn = () => {
// //   return (
    
// //     <div className="min-h-screen flex items-center justify-center bg-cover bg-center
// //     "style={{ backgroundImage: "url('/src/components/InquiryForm/Mask group.png')" }}>
       

// //       <div className="bg-white w-full max-w-sm rounded-lg shadow-md p-6">
        

// //         {/* Sign In Heading */}
// //         <h2 className="text-xl font-bold text-indigo-600 font-sans mb-6">Sign In</h2>

// //         {/* Email Field */}
// //         <div className="mb-4">
// //           <label className="block text-sm font-medium text-gray-700">Email *</label>
// //           <input
// //             type="email"
// //             placeholder="Enter your email"
// //             className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //           />
// //         </div>

// //         {/* Password Field */}
// //         <div className="mb-4">
// //           <label className="block text-sm font-medium text-gray-700">Password *</label>
// //           <input
// //             type="password"
// //             placeholder="Enter your password"
// //             className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //           />
// //         </div>

// //         {/* Forgot Password */}
// //         <div className="mb-4 text-right">
// //           <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
// //         </div>

// //         {/* Sign In Button */}
// //         <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
// //           Sign In
// //         </button>

// //         {/* Sign Up Link */}
// //         <p className="mt-4 text-center text-sm text-gray-600">
// //           Not Registered? <a href="#" className="text-indigo-600 hover:underline">Sign Up</a>
// //         </p>

// //         {/* Social Login Divider */}
// //         <div className="my-4 border-t pt-4 text-center text-sm text-gray-500">
// //           Or continue with social account
// //         </div>

// //         {/* Social Buttons */}
// //         <div className="flex justify-center gap-4">
// //           <button className="p-2 border rounded-full hover:bg-gray-100 transition">
// //             <FaGoogle className="text-red-500" />
// //           </button>
// //           <button className="p-2 border rounded-full hover:bg-gray-100 transition">
// //             <FaFacebookF className="text-blue-600" />
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SignIn;
// import React, { useState } from 'react';
// import { FaGoogle, FaFacebookF } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { signInUser } from '../utils/api'; // adjust path if needed

// const SignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSignIn = async (e) => {
//     e.preventDefault();

//     const response = await signInUser({ email, password });

//     if (response?.token) {
//       // Save token and user info in localStorage
//       localStorage.setItem("token", response.token);
//       localStorage.setItem("user", JSON.stringify(response.user));

//       // Redirect to home or profile page
//       navigate("/");
//     } else {
//       alert(response?.message || "Login failed");
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center"
//       style={{ backgroundImage: "url('/src/components/InquiryForm/Mask group.png')" }}
//     >
//       <div className="bg-white w-full max-w-sm rounded-lg shadow-md p-6">
//         {/* Sign In Heading */}
//         <h2 className="text-xl font-bold text-indigo-600 font-sans mb-6">Sign In</h2>

//         <form onSubmit={handleSignIn}>
//           {/* Email Field */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Email *</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               required
//               className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div>

//           {/* Password Field */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Password *</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               required
//               className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div>

//           {/* Forgot Password */}
//           <div className="mb-4 text-right">
//             <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
//           </div>

//           {/* Sign In Button */}
//           <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
//             Sign In
//           </button>
//         </form>

//         {/* Sign Up Link */}
//         <p className="mt-4 text-center text-sm text-gray-600">
//           Not Registered? <a href="/signup" className="text-indigo-600 hover:underline">Sign Up</a>
//         </p>

//         {/* Social Login Divider */}
//         <div className="my-4 border-t pt-4 text-center text-sm text-gray-500">
//           Or continue with social account
//         </div>

//         {/* Social Buttons */}
//         <div className="flex justify-center gap-4">
//           <button className="p-2 border rounded-full hover:bg-gray-100 transition">
//             <FaGoogle className="text-red-500" />
//           </button>
//           <button className="p-2 border rounded-full hover:bg-gray-100 transition">
//             <FaFacebookF className="text-blue-600" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
import React, { useState } from 'react';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { signInUser } from '../utils/api'; // adjust if needed

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const response = await signInUser({ email, password });

    if (response?.token) {
      // Save token and user info to localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      // Redirect based on role or isAdmin
      if (response.user.isAdmin || response.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/"); // or "/"
      }
    } else {
      alert(response?.message || "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/src/components/InquiryForm/Mask group.png')" }}
    >
      <div className="bg-white w-full max-w-sm rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-indigo-600 font-sans mb-6">Sign In</h2>

        <form onSubmit={handleSignIn}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Forgot Password */}
          <div className="mb-4 text-right">
            <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
          </div>

          {/* Sign In Button */}
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Not Registered? <a href="/signup" className="text-indigo-600 hover:underline">Sign Up</a>
        </p>

        {/* Social Login Divider */}
        <div className="my-4 border-t pt-4 text-center text-sm text-gray-500">
          Or continue with social account
        </div>

        {/* Social Buttons */}
        <div className="flex justify-center gap-4">
          <button className="p-2 border rounded-full hover:bg-gray-100 transition">
            <FaGoogle className="text-red-500" />
          </button>
          <button className="p-2 border rounded-full hover:bg-gray-100 transition">
            <FaFacebookF className="text-blue-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
