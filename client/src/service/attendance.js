
import axios from "axios";


export const attendancePunchin = async (params) => {

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
        url: "https://brandclever.in/developer/portal/punchin_punchout.php?endpoint=punchOut",
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
        url: `https://brandclever.in/developer/portal/punchin_punchout.php?endpoint=totalHour&userID=${userId}`,
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
        url: `https://brandclever.in/developer/portal/punchin_punchout.php?endpoint=attendanceList&userID=${userId}`,
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


export const getEmpAttendance = async () => {
    let results = await axios({
        method: 'GET',
        url: `https://brandclever.in/developer/portal/get_all_attendance.php`
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

