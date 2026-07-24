import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const API = `${API_URL}/orders`;

// Place Order
export const placeOrder = (userId) => {
    return axios.post(`${API}/place/${userId}`);
};

// Get Orders of Logged-in User
export const getUserOrders = (userId) => {
    return axios.get(`${API}/user/${userId}`);
};

// Get All Orders (Admin)
export const getAllOrders = () => {
    return axios.get(`${API}/all`);
};

// Get Single Order
export const getOrderById = (orderId) => {
    return axios.get(`${API}/${orderId}`);
};

// Update Order Status
export const updateOrderStatus = (orderId, status) => {
    return axios.put(`${API}/status/${orderId}`, null, {
        params: { status }
    });
};

// Cancel Order
export const cancelOrder = (orderId) => {
    return axios.delete(`${API}/cancel/${orderId}`);
};

// Dashboard Order Count
export const getOrderCount = () => {
    return axios.get(`${API}/count`);
};