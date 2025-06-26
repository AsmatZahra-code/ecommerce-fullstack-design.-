import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white shadow-lg p-6">
      <h3 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">
        Admin Panel
      </h3>
      <ul className="space-y-4">
        <li>
          <Link
            to="/admin/product"
            className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors"
          >
            🛍 Products
          </Link>
        </li>
        <li>
          <Link
            to="/admin/product/create"
            className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors"
          >
            ➕ Add Product
          </Link>
        </li>
        {/* <li>
          <Link
            to="/admin/product/edit/:id"
            className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors"
          >
            ✏️ Edit Product
          </Link>
        </li> */}
        
      </ul>
    </aside>
  );
};

export default Sidebar;
