import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";

import ProductList from "./pages/admin/ProductList";
import ProductCreate from "./pages/admin/ProductCreate";
import ProductEdit from "./pages/admin/ProductEdit";
import AdminLayout from "./Layout/AdminLayout";

import RequireAdmin from "./components/Admin/RequireAdmin";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
           {/* Public Routes */}
    <Route path="/" element={<Home />} />
    <Route path="/ProductListing" element={<ProductListing />} />
    <Route path="/ProductDetails/:id" element={<ProductDetails />} />
    <Route path="/Cart" element={<Cart />} />
    <Route path="/signIn" element={<SignIn />} />
    <Route path="/signUp" element={<SignUp />} />

    {/* Admin Routes */}
    <Route path="/admin" element={<AdminLayout />}>
      <Route path="products" element={<ProductList />} />
      <Route path="products/create" element={<ProductCreate />} />
      <Route path="products/edit/:id" element={<ProductEdit />} />
    </Route>         {/* Add more routes here */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
