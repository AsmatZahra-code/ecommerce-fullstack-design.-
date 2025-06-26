
import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Trash2,
  Save,
  ArrowLeft,
  CreditCard,
  LifeBuoy,
  Truck,
} from "lucide-react";
import {
  fetchWishlist,
  fetchCart,
  removeFromWishlist,
  addToCart,
  removeFromCart,addToWishlist
} from "../../utils/api";

const MycartMainContent = () => {
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getInitialData = async () => {
      const wishlist = await fetchWishlist(token);
      if (Array.isArray(wishlist)) setSavedItems(wishlist);

      const cart = await fetchCart(token);
      if (cart && Array.isArray(cart.cartItems)) {
        const formattedCartItems = cart.cartItems
          .filter((item) => item.product)
          .map((item) => ({
            id: item.product._id,
            name: item.product.name,
            image: item.product.images?.[0] || "",
            size: item.selectedSize || "Default",
            color: item.selectedColor || "Default",
            material: item.product.material || "N/A",
            seller: item.product.supplier?.name || "Unknown",
            price: item.priceAtTime,
            qty: item.quantity,
          }));
        setCartItems(formattedCartItems);
      }
    };
    getInitialData();
  }, []);

  const calculateSubtotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const subtotal = calculateSubtotal();
  const discount = 60.0;
  const tax = 14.0;
  const total = subtotal - discount + tax;

  const handleRemoveItem = async (id) => {
    try {
      await removeFromCart(id, token);
      setCartItems(cartItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // const handleSaveForLater = async (itemToSave) => {
  //   try {
  //     await removeFromCart(itemToSave.id, token);
  //     setCartItems(cartItems.filter((item) => item.id !== itemToSave.id));
  //     setSavedItems([...savedItems, itemToSave]);
  //   } catch (error) {
  //     console.error("Error saving for later:", error);
  //   }
  // };
  const handleSaveForLater = async (itemToSave) => {
  try {
    // 1. Remove from cart in DB
    await removeFromCart(itemToSave.id, token);

    // 2. Add to wishlist in DB
    await addToWishlist({ productId: itemToSave.id }, token);

    // 3. Update frontend states
    setCartItems(cartItems.filter((item) => item.id !== itemToSave.id));
    setSavedItems([...savedItems, itemToSave]);
  } catch (error) {
    console.error("Error saving for later:", error);
  }
};


  const handleMoveToCart = async (item) => {
    try {
      await removeFromWishlist(item._id || item.id, token);

      const itemToAdd = {
        product: item._id || item.id,
        quantity: 1,
        selectedColor: item.selectedColor || "Default",
        selectedSize: item.selectedSize || "Default",
        priceAtTime: item.price || 0,
        seller: item.supplier || undefined,
      };

      await addToCart(itemToAdd, token);

      setSavedItems((prev) =>
        prev.filter((i) => i._id !== item._id && i.id !== item.id)
      );
    } catch (error) {
      console.error("Error moving to cart:", error);
    }
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
      <section className="bg-slate-50 mx-auto py-4 md:px-24 font-inter">
        <h1 className="text-3xl font-bold py-4">My Cart ({cartItems.length})</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow lg:w-2/3">
            <div className="bg-white rounded shadow-md p-6">
              {cartItems.length === 0 ? (
                <p className="text-gray-600 text-center py-8">Your cart is empty.</p>
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
                        e.target.src = "https://placehold.co/80x80";
                      }}
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-600 text-sm">
                        Size: {item.size}, Color: {item.color}, Material: {item.material}
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
                            handleQuantityChange(item.id, parseInt(e.target.value))
                          }
                          className="w-16 p-2 rounded-md text-center"
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
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

          <div className="lg:w-1/3 space-y-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Have a coupon?</h2>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Add coupon"
                  className="flex-grow p-3 border border-gray-300 rounded-l-md"
                />
                <button className="border border-gray-300 font-semibold py-3 px-6 rounded-r-md">
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
            </div>
          </div>
        </div>
      </section>

      {/* Info Boxes */}
      <section className="bg-slate-50 p-4 md:px-24 font-inter grid grid-cols-1 md:grid-cols-3 gap-6">
        {[CreditCard, LifeBuoy, Truck].map((Icon, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
          >
            <Icon size={32} className="text-blue-500 mb-3" />
            <h4 className="font-semibold text-lg mb-1">Info Title</h4>
            <p className="text-gray-600 text-sm">Have you ever finally just write dummy info</p>
          </div>
        ))}
      </section>

      {/* Saved For Later */}
      <section className="bg-slate-50 mx-auto p-4 md:px-24 font-inter">
        <div className="border p-4 bg-white rounded">
          <h2 className="text-2xl font-bold mb-4">Saved for later</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {savedItems.map((item) => (
              <div
                key={item._id || item.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center"
              >
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="w-32 h-32 object-contain mb-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/120x120";
                  }}
                />
                <h5 className="font-semibold text-md mb-2 line-clamp-2">
                  {item.name}
                </h5>
                <p className="font-bold text-lg mb-3">${item.price?.toFixed(2)}</p>
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
