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

const postApprovedDIL = (param) => {
    return http.APIDETAIL.post(`postApprovedDIL`, param);
}

const postReturnDIL = (param) => {
    return http.APIDETAIL.post(`postReturnDIL`, param);
}


const postHold = (param) => {
    return http.APIDETAIL.post(`postHold`, param);
}




export default {
    postReceive,
    postIssued,
    getReturn,
    postApprovedDIL,
    postReturnDIL,
    postHold,
};