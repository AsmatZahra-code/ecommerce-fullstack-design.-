import React from 'react';

const Newsletter = () => {
  return (
    <section className="bg-gray-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 rounded-lg">
          Subscribe on our newsletter
        </h1>
        {/* Sub-paragraph */}
        <p className="text-base sm:text-lg text-gray-600 mb-6 rounded-lg">
          Get daily news on upcoming offers from many suppliers all over the world
        </p>

        {/* Newsletter Subscription Form */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Email Input Field */}
          <div className="relative w-full sm:w-80">
            <input
              type="email"
              placeholder="Email"
              aria-label="Email address for newsletter subscription"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
            {/* Email Icon (Inline SVG for simplicity) */}
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>

          {/* Subscribe Button */}
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            onClick={() => console.log('Subscribe clicked!')} // Placeholder for subscription logic
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
