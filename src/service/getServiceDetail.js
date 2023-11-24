import http from "../constant/_configAxios"

const postReceive = (param) => {
    return http.APIDETAIL.post(`postReceive`, param);
}

const postIssued = (param) => {
    return http.APIDETAIL.post(`postIssued`, param);
}

const getReturn = (param) => {
    return http.APIDETAIL.post(`getReturn`, param);
}




export default {
    postReceive,
    postIssued,
    getReturn,
};