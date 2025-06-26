
import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

// ✅ Add headers with token if provided
const getHeaders = (token) => {
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ GET Request (optionally authenticated)
export const fetchDataFromApi = async (url, token = null) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers: getHeaders(token),
    });
    return data;
  } catch (err) {
    console.log(err);
    return err.response?.data || err;
  }
};

// ✅ POST Request (optionally authenticated)
export const postData = async (url, formData, token = null) => {
  try {
    const { data } = await axios.post(BASE_URL + url, formData, {
      headers: getHeaders(token),
    });
    return data;
  } catch (err) {
    console.error(err);
    return err.response?.data || err;
  }
};

// ✅ PUT Request (optionally authenticated)
export const editData = async (url, updatedData, token = null) => {
  try {
    const { data } = await axios.put(BASE_URL + url, updatedData, {
      headers: getHeaders(token),
    });
    return data;
  } catch (err) {
    console.error(err);
    return err.response?.data || err;
  }
};

// ✅ DELETE Request (optionally authenticated)
export const deleteData = async (url, token = null) => {
  try {
    const { data } = await axios.delete(BASE_URL + url, {
      headers: getHeaders(token),
    });
    return data;
  } catch (err) {
    console.error(err);
    return err.response?.data || err;
  }
};

// 🔍 Featured Products by Category
export const fetchFeaturedProductsByCategory = async (categoryName) => {
  try {
    const encodedCategory = encodeURIComponent(categoryName);
    const { data } = await axios.get(
      `${BASE_URL}/api/product/featured/${encodedCategory}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return error;
  }
};

// 🔍 Fetch Category by Name
export const fetchCategoryByName = async (categoryName) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/category/byname/${encodeURIComponent(categoryName)}`
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch category", error);
    return null;
  }
};


export const fetchProductsByCategoryName = async (categoryName) => {
  try {
    const encodedCategory = encodeURIComponent(categoryName);
    const { data } = await axios.get(
      `${BASE_URL}/api/product/by-category/${encodedCategory}`
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch products by category name:", error);
    return null;
  }
};

// 🔐 SIGN UP: POST /api/users/register
export const signUpUser = async (formData) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/api/user/register`,
      formData
    );
    return data;
  } catch (err) {
    console.error("Signup error:", err);
    return err.response?.data || err;
  }
};

// 🔐 SIGN IN: POST /api/users/login
export const signInUser = async (formData) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/api/user/login`,
      formData
    );
    return data;
  } catch (err) {
    console.error("Signin error:", err);
    return err.response?.data || err;
  }
};
export const fetchCart = async (token) => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.error('Error fetching cart:', err);
    return [];
  }
};

export const addToCart = async (item, token) => {
  return await axios.post(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/cart`,
    item,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeFromCart = async (productId, token) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/cart/remove/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Remove from cart error:", err);
    return null;
  }
};

export const clearCart = async (token) =>
  deleteData('/api/cart/clear', token);


export const fetchWishlist = (token) =>
  fetchDataFromApi("/api/user/wishlist", token);

// export const addToWishlist = (productId, token) =>
//   postData("/api/user/wishlist/add", { productId }, token);

export const addToWishlist = async (body, token) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/user/wishlist/add`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("addToWishlist error:", err);
    throw err;
  }
};

export const removeFromWishlist = (productId, token) =>
  deleteData(`/api/user/wishlist/remove/${productId}`, token);
