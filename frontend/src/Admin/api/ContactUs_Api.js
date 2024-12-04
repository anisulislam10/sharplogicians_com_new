import axios from "axios";
import process from "process";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_CONTACT;
console.log("Contact base url:", API_BASE_URL)
// console.log('Environment:', process.env);

// Fetch all Clients with pagination
export const fetchContact = (page = 1, limit = 5) => {
    const skip = (page - 1) * limit; // Calculate skip based on page and limit

    return axios.get(`${API_BASE_URL}/get`, {
      params: {
        skip: skip,
        limit: limit,
      },
    });
};

// Post a new Contact item
export const postContact = (contactData) => axios.post(`${API_BASE_URL}/post`, contactData);

// Delete an Contact
export const deleteContact = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
        return response.data;  // Return response data if delete is successful
    } catch (error) {
        console.error("Error deleting Contact:", error);
        throw new Error("Error deleting Contact: " + error.response?.data?.message || error.message);
    }
};

// Fetch a single Contact by ID
export const getContactById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching Contact by ID: ${error.message}`);
    }
};

// Update an Contact status
export const updateContact = async (id, formData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/update/${id}`, formData);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating Contact status: ${error.message}`);
    }
};
