import React from 'react';

const suppliers = [
  { id: 1, country: 'Arabic Emirates', url: 'shopname.ae', flag: '/src/components/SuppliersSection/assets/ArabicEmirates.png' },
  { id: 2, country: 'Australia', url: 'shopname.au', flag: '/src/components/SuppliersSection/assets/AU.png' },
  { id: 3, country: 'United States', url: 'shopname.us', flag: '/src/components/SuppliersSection/assets/US.png' },
  { id: 4, country: 'Russia', url: 'shopname.ru', flag: '/src/components/SuppliersSection/assets/RU.png' },
  { id: 5, country: 'Italy', url: 'shopname.it', flag: '/src/components/SuppliersSection/assets/IT.png' },
  { id: 6, country: 'Denmark', url: 'denmark.com.dk', flag: '/src/components/SuppliersSection/assets/DK.png' },
  { id: 7, country: 'France', url: 'shopname.fr', flag: '/src/components/SuppliersSection/assets/France.png' },
  { id: 8, country: 'Arabic Emirates', url: 'shopname.ae', flag: '/src/components/SuppliersSection/assets/ArabicEmirates.png' },
  { id: 9, country: 'China', url: 'shopname.as', flag: '/src/components/SuppliersSection/assets/CN.png' },
  { id: 10, country: 'Great Britain', url: 'shopname.co.uk', flag: '/src/components/SuppliersSection/assets/Britian.png' },
];

const SupplierSection = () => {
  return (
    <div className="bg-slate-50 py-8 px-4 md:px-24">
      <div className="mx-auto w-full lg:w-[1180px]">
        <h2 className="text-2xl font-semibold mb-6">Suppliers by region</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="flex items-center gap-2">
              <img
                src={supplier.flag}
                alt={supplier.country}
                className="w-7 h-5 object-cover"
              />
              <div>
                <p className="text-sm">{supplier.country}</p>
                <p className="text-xs text-gray-500">{supplier.url}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplierSection;
