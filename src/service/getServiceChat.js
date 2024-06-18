import http from "../constant/_configAxios"


const getChat = (docNo) => {
    return http.APICHAT.get(`getChat/${docNo}`);
}

const postConfirmChat = (param) => {
    console.log(param)
    return http.APICHAT.post(`postConfirmChat`, param);
}


export default {
    getChat,
    postConfirmChat,
};