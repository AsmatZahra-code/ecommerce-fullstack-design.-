import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ProductListing" element={<ProductListing />} />
          <Route path="/ProductDetails" element={<ProductDetails />} />
          <Route path="/Cart" element={<Cart />} />

          {/* Add more routes here */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
