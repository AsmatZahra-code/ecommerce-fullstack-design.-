import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDataFromApi,postData } from "../../utils/api";
import axios from "axios";

const ProductCreate = () => {
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
    const fetchOptions = async () => {
      const categoriesData = await fetchDataFromApi("/api/category");
      const suppliersData = await fetchDataFromApi("/api/supplier");

      setCategories(categoriesData?.data || categoriesData || []);
      setSuppliers(suppliersData?.data || suppliersData || []);
    };

    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("customization.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        customization: {
          ...prev.customization,
          [field]: checked,
        },
      }));
    } else if (name.includes("protection.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        protection: {
          ...prev.protection,
          [field]: checked,
        },
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

  // const handleAddNewCategory = async () => {
  //   try {
  //     const form = new FormData();
  //     form.append("name", newCategory.name);
  //     form.append("color", newCategory.color);
  //     form.append("description", newCategory.description);
  //     form.append("images", newCategory.image);

  //     const res = await  axios.post(
  //     `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/category/create`,
  //     form,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }
  //   );

  //     const added = res.data;
  //     setCategories((prev) => [...prev, added]);
  //     setFormData((prev) => ({ ...prev, category: added._id }));
  //     setNewCategory({ name: "", color: "", image: null, description: "" });
  //     setShowNewCategoryInput(false);
  //   } catch (err) {
  //     console.error("Error adding category:", err);
  //     alert("Failed to add category");
  //   }
  // };
// const handleAddNewCategory = async () => {
//   try {
//     // Read the image file as base64
//     const imageFile = newCategory.image;

//     const base64Image = await new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result);
//       reader.onerror = reject;
//       reader.readAsDataURL(imageFile);
//     });

//     const payload = {
//       name: newCategory.name,
//       color: newCategory.color,
//       description: newCategory.description,
//       images: [base64Image], // as your backend expects
//     };

//     const added = await postData("/api/category/create", payload);

//     setCategories((prev) => [...prev, added]);
//     setFormData((prev) => ({ ...prev, category: added.id }));
//     setNewCategory({ name: "", color: "", image: null, description: "" });
//     setShowNewCategoryInput(false);
//   } catch (err) {
//     console.error("Error adding category:", err);
//     alert("Failed to add category");
//   }
// };
 const handleAddNewCategory = async () => {
    try {
      if (!newCategory.image) {
        alert("Please select an image for the category.");
        return;
      }

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

      // Fix: if returned directly, added is the object
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
      const res = await axios.post("/api/supplier/create", newSupplier);
      const added = res.data.supplier;
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
      await axios.post("/api/product/create", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/admin/products");
    } catch (err) {
      console.error("Product creation failed", err);
      alert("Error creating product. Check console for details.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" onChange={handleChange} required className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Description" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="countInStock" type="number" placeholder="Stock" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="brand" placeholder="Brand" onChange={handleChange} className="w-full p-2 border rounded" />

        {/* Category Section */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <select name="category" value={formData.category} onChange={handleChange} required className="w-full p-2 border rounded">
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
            <button type="button" onClick={() => setShowNewCategoryInput(prev => !prev)} className="bg-green-600 text-white px-3 py-1 rounded">+ Add</button>
          </div>
          {showNewCategoryInput && (
            <div className="space-y-2">
              <input type="text" placeholder="Name" value={newCategory.name} onChange={(e) => setNewCategory((prev) => ({ ...prev, name: e.target.value }))} className="w-full p-2 border rounded" />
              <input type="text" placeholder="Color" value={newCategory.color} onChange={(e) => setNewCategory((prev) => ({ ...prev, color: e.target.value }))} className="w-full p-2 border rounded" />
              <input type="text" placeholder="Description" value={newCategory.description} onChange={(e) => setNewCategory((prev) => ({ ...prev, description: e.target.value }))} className="w-full p-2 border rounded" />
              <input type="file" accept="image/*" onChange={(e) => setNewCategory((prev) => ({ ...prev, image: e.target.files[0] }))} className="w-full p-2 border rounded" />
              <button type="button" onClick={handleAddNewCategory} className="bg-blue-600 text-white px-3 py-1 rounded">Save Category</button>
            </div>
          )}
        </div>

        {/* Supplier Section */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <select name="supplier" value={formData.supplier} onChange={handleChange} required className="w-full p-2 border rounded">
              <option value="">Select Supplier</option>
              {suppliers.map((sup) => (
                <option key={sup._id} value={sup._id}>{sup.name}</option>
              ))}
            </select>
            <button type="button" onClick={() => setShowNewSupplierInput(prev => !prev)} className="bg-green-600 text-white px-3 py-1 rounded">+ Add</button>
          </div>
          {showNewSupplierInput && (
            <div className="space-y-2">
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

        <input name="material" placeholder="Material" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="design" placeholder="Design" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="warranty" placeholder="Warranty" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="size" placeholder="Size" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="memory" placeholder="Memory" onChange={handleChange} className="w-full p-2 border rounded" />

        <input name="features" placeholder="Features (comma-separated)" onChange={(e) =>
          setFormData((prev) => ({ ...prev, features: e.target.value.split(",").map(f => f.trim()) }))
        } className="w-full p-2 border rounded" />

        <input name="tags" placeholder="Tags (comma-separated)" onChange={(e) =>
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
          Create Product
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;