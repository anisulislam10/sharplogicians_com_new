import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_TESTIMONIAL;
console.log("API_BASE_URL_TESTIMONIAL",API_BASE_URL )
// Fetch about us
export const fetchTestimonial = (page = 1, limit = 5) => {
    return axios.get(`${API_BASE_URL}/get`, {
        params: {
            page: page,
            limit: limit
        }
    });
};

// post Testimonial 
export const postTestimonial = (aboutTestimonial) => axios.post(`${API_BASE_URL}/post`, aboutTestimonial);

//delete Testimonial 
export const deleteTestimonial = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
        return response.data;  // Return response data if delete is successful
    } catch (error) {
        throw new Error("Error deleting Testimonial: " + error.response?.data?.message || error.message);
    }
};
//fetch Testimonial
// Fetch a single Testimonial by ID
export const getTestimonialById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Update a Testimonial
export const updateTestimonial = async (id, formData) => {
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