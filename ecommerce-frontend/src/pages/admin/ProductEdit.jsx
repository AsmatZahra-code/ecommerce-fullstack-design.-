import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDataFromApi, postData } from "../../utils/api";
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
    negotiablePrice: false,
    isFeatured: false,
    availabilityStatus: "In Stock",
    condition: "New",
    features: [],
    tags: [],
    material: "",
    design: "",
    warranty: "",
    customization: {
      logo: false,
      packaging: false,
    },
    protection: {
      refundPolicy: false,
    },
    size: "",
    memory: "",
  });

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", color: "", image: null, description: "" });
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newSupplier, setNewSupplier] = useState({ name: "", company: "", country: "", city: "", email: "", phone: "" });
  const [showNewSupplierInput, setShowNewSupplierInput] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await fetchDataFromApi(`/api/product/${id}`);
        const categoriesData = await fetchDataFromApi("/api/category");
        const suppliersData = await fetchDataFromApi("/api/supplier");

        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price || 0,
          countInStock: product.countInStock || 0,
          brand: product.brand || "",
          category: product.category?._id || "",
          supplier: product.supplier?._id || "",
          images: product.images || [],
          negotiablePrice: product.negotiablePrice || false,
          isFeatured: product.isFeatured || false,
          availabilityStatus: product.availabilityStatus || "In Stock",
          condition: product.condition || "New",
          features: product.features || [],
          tags: product.tags || [],
          material: product.material || "",
          design: product.design || "",
          warranty: product.warranty || "",
          customization: product.customization || { logo: false, packaging: false },
          protection: product.protection || { refundPolicy: false },
          size: product.size || "",
          memory: product.memory || "",
        });

        setCategories(categoriesData?.data || categoriesData || []);
        setSuppliers(suppliersData?.data || suppliersData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("customization.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        customization: { ...prev.customization, [field]: checked },
      }));
    } else if (name.includes("protection.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        protection: { ...prev.protection, [field]: checked },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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

  const handleAddNewCategory = async () => {
    try {
      if (!newCategory.image) return alert("Please select an image.");

      const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(newCategory.image);
      });

      const payload = {
        name: newCategory.name,
        color: newCategory.color,
        description: newCategory.description,
        images: [base64Image],
      };

      const added = await postData("/api/category/create", payload);
      const createdCategory = added.data || added;

      setCategories((prev) => [...prev, createdCategory]);
      setFormData((prev) => ({ ...prev, category: createdCategory._id }));
      setNewCategory({ name: "", color: "", image: null, description: "" });
      setShowNewCategoryInput(false);
    } catch (err) {
      console.error("Error adding category:", err);
      alert("Failed to add category");
    }
  };

  const handleAddNewSupplier = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/supplier/create`, newSupplier);
      const added = res.data.supplier || res.data;

      setSuppliers((prev) => [...prev, added]);
      setFormData((prev) => ({ ...prev, supplier: added._id }));
      setNewSupplier({ name: "", company: "", country: "", city: "", email: "", phone: "" });
      setShowNewSupplierInput(false);
    } catch (err) {
      console.error("Error adding supplier:", err);
      alert("Failed to add supplier");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/product/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/admin/product");
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Update failed.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />
        <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" />
        <input name="countInStock" type="number" value={formData.countInStock} onChange={handleChange} placeholder="Stock" className="w-full p-2 border rounded" />
        <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" className="w-full p-2 border rounded" />

        {/* Category */}
        <div>
          <div className="flex gap-2 items-center">
            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
            <button type="button" onClick={() => setShowNewCategoryInput(prev => !prev)} className="bg-green-600 text-white px-3 py-1 rounded">+ Add</button>
          </div>
          {showNewCategoryInput && (
            <div className="space-y-2 mt-2">
              <input type="text" placeholder="Name" value={newCategory.name} onChange={(e) => setNewCategory((prev) => ({ ...prev, name: e.target.value }))} className="w-full p-2 border rounded" />
              <input type="text" placeholder="Color" value={newCategory.color} onChange={(e) => setNewCategory((prev) => ({ ...prev, color: e.target.value }))} className="w-full p-2 border rounded" />
              <input type="text" placeholder="Description" value={newCategory.description} onChange={(e) => setNewCategory((prev) => ({ ...prev, description: e.target.value }))} className="w-full p-2 border rounded" />
              <input type="file" accept="image/*" onChange={(e) => setNewCategory((prev) => ({ ...prev, image: e.target.files[0] }))} className="w-full p-2 border rounded" />
              <button type="button" onClick={handleAddNewCategory} className="bg-blue-600 text-white px-3 py-1 rounded">Save Category</button>
            </div>
          )}
        </div>

        {/* Supplier */}
        <div>
          <div className="flex gap-2 items-center">
            <select name="supplier" value={formData.supplier} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="">Select Supplier</option>
              {suppliers.map((sup) => (
                <option key={sup._id} value={sup._id}>{sup.name}</option>
              ))}
            </select>
            <button type="button" onClick={() => setShowNewSupplierInput(prev => !prev)} className="bg-green-600 text-white px-3 py-1 rounded">+ Add</button>
          </div>
          {showNewSupplierInput && (
            <div className="space-y-2 mt-2">
              <input type="text" placeholder="Name" value={newSupplier.name} onChange={(e) => setNewSupplier((prev) => ({ ...prev, name: e.target.value }))} className="w-full p-2 border rounded" />
              <input type="text" placeholder="Company" value={newSupplier.company} onChange={(e) => setNewSupplier((prev) => ({ ...prev, company: e.target.value }))} className="w-full p-2 border rounded" />
              <input type="text" placeholder="Country" value={newSupplier.country} onChange={(e) => setNewSupplier((prev) => ({ ...prev, country: e.target.value }))} className="w-full p-2 border rounded" />
              <input type="text" placeholder="City" value={newSupplier.city} onChange={(e) => setNewSupplier((prev) => ({ ...prev, city: e.target.value }))} className="w-full p-2 border rounded" />
              <input type="text" placeholder="Email" value={newSupplier.email} onChange={(e) => setNewSupplier((prev) => ({ ...prev, email: e.target.value }))} className="w-full p-2 border rounded" />
              <input type="text" placeholder="Phone" value={newSupplier.phone} onChange={(e) => setNewSupplier((prev) => ({ ...prev, phone: e.target.value }))} className="w-full p-2 border rounded" />
              <button type="button" onClick={handleAddNewSupplier} className="bg-blue-600 text-white px-3 py-1 rounded">Save Supplier</button>
            </div>
          )}
        </div>

        <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="w-full p-2 border rounded" />

        <select name="condition" value={formData.condition} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="New">New</option>
          <option value="Used">Used</option>
          <option value="Refurbished">Refurbished</option>
        </select>

        <input name="material" value={formData.material} onChange={handleChange} placeholder="Material" className="w-full p-2 border rounded" />
        <input name="design" value={formData.design} onChange={handleChange} placeholder="Design" className="w-full p-2 border rounded" />
        <input name="warranty" value={formData.warranty} onChange={handleChange} placeholder="Warranty" className="w-full p-2 border rounded" />
        <input name="size" value={formData.size} onChange={handleChange} placeholder="Size" className="w-full p-2 border rounded" />
        <input name="memory" value={formData.memory} onChange={handleChange} placeholder="Memory" className="w-full p-2 border rounded" />

        <input name="features" value={formData.features.join(",")} placeholder="Features (comma-separated)" onChange={(e) =>
          setFormData((prev) => ({ ...prev, features: e.target.value.split(",").map(f => f.trim()) }))
        } className="w-full p-2 border rounded" />

        <input name="tags" value={formData.tags.join(",")} placeholder="Tags (comma-separated)" onChange={(e) =>
          setFormData((prev) => ({ ...prev, tags: e.target.value.split(",").map(t => t.trim()) }))
        } className="w-full p-2 border rounded" />

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="negotiablePrice" checked={formData.negotiablePrice} onChange={handleChange} />
            Negotiable Price
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
            Featured
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="customization.logo" checked={formData.customization.logo} onChange={handleChange} />
            Logo Customization
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="customization.packaging" checked={formData.customization.packaging} onChange={handleChange} />
            Packaging Customization
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="protection.refundPolicy" checked={formData.protection.refundPolicy} onChange={handleChange} />
            Refund Policy
          </label>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
