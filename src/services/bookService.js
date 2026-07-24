import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const API = `${API_URL}/books`;

// Get All Books
export const getAllBooks = () => {
    return axios.get(`${API}/all`);
};

// Get Book By Id
export const getBookById = (id) => {
    return axios.get(`${API}/${id}`);
};

// Add Book (Multipart Form Data)
export const addBook = (formData) => {
    return axios.post(`${API}/add`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

// Update Book (Multipart Form Data)
export const updateBook = (id, formData) => {
    return axios.put(`${API}/update/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

// Delete Book
export const deleteBook = (id) => {
    return axios.delete(`${API}/delete/${id}`);
};

// Get All Categories
export const getAllCategories = () => {
    return axios.get(`${API_URL}/category/all`);
};

// Book Count
export const getBookCount = () => {
    return axios.get(`${API}/count`);
};

// Get Image
export const getBookImageUrl = (bookId) => {
    return `${API}/image/${bookId}`;
};