import axios from "axios";


export const applyLeave = async (params) => {
    let results = await axios({
        method: 'POST',
        url: "https://brandclever.in/developer/portal/post_leave.php",
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
        url: `https://developer.brandclever.in/portal/get_leave_user.php?id=${userId}`,
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
        url: `https://developer.brandclever.in/portal/get_all_leaves.php`,
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