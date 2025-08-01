
import React from 'react';

// Import images
import blueshirt from './assets/blueshirt.png';
import hoodie from './assets/hoodie.png';
import blueCoat from './assets/blueCoat_30.png';
import blueBag from './assets/blueBag24.png';
import schoolBag from './assets/schoolBag26.png';
import shorts from './assets/shorts.png';
import headset from './assets/image 86.png';
import smartwatch from './assets/schoolBag26.png'; // duplicate image used
import wallet from './assets/image 90.png';
import travelBag from './assets/image 85.png';

const products = [
  { id: 1, img: blueshirt, title: "T-shirts with multiple colors, for men", price: "$10.30" },
  { id: 2, img: hoodie, title: "Jeans shorts for men blue color", price: "$10.30" },
  { id: 3, img: blueCoat, title: "Brown winter coat medium size", price: "$12.50" },
  { id: 4, img: blueBag, title: "Jeans bag for travel for men", price: "$34.00" },
  { id: 5, img: schoolBag, title: "Leather wallet", price: "$99.00" },
  { id: 6, img: shorts, title: "Canon camara black, 100x zoom", price: "$9.99" },
  { id: 7, img: headset, title: "Headset for gaming with mic", price: "$8.99" },
  { id: 8, img: smartwatch, title: "Smartwatch silver color modern", price: "$10.30" },
  { id: 9, img: wallet, title: "Blue walet for men leather material", price: "$10.30" },
  { id: 10, img: travelBag, title: "Jeans bag for travel for men", price: "$80.95" }
];

const SectionRecommend = () => {
  return (
    <div className="bg-slate-50 pt-6 px-4 md:px-24">
      <div className="mx-auto w-full lg:w-[1180px] border border-gray-200 rounded-md overflow-hidden">
        <section className="py-8 px-4 bg-gray-50">
          <h1 className="text-2xl font-semibold mb-6">Recommended items</h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((item) => (
              <div key={item.id} className="border rounded-lg bg-white shadow-sm p-2 hover:shadow-md transition">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-32 object-contain mb-2"
                />
                <p className="text-sm font-semibold">{item.price}</p>
                <p className="text-xs text-gray-500 break-words overflow-hidden h-10 leading-snug">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SectionRecommend;
