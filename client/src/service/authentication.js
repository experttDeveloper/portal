import axios from "axios";


export const authenticatedUser = async () => {
    try {
        const token = localStorage.getItem("token");
        if (token) {
            const response = await axios.get("https://brandclever.in/developer/portal/protected.php", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching protected resource:', error);
        throw error;
    }
};

