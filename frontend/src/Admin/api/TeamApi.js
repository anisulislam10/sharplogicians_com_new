import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_TEAM;
console.log("API_BASE_URL_TEAMS",API_BASE_URL )
// Fetch about us
export const fetchTeam = (page = 1, limit = 5) => {
    return axios.get(`${API_BASE_URL}/get`, {
        params: {
            page: page,
            limit: limit
        }
    });
};

// post Team 
export const postTeam = (aboutData) => axios.post(`${API_BASE_URL}/post`, aboutData);

//delete Team 
export const deleteTeam = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
        return response.data;  // Return response data if delete is successful
    } catch (error) {
        throw new Error("Error deleting Team: " + error.response?.data?.message || error.message);
    }
};
//fetch Team
// Fetch a single Team by ID
export const getTeamById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Update a Team
export const updateTeam = async (id, formData) => {
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