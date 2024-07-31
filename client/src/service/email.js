import axios from "axios";


export const sendEmail = async (params) => {
    let results = await axios({
        method: 'POST',
        url: "http://localhost:5000/api/send-email",
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
