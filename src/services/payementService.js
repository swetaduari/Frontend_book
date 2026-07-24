import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const API = `${API_URL}/payments`;

// Save Payment
export const makePayment = (orderId, payment) => {
    return axios.post(`${API}/pay/${orderId}`, payment);
};

// Get Payment By Id
export const getPayment = (paymentId) => {
    return axios.get(`${API}/${paymentId}`);
};

// Get All Payments
export const getAllPayments = () => {
    return axios.get(`${API}/all`);
};

// Update Payment Status
export const updatePaymentStatus = (paymentId, status) => {
    return axios.put(`${API}/status/${paymentId}`, null, {
        params: { status }
    });
};

// Delete Payment
export const deletePayment = (paymentId) => {
    return axios.delete(`${API}/delete/${paymentId}`);
};

// Dashboard Payment Count
export const getPaymentCount = () => {
    return axios.get(`${API}/count`);
};