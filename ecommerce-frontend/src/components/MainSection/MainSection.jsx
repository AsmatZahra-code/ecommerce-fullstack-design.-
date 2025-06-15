import React from "react";

const MainSection = () => {
  return (
    <section className=" bg-slate-50 py-6 px-4 md:px-24">
      {/* Main container: flex-col on small screens, flex-row on large. Full width on small, fixed on large. Height auto on small, fixed on large. */}
      <div className="container mx-auto flex flex-col lg:flex-row bg-white  rounded-md gap-4 p-4 lg:p-6 w-full h-auto lg:w-[1180px] lg:h-[400px] border border-gray-200">
        {/* Left Side Menu (Categories): Hidden on small screens, block on large screens */}
        <article className="hidden lg:block w-[250px] h-[360px] pr-4 pt-0 pb-0">
          <ul>
            {[
              "Automobiles",
              "Clothes and wear",
              "Home interiors",
              "Computer and tech",
              "Tools, equipments",
              "Sports and outdoor",
              "Animal and pets",
              "Machinery tools",
              "More category",
            ].map((category, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`block px-3 py-2 rounded-md transition duration-200
                    ${
                      category === "Automobiles"
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </article>

        {/* Central Banner Image Section: Full width on small screens, fixed width on large screens */}
        <article className="w-full lg:w-[670px] h-[360px] relative lg:mr-5 overflow-hidden">
          <figure className="w-full h-full">
            <img
              src="/src/components/MainSection/assets/banner-board.PNG"
              alt="banner image"
              className="w-full h-full object-cover object-bottom-right"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/900x400/E0F2F7/2C5282?text=Banner+Image+Fallback";
              }}
            />
          </figure>
          {/* Text Overlay on Banner (text color adjusted for visibility on the image, if not already set) */}
          <div className="absolute inset-0 flex flex-col justify-center items-start p-6 text-black bg-black bg-opacity-20">
             <h2 className="text-xl lg:text-2xl mb-1 text-black">
              Latest trending
            </h2>
            <h1 className="text-4xl lg:text-3xl font-bold mb-6">
              Electronic items
            </h1>
            <button className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300">
              Learn more
            </button>
          </div>
        </article>

        {/* Right Promotional Content Section: Hidden on small screens, flex on large screens */}
        <aside className="hidden lg:flex flex-col gap-3 w-[210px]">
          {/* User Profile Card */}
          <div className="bg-blue-100 p-2 rounded-md flex flex-col gap-2 w-[200px] h-[150px]">
            <div className="flex items-center gap-3">
              <img src="/src/components/MainSection/assets/Avatar.PNG" alt="User Avatar" />
              <div>
                <p className="text-gray-800 font-semibold text-lg">Hi, user</p>
                <p className="text-gray-600 text-sm">let's get started</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-0 rounded-md hover:bg-primary transition duration-300 w-[180px] h-[29px] text-center">
              Join now
            </button>
            <button className="bg-white text-blue-600 border border-gray-300 px-4 py-1 rounded-md font-semibold hover:bg-gray-100 transition duration-300 w-[180px] h-[29px]">
              Log In
            </button>
          </div>

          {/* Promotional Card 1 */}
          <div className="bg-orangeCustom px-4 py-2 rounded-md text-white w-[200px] h-[95px]">
            <p className="text-lg leading-tight">
              Get $US ten off
              <br />
              with a new
              <br />
              supplier
            </p>
          </div>

          {/* Promotional Card 2 */}
          <div className="bg-tealCustom px-4 py-2 rounded-md text-white w-[200px] h-[95px]">
            <p className="text-lg leading-tight">
              Send quotes with<br /> supplier<br /> preferences
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default MainSection;