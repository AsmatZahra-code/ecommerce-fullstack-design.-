import React from 'react';

const Banner = () => {
  return (
    <div className="bg-slate-50  px-4 md:px-24 pb-20">
    <div className=" relative bg-blue-600 text-white p-6 md:p-8 rounded-md  overflow-hidden max-w-full mx-auto   ">
      {/* Background grid lines for visual resemblance */}
      <div className="absolute inset-0 grid grid-cols-10 opacity-20 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="border-r border-blue-400"></div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-2">
            Super discount on more than 100 USD
          </h2>
          <p className="text-sm sm:text-base opacity-90">
            Have you ever finally just write dummy info
          </p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75 w-full md:w-auto">
          Shop now
        </button>
      </div>
    </div>
    </div>
  );
};

export default Banner;
