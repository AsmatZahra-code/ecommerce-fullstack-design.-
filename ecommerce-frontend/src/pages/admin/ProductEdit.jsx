import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    brand: "",
    category: "",
    supplier: "",
    images: [],
  });

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchProductAndOptions = async () => {
      try {
        const [productRes, categoryRes, supplierRes] = await Promise.all([
          axios.get(`/api/products/${id}`),
          axios.get("/api/category"),
          axios.get("/api/suppliers"),
        ]);

        const product = productRes.data;

        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price || 0,
          countInStock: product.countInStock || 0,
          brand: product.brand || "",
          category: product.category?._id || "",
          supplier: product.supplier?._id || "",
          images: product.images || [],
        });

        setCategories(categoryRes.data?.data || categoryRes.data || []);
        setSuppliers(supplierRes.data?.data || supplierRes.data || []);
      } catch (err) {
        console.error("Failed to fetch product or dropdowns", err);
      }
    };

    fetchProductAndOptions();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const base64Files = await Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    );
    setFormData((prev) => ({ ...prev, images: base64Files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/admin/products");
    } catch (err) {
      console.error("Failed to update product", err);
      alert("Update failed. Check console for details.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Name"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Description"
        ></textarea>
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Price"
        />
        <input
          name="countInStock"
          type="number"
          value={formData.countInStock}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Stock"
        />
        <input
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Brand"
        />

        {/* Category Dropdown */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Category</option>
          {Array.isArray(categories) &&
            categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>

        {/* Supplier Dropdown */}
        <select
          name="supplier"
          value={formData.supplier}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Supplier</option>
          {Array.isArray(suppliers) &&
            suppliers.map((sup) => (
              <option key={sup._id} value={sup._id}>
                {sup.name}
              </option>
            ))}
        </select>

        {/* File Upload */}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
