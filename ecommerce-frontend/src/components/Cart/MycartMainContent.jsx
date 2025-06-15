import React, { useState } from "react";
import {
  ShoppingBag,
  ArrowLeft,
  Trash2,
  Heart,
  CreditCard,
  LifeBuoy,
  Truck,
  Save,
  ShoppingCart,
} from "lucide-react";

const MycartMainContent = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "T-shirts with multiple colors, for men and lady",
      image: "src/components/ProductDetails/assets/grayShirt34.png",
      size: "medium",
      color: "blue",
      material: "Plastic",
      seller: "Artel Market",
      price: 78.99,
      qty: 1,
    },
    {
      id: 2,
      name: "T-shirts with multiple colors, for men and lady",
      image: "src/components/SectionRecommend/assets/schoolBag26.png",
      size: "medium",
      color: "blue",
      material: "Plastic",
      seller: "Best factory LLC",
      price: 39.0,
      qty: 3,
    },
    {
      id: 3,
      name: "T-shirts with multiple colors, for men and lady",
      image: "src/components/BlockItemsGroup/assets/lamp_094.png",
      size: "medium",
      color: "blue",
      material: "Plastic",
      seller: "Artel Market",
      price: 170.5,
      qty: 1,
    },
  ]);

  const [savedItems, setSavedItems] = useState([
    {
      id: 101,
      name: "GoPro HERO6 4K Action Camera - Black",
      image: "src/components/BlockItemsGroup/assets/whiteHeadphones_86.png",
      price: 99.5,
    },
    {
      id: 102,
      name: "GoPro HERO6 4K Action Camera - Black",
      image: "src/components/BlockItemsGroup/assets/MobileMultiWP32.png",
      price: 99.5,
    },
    {
      id: 103,
      name: "GoPro HERO6 4K Action Camera - Black",
      image: "src/components/BlockItemsGroup/assets/OrangeWPMobile33.png", // Placeholder image
      price: 99.5,
    },
    {
      id: 104,
      name: "GoPro HERO6 4K Action Camera - Black",
      image: "src/components/BlockItemsGroup/assets/OrangeWPMobile33.png", // Placeholder image
      price: 99.5,
    },
  ]);

  const calculateSubtotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const subtotal = calculateSubtotal();
  const discount = 60.0;
  const tax = 14.0;
  const total = subtotal - discount + tax;

  const handleRemoveItem = (id) =>
    setCartItems(cartItems.filter((item) => item.id !== id));
  const handleSaveForLater = (itemToSave) => {
    setCartItems(cartItems.filter((item) => item.id !== itemToSave.id));
    setSavedItems([...savedItems, itemToSave]);
  };
  const handleMoveToCart = (itemToMove) => {
    setSavedItems(savedItems.filter((item) => item.id !== itemToMove.id));
    setCartItems([...cartItems, { ...itemToMove, qty: 1 }]);
  };
  const handleQuantityChange = (id, newQty) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, newQty) } : item
      )
    );
  };
  const handleRemoveAll = () => setCartItems([]);

  return (
    <>
      {/* Cart & Order Summary Section */}
      <section className=" bg-slate-50  mx-auto py-4 md:px-24 font-inter">
        <h1 className="text-3xl font-bold py-4">
          My Cart ({cartItems.length})
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-grow lg:w-2/3">
            <div className="bg-white rounded shadow-md p-6">
              {cartItems.length === 0 ? (
                <p className="text-gray-600 text-center py-8">
                  Your cart is empty.
                </p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b last:border-b-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md mr-4 mb-4 sm:mb-0"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/80x80/E0E0E0/333333?text=Product";
                      }}
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-600 text-sm">
                        Size: {item.size}, Color: {item.color}, Material:{" "}
                        {item.material}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        Seller: {item.seller}
                      </p>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-600 text-sm flex items-center border p-2 rounded"
                        >
                          <Trash2 size={16} className="mr-1" /> Remove
                        </button>
                        <button
                          onClick={() => handleSaveForLater(item)}
                          className="text-blue-500 hover:text-blue-600 text-sm flex items-center border p-2 rounded"
                        >
                          <Save size={16} className="mr-1" /> Save for later
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end mt-4 sm:mt-0">
                      <p className="font-bold text-xl mb-2">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center space-x-2 border rounded-md">
                        <span className="text-gray-700 px-2">Qty:</span>
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-16 p-2 rounded-md text-center focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 my-6">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md flex items-center justify-center w-full sm:w-auto">
                <ArrowLeft size={20} className="mr-2" /> Back to shop
              </button>
              <button
                onClick={handleRemoveAll}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-md w-full sm:w-auto"
              >
                Remove all
              </button>
            </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 space-y-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Have a coupon?</h2>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Add coupon"
                  className="flex-grow p-3 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="hover:bg-gray-100 text-primary border border-gray-300 font-semibold py-3 px-6 rounded-r-md transition duration-300">
                  Apply
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span className="font-medium">-${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax:</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-300 pt-3 text-xl font-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-md w-full text-lg">
                Checkout
              </button>

              <div className="flex justify-center items-center mt-4 space-x-2">
                <img
                  src="https://img.icons8.com/color/48/000000/visa.png"
                  alt="Visa"
                  className="h-6 border px-1 rounded-sm"
                />
                <img
                  src="https://img.icons8.com/color/48/000000/mastercard.png"
                  alt="Mastercard"
                  className="h-6 border px-1 rounded-sm"
                />
                <img
                  src="https://img.icons8.com/fluency/48/amex.png"
                  alt="Amex"
                  className="h-6 border px-1 rounded-sm"
                />

                <img
                  src="https://img.icons8.com/fluency/48/000000/paypal.png"
                  alt="PayPal"
                  className="h-6 border px-1 rounded-sm"
                />
                <img
                  src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/applepay.svg"
                  alt="Apple Pay"
                  className="h-6 border px-1 rounded-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Boxes */}
      <section className="bg-slate-50 p-4 md:px-24 font-inter  grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
          <CreditCard size={32} className="text-blue-500 mb-3" />
          <h4 className="font-semibold text-lg mb-1">Secure payment</h4>
          <p className="text-gray-600 text-sm">
            Have you ever finally just write dummy info
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
          <LifeBuoy size={32} className="text-blue-500 mb-3" />
          <h4 className="font-semibold text-lg mb-1">Customer support</h4>
          <p className="text-gray-600 text-sm">
            Have you ever finally just write dummy info
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
          <Truck size={32} className="text-blue-500 mb-3" />
          <h4 className="font-semibold text-lg mb-1">Free delivery</h4>
          <p className="text-gray-600 text-sm">
            Have you ever finally just write dummy info
          </p>
        </div>
      </section>

      {/* Saved For Later */}
      <section className="bg-slate-50  mx-auto p-4 md:px-24 font-inter ">
        <div className="border p-4 bg-white rounded">
        <h2 className="text-2xl font-bold mb-4">Saved for later</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {savedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-contain mb-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/120x120/E0E0E0/333333?text=Product";
                }}
              />
              <h5 className="font-semibold text-md mb-2 line-clamp-2">
                {item.name}
              </h5>
              <p className="font-bold text-lg mb-3">${item.price.toFixed(2)}</p>
              <button
                onClick={() => handleMoveToCart(item)}
                className="bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium py-2 px-4 rounded-md text-sm w-full flex items-center justify-center"
              >
                <ShoppingCart size={16} className="mr-2" /> Move to cart
              </button>
            </div>
          ))}
        </div>
        </div>
      </section>
    </>
  );
};

export default MycartMainContent;
