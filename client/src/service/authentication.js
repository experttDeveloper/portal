import api from "../api/api";

export const authenticatedUser = async () => {
    try {
        const response = await api.get('/api/protected');
        return response.data;
    } catch (error) {
        console.error('Error fetching protected data', error);
        throw error;
    }
};

