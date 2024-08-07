
import axios from "axios";


export const attendancePunchin = async (params) => {
    console.log("params", params);

    let results = await axios({
        method: 'POST',
        url: "https://brandclever.in/developer/portal/punchin_punchout.php?endpoint=punchIn",
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


export const attendancePunchout = async (params) => {

    let results = await axios({
        method: 'POST',
        url: "http://localhost:5000/api/user/attendance/punchout",
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


export const fetchPunchInData = async (userId) => {
    let results = await axios({
        method: 'GET',
        url: `http://localhost:5000/api/user/attendance/punchin/${userId}`,
    })
        .then(result => result.data)
        .catch(error => {
            return {
                status: "error",
                message: error.message
            };
        });
    return results;
};


export const getAttendanceData = async (userId, params) => {
    let results = await axios({
        method: 'GET',
        url: `http://localhost:5000/api/user/attendance/list/${userId}`,
        params
    })
        .then(result => result.data)
        .catch(error => {
            return {
                status: "error",
                message: error.message
            };
        });
    return results;
};

