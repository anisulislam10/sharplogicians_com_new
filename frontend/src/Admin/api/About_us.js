import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_ABOUTUS;
console.log("API_BASE_URL_ABOUTUS",API_BASE_URL )
// Fetch about us
export const fetchAbout = (page = 1, limit = 5) => {
    return axios.get(`${API_BASE_URL}/get`, {
        params: {
            page: page,
            limit: limit
        }
    });
};

// post service 
export const postAbout = (aboutData) => axios.post(`${API_BASE_URL}/post`, aboutData);

//delete service 
export const deleteAbout = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
        return response.data;  // Return response data if delete is successful
    } catch (error) {
        throw new Error("Error deleting service: " + error.response?.data?.message || error.message);
    }
};
//fetch service
// Fetch a single service by ID
export const getAboutById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Update a service
export const updateAbout = async (id, formData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/update/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};