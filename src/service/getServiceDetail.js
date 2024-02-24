import http from "../constant/_configAxios"

const postReceive = (param) => {
    return http.APIDETAIL.post(`postReceive`, param);
}

const postIssued = (param) => {
    console.log(param)
    return http.APIDETAIL.post(`postIssued`, param);
}

const getReturn = (param) => {
    return http.APIDETAIL.post(`getReturn`, param);
}

const postApprovedDIL = (param) => {
    console.log(param)
    return http.APIDETAIL.post(`postApprovedDIL`, param);
}



export default {
    postReceive,
    postIssued,
    getReturn,
    postApprovedDIL,
};