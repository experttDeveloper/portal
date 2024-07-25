
import axios from "axios";


export const attendancePunchin = async (params) => {
    console.log("params", params);

    let results = await axios({
        method: 'POST',
        url: "http://localhost:5000/api/user/attendance/punchin",
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

