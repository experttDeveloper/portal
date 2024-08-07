
import axios from "axios";


export const loginUser = async (params) => {
    let results = await axios({
        method: 'POST',
        url: "https://brandclever.in/developer/portal/login.php",
        data: params
    })
        .then(result => result.data)
        .catch(error => {
            return {
                status: "error",
                message: error.message
            };
        });
    return results;
}


export const getUser = async (userId) => {
    try {
        const response = await axios.get('https://brandclever.in/developer/portal/get_user.php', {
            params: {
                id: userId
            }
        });
        return response.data;
    } catch (error) {
        return {
            status: "error",
            message: error.message
        };
    }
}

export const updateUser = async (userId, params) => {
    let results = await axios({
        method: 'PUT',
        url: `http://localhost:5000/api/user/${userId}`,
        data: params
    })
        .then(result => result.data)
        .catch(error => {
            return {
                status: "error",
                message: error.message
            };
        });
    return results;
}

export const updatePassword = async (userId, params) => {
    let results = await axios({
        method: 'PUT',
        url: `http://localhost:5000/api/user/update/password/${userId}`,
        data: params
    })
        .then(result => result.data)
        .catch(error => {
            return {
                status: "error",
                message: error.message
            };
        });
    return results;
}



