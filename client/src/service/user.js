
import axios from "axios";


export const loginUser = async (params) => {
    let results = await axios({
        method: 'POST',
        url: "http://localhost:5000/api/user/login",
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
    let results = await axios({
        method: 'GET',
        url: `http://localhost:5000/api/user/${userId}`,
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



