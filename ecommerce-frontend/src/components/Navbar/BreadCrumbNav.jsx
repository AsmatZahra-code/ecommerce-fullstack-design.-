import React from 'react'

const BreadCrumbNav = () => {
    const breadcrumbs = [
    { label: 'Home', href: '#' },
    { label: 'Clothings', href: '#' },
    { label: "Men's wear", href: '#' },
    { label: 'Summer clothing', href: '#' },
  ];
  return (
   <div className="bg-slate-50 mx-auto   md:px-24">
         {/* Breadcrumb Navigation */}
      <nav className=" p-3  shadow-sm ">
        <ol className="flex flex-wrap items-center text-sm text-gray-600">
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="flex items-center">
              <a
                href={crumb.href}
                className={`hover:text-blue-600 ${
                  index === breadcrumbs.length - 1 ? 'font-semibold text-gray-800 pointer-events-none' : ''
                }`}
              >
                {crumb.label}
              </a>
              {index < breadcrumbs.length - 1 && (
                <span className="mx-2 text-gray-400">/</span>
              )}
            </li>
          ))}
        </ol>
      </nav></div>
    
  )
}

export default BreadCrumbNav