import React from 'react';
import bgImage from './mask_group.png'; 
const InquirySection = () => {
  return (
     <div className="bg-slate-50 pt-6 px-4 md:px-24  ">
       <div className="mx-auto w-full lg:w-[1180px] border border-gray-200 rounded-md overflow-hidden">
    <section className=" py-8 px-4 md:px-24  relative overflow-hidden">
      {/* Background Image (adjust path as needed) */}
      <img
        src={bgImage}// Placeholder: Replace with your actual background image
        alt="Warehouse background"
        className="absolute inset-0 w-full h-full object-cover " // Adjust opacity for desired dimming
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1920x400/3b82f6/ffffff?text=Background+Image+Not+Found"; }}
      />

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-6xl flex flex-col lg:flex-row lg:items-start lg:justify-between gap-14">
  {/* Text Block */}
  <div className="text-white w-full lg:w-1/2  text-left ">
    <h2 className="text-3xl md:text-4xl font-bold md:mb-4 leading-tight">
      An easy way to send
      <br />
      requests to all suppliers
    </h2>
    <p className="hidden md:block text-blue-100 text-lg">
      Lorem ipsum dolor sit amet, consectetur adipisicing<br></br>
      elit, sed do eiusmod tempor incididunt.
    </p>
  </div>

        {/* Right Section: Inquiry Form */}
        <div className="hidden md:block bg-white p-6 md:p-8 rounded-lg shadow-lg lg:w-1/2 w-full max-w-md">
          <h3 className="text-xl font-semibold text-black mb-6">Send quote to suppliers</h3>
          <form className="space-y-4">
            {/* What item you need? */}
            <div>
              <label htmlFor="item-needed" className="sr-only">What item you need?</label>
              <input
                type="text"
                id="item-needed"
                name="item-needed"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                placeholder="What item you need?"
              />
            </div>

            {/* Type more details */}
            <div>
              <label htmlFor="more-details" className="sr-only">Type more details</label>
              <textarea
                id="more-details"
                name="more-details"
                rows="2"
                className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Type more details"
              ></textarea>
            </div>

            {/* Quantity and Pcs dropdown */}
            <div className="flex items-center gap-2 ">
              <div > 
                <label htmlFor="quantity" className="sr-only">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  className="w-full px-4 py-2 border text-black  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Quantity"
                />
              </div>
              <div>
                <label htmlFor="unit" className="sr-only">Unit</label>
                <select
                  id="unit"
                  name="unit"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Pcs</option>
                  <option>Kg</option>
                  <option>Meters</option>
                  <option>Liters</option>
                </select>
              </div>
            </div>

            {/* Send inquiry button */}
            <button
              type="submit"
              className="px-4 bg-blue-600 text-white font-semibold py-2.5 rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
              Send inquiry
            </button>
          </form>
        </div>
         {/* Only button for mobile */}
  <div className="block md:hidden">
    <button
      type="submit"
      className=" px-4 bg-blue-600 text-white font-semibold py-2.5 rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
    >
      Send inquiry
    </button>
  </div>
      </div>
    </section>
    </div>
    </div>
  );
};

export default InquirySection;
