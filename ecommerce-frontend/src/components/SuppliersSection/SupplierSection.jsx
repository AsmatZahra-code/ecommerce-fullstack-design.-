import React from 'react';
import ae from '../../assets/flags/arabic-emirates.png';
import au from '../../assets/flags/au.png';
import us from '../../assets/flags/us.png';
import ru from '../../assets/flags/ru.png';
import it from '../../assets/flags/it.png';
import dk from '../../assets/flags/dk.png';
import fr from '../../assets/flags/france.png';
import cn from '../../assets/flags/cn.png';
import gb from '../../assets/flags/britian.png';

const suppliers = [
  { id: 1, country: 'Arabic Emirates', url: 'shopname.ae', flag: ae },
  { id: 2, country: 'Australia', url: 'shopname.au', flag: au },
  { id: 3, country: 'United States', url: 'shopname.us', flag: us },
  { id: 4, country: 'Russia', url: 'shopname.ru', flag: ru },
  { id: 5, country: 'Italy', url: 'shopname.it', flag: it },
  { id: 6, country: 'Denmark', url: 'denmark.com.dk', flag: dk },
  { id: 7, country: 'France', url: 'shopname.fr', flag: fr },
  { id: 8, country: 'Arabic Emirates', url: 'shopname.ae', flag: ae },
  { id: 9, country: 'China', url: 'shopname.as', flag: cn },
  { id: 10, country: 'Great Britain', url: 'shopname.co.uk', flag: gb },
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
