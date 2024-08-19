
import axios from "axios";


export const loginUser = async (params) => {
    let results = await axios({
        method: 'POST',
        url: "https://brandclever.in/developer/portal/login.php",
        data: params,
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

export const updateUser = async (params) => {
    console.log("Sending params:", params); // Log params to verify
    let results = await axios({
        method: 'POST',
        url: `https://brandclever.in/developer/portal/profile.php`,
        data: params
    })
    .then(result => result.data)
    .catch(error => {
        console.error("Error:", error); // Log error to understand the issue
        return {
            status: "error",
            message: error.message
        };
    });
    return results;
}


export const updatePassword = async (params) => {
    console.log("params",params)
    let results = await axios({
        method: 'POST',
        url: `https://brandclever.in/developer/portal/password-update.php`,
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


export const addEmployee = async (params) => {
    let results = await axios({
        method: 'POST',
        url: "https://brandclever.in/developer/portal/register.php",
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


export const getEmployees = async (params) => {
    let results = await axios({
        method: 'GET',
        url: "https://developer.brandclever.in/portal/get_all_users.php",
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




export const deleteEmployee = async (employeeId) => {
    try {
        const response = await axios.delete(`https://developer.brandclever.in/portal/delete_users.php?id=${employeeId}`);
        return response.data; // Ensure this returns the data as expected
    } catch (error) {
        console.error("Error deleting employee:", error);
        return {
            status: "error",
            message: error.message
        };
    }
};






// export const deleteEmployee = async (employeeId) => {
//     try {
//         const result = await axios.delete(`https://developer.brandclever.in/portal/delete_users.php?id=${employeeId}`);
//         console.log("API Response:", result.data); // Debug the API response
//         return result.data;
//     } catch (error) {
//         console.error("Error deleting employee:", error);
//         return {
//             status: "error",
//             message: error.message
//         };
//     }
// }
