import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const API = `${API_URL}/cart`;

export const addToCart = (userId, bookId, quantity = 1) => {
    return axios.post(`${API}/add`, null, {
        params: {
            userId,
            bookId,
            quantity
        }
    });
};

export const getCartItems = (userId) => {
    return axios.get(`${API}/items/${userId}`);
};

export const removeCartItem = (cartItemId) => {
    return axios.delete(`${API}/remove/${cartItemId}`);
};

export const clearCart = (userId) => {
    return axios.delete(`${API}/clear/${userId}`);
};

export default addToCart;