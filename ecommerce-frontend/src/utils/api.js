// import axios from "axios"


// export const fetchDataFromApi=async(url)=>{
//     try{
//         const {data}=await axios.get(import.meta.env.VITE_REACT_APP_BASE_URL+url)
//         return data
//     }catch(err){
//         console.log(err);
//         return err;
//     }
// }

// // export const postData=async(url,formData)=>{
// //     const {res}=await axios.post(import.meta.env.VITE_REACT_APP_BASE_URL+url,formData)
// //     return res;
// // }
// export const postData = async (url, formData) => {
//   const response = await axios.post(import.meta.env.VITE_REACT_APP_BASE_URL + url, formData);
//   return response.data;
// };

// export const editData=async(url,updatedData)=>{
//     const {res}=await axios.put(`${import.meta.env.VITE_REACT_APP_BASE_URL}${url}`,updatedData)
//     return res;
// }

// export const deleteData=async(url)=>{
//     const {res}=await axios.delete(`${import.meta.env.VITE_REACT_APP_BASE_URL}${url}`)
//     return res;
// }

// export const fetchFeaturedProductsByCategory = async (categoryName) => {
//   try {
//     const encodedCategory = encodeURIComponent(categoryName);
//     const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/product/featured/${encodedCategory}`);
//     return data;
//   } catch (error) {
//     console.error("Error fetching featured products:", error);
//     return error;
//   }
// };
// export const fetchCategoryByName = async (categoryName) => {
//   try {
//     const { data } = await axios.get(
//       `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/category/byname/${encodeURIComponent(categoryName)}`
//     );
//     return data;
//   } catch (error) {
//     console.error("Failed to fetch category", error);
//     return null;
//   }
// };


// // export const deleteImage=async(url,image)=>{
// //     const {res}=await axios.delete(`${process.env.REACT_APP_BASE_URL}${url}`,image)
// //     return res;
// // }
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

