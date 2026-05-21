// frontend/src/services/authServices.js


import API from "../utils/api";

export const loginUser = async (userData) => {
    return await API.post('/auth/login', userData);
}

export const registerUser = async (userData) => {
    return await API.post('/auth/register', userData);
}