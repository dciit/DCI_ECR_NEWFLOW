import http from "../constant/_configAxios"


const getChat = (docNo) => {
    return http.APICHAT.get(`getChat/${docNo}`);
}


export default {
    getChat,
};