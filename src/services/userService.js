import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const API = `${API_URL}/users`;

// Register User
export const registerUser = (user) => {
    return axios.post(`${API}/register`, user);
};

// Login User
export const loginUser = (email, password) => {
    return axios.post(`${API}/login`, {
        email,
        password
    });
};

// Get User By ID
export const getUserById = (id) => {
    return axios.get(`${API}/${id}`);
};

// Update User
export const updateUser = (id, user) => {
    return axios.put(`${API}/update/${id}`, user);
};

// Get All Users
export const getAllUsers = () => {
    return axios.get(`${API}/all`);
};

// Dashboard User Count
export const getUserCount = () => {
    return axios.get(`${API}/count`);
};