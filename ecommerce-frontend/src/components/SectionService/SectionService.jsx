// import React from 'react';

// const services = [
//   {
//     id: 1,
//     img: '/src/components/SectionService/assets/image 108.png',
//     iconImg: '/src/components/SectionService/assets/icons/search.png',
//     title: 'Source from\nIndustry Hubs',
//   },
//   {
//     id: 2,
//     img: '/src/components/SectionService/assets/multiBG.png',
//     iconImg: '/src/components/SectionService/assets/icons/inventory_2.png',
//     title: 'Customize\nYour Products',
//   },
//   {
//     id: 3,
//     img: '/src/components/SectionService/assets/AeroPlaneBG.png',
//     iconImg: '/src/components/SectionService/assets/icons/send.png',
//     title: 'Fast, reliable shipping\nby ocean or air',
//   },
//   {
//     id: 4,
//     img: '/src/components/SectionService/assets/ManBG.png',
//     iconImg: '/src/components/SectionService/assets/icons/security.png',
//     title: 'Product monitoring\nand inspection',
//   },
// ];

// const SectionService = () => {
//   return (
//     <div className="bg-slate-50 py-8 px-4 md:px-24">
//       <div className="mx-auto w-full lg:w-[1180px] ">
//         <h2 className="text-2xl font-semibold mb-6">Our extra services</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ">
//           {services.map((service) => (
//             <div
//               key={service.id}
//               className="overflow-hidden bg-white shadow-sm hover:shadow-md transition border border-gray-200 rounded-md "
//             >
//               <div className="relative">
//                 <img
//                   src={service.img}
//                   alt={service.title}
//                   className="w-full h-28 object-cover opacity-100 "
//                 />
//                 <img
//                   src={service.iconImg}
//                   alt="icon"
//                   className="absolute -bottom-6 right-2 w-12 h-12 bg-blue-100 p-3 rounded-full border-2 border-white "
//                 />
//               </div>
//               <div className="p-4">
//                 <p className="text-sm font-medium whitespace-pre-line">
//                   {service.title}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SectionService;
import React from 'react';

// Main images
import img1 from './assets/image 108.png';
import img2 from './assets/multiBG.png';
import img3 from './assets/AeroPlaneBG.png';
import img4 from './assets/ManBG.png';

// Icon images
import icon1 from './assets/icons/search.png';
import icon2 from './assets/icons/inventory_2.png';
import icon3 from './assets/icons/send.png';
import icon4 from './assets/icons/security.png';

const services = [
  {
    id: 1,
    img: img1,
    iconImg: icon1,
    title: 'Source from\nIndustry Hubs',
  },
  {
    id: 2,
    img: img2,
    iconImg: icon2,
    title: 'Customize\nYour Products',
  },
  {
    id: 3,
    img: img3,
    iconImg: icon3,
    title: 'Fast, reliable shipping\nby ocean or air',
  },
  {
    id: 4,
    img: img4,
    iconImg: icon4,
    title: 'Product monitoring\nand inspection',
  },
];

const SectionService = () => {
  return (
    <div className="bg-slate-50 py-8 px-4 md:px-24">
      <div className="mx-auto w-full lg:w-[1180px]">
        <h2 className="text-2xl font-semibold mb-6">Our extra services</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="overflow-hidden bg-white shadow-sm hover:shadow-md transition border border-gray-200 rounded-md"
            >
              <div className="relative">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-28 object-cover opacity-100"
                />
                <img
                  src={service.iconImg}
                  alt="icon"
                  className="absolute -bottom-6 right-2 w-12 h-12 bg-blue-100 p-3 rounded-full border-2 border-white"
                />
              </div>
              <div className="p-4">
                <p className="text-sm font-medium whitespace-pre-line">
                  {service.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionService;
