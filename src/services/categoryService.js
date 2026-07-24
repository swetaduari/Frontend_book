import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const API = `${API_URL}/category`;

// Add Category
export const addCategory = (category) => {
    return axios.post(`${API}/add`, category);
};

// Get All Categories
export const getAllCategories = () => {
    return axios.get(`${API}/all`);
};

// Get Category By Id
export const getCategoryById = (id) => {
    return axios.get(`${API}/${id}`);
};

// Update Category
export const updateCategory = (id, category) => {
    return axios.put(`${API}/update/${id}`, category);
};

// Delete Category
export const deleteCategory = (id) => {
    return axios.delete(`${API}/delete/${id}`);
};