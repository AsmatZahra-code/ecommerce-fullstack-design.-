import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import ProductList from "./pages/admin/ProductList";
import ProductCreate from "./pages/admin/ProductCreate";
import ProductEdit from "./pages/admin/ProductEdit";
import AdminLayout from "./Layout/AdminLayout";
import SearchResults from "./pages/SearchResults";
// import RequireAdmin from "./components/Admin/RequireAdmin";
import { AuthProvider,useAuth } from './context/AuthContext'; // 👈 import
const App = () => {
  return (
    <div>
        <AuthProvider> {/* ✅ Wrap the app with AuthProvider */}
      <Router>
        <Routes>
           {/* Public Routes */}
    <Route path="/" element={<Home />} />
    <Route path="/ProductListing" element={<ProductListing />} />
    <Route path="/ProductDetails/:id" element={<ProductDetails />} />
    <Route path="/Cart" element={<Cart />} />
    <Route path="/signIn" element={<SignIn />} />
    <Route path="/signUp" element={<SignUp />} />
     <Route path="/search/category/:categoryName" element={<SearchResults />} />

    {/* Admin Routes */}
    <Route path="/admin" element={<AdminLayout />}>
      <Route path="product" element={<ProductList />} />
      <Route path="product/create" element={<ProductCreate />} />
      <Route path="product/edit/:id" element={<ProductEdit />} />
    </Route>         {/* Add more routes here */}
        </Routes>
      </Router>
         </AuthProvider>
    </div>
  );
};

export default App;
