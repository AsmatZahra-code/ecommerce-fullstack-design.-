import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const BreadCrumbNav = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Optional: Mapping known paths to labels
  const labelMap = {
    product: 'Product',
    category: 'Category',
    electronics: 'Electronics',
    'mens-wear': "Men's Wear",
    // Add more if needed
  };

  // Utility to format segment
  const formatSegment = (segment) => {
    const decoded = decodeURIComponent(segment);
    if (labelMap[decoded.toLowerCase()]) {
      return labelMap[decoded.toLowerCase()];
    }

    // Hide long IDs (e.g., if it's a UUID or numeric)
    if (/^\d{6,}$/.test(decoded) || decoded.length > 20) {
      return 'Details';
    }

    // Default formatting
    return decoded.charAt(0).toUpperCase() + decoded.slice(1).replace(/-/g, ' ');
  };

  return (
    <div className="bg-slate-50 mx-auto md:px-24">
      <nav className="p-3 shadow-sm">
        <ol className="flex flex-wrap items-center text-sm text-gray-600">
          <li>
            <Link to="/" className="hover:text-blue-600">Home</Link>
            {pathnames.length > 0 && <span className="mx-2 text-gray-400">/</span>}
          </li>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;

            return (
              <li key={to} className="flex items-center">
                <Link
                  to={to}
                  className={`hover:text-blue-600 ${isLast ? 'font-semibold text-gray-800 pointer-events-none' : ''}`}
                >
                  {formatSegment(value)}
                </Link>
                {!isLast && <span className="mx-2 text-gray-400">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumbNav;
