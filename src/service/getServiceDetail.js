import http from "../constant/_configAxios"

const postReceive = (param) => {
    return http.APIDETAIL.post(`postReceive`, param);
}

// const postIssued = (param) => {
//     return http.APIDETAIL.post(`postIssued`, param);
// }

const postIssuedPU = (param) => {
    return http.APIDETAIL.post(`postIssuedPU`, param);
}

const postIssuedDD = (param) => {
    return http.APIDETAIL.post(`postIssuedDD`, param);
}

const postIssuedEN = (param) => {
    return http.APIDETAIL.post(`postIssuedEN`, param);
}

const postIssuedSQC = (param) => {
    return http.APIDETAIL.post(`postIssuedSQC`, param);
}

const postIssuedQC = (param) => {
    return http.APIDETAIL.post(`postIssuedQC`, param);
}

const postIssuedQA = (param) => {
    return http.APIDETAIL.post(`postIssuedQA`, param);
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
    postIssuedPU,
    postIssuedDD,
    postIssuedEN,
    postIssuedSQC,
    postIssuedQC,
    postIssuedQA,
    getReturn,
    postApprovedDIL,
    postReturnDIL,
    postHold,
};