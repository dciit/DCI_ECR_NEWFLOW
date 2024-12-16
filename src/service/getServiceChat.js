import http from "../constant/_configAxios"


const getChat = (docNo) => {
    return http.APICHAT.get(`getChat/${docNo}`);
}

const postConfirmChat = (param) => {
    return http.APICHAT.post(`postConfirmChat`, param);
}


export default {
    getChat,
    postConfirmChat,
};