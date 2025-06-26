// src/pages/admin/ProductList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDataFromApi, deleteData  } from "../../utils/api"; // Adjust path based on your structure
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const data = await fetchDataFromApi("/api/product");

    if (Array.isArray(data)) {
      setProducts(data);
    } else {
      console.error("Products response is not an array", data);
      setProducts([]); // Prevents .map() crash
    }
  };

  // const deleteProduct = async (id) => {
  //   try {
  //     await axios.delete(`/api/products/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     fetchProducts(); // Refresh list after deletion
  //   } catch (error) {
  //     console.error("Error deleting product:", error);
  //   }
  // };
const deleteProduct = async (id) => {
  const result = await deleteData(`/api/product/${id}`, localStorage.getItem("token"));
  
  if (result?.success) {
    fetchProducts(); // Refresh after deletion
  } else {
    console.error("Failed to delete product:", result?.message || result);
  }
};
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📦 Product List</h2>
        <Link
          to="/admin/product/create"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          ➕ Add New Product
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-200 text-xs uppercase font-medium">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) &&
              products.map((p) => (
                <tr
                  key={p._id}
                  className="border-b hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-4 py-3">{p.name}</td>
                  <td className="px-4 py-3">Rs. {p.price}</td>
                  <td className="px-4 py-3">{p.countInStock}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <Link
                      to={`/admin/product/edit/${p._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center px-4 py-6">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
