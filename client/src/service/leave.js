import axios from "axios";


export const applyLeave = async (params) => {
    let results = await axios({
        method: 'POST',
        url: "http://localhost:5000/api/user/leave/apply",
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

export const getLeave = async (userId) => {
    let results = await axios({
        method: 'GET',
        url: `http://localhost:5000/api/user/leave/${userId}`,
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

export const getEmpLeave = async () => {
    let results = await axios({
        method: 'GET',
        url: `http://localhost:5000/api/employee/leave`,
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


export const leaveApprovedUnApproved = async (leaveId, params) => {
    let results = await axios({
        method: 'PUT',
        url: `http://localhost:5000/api/employee/leave/${leaveId}`,
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