import http from "../constant/_configAxios"


const postReturnCreCheck = (param) => {
    return http.APIRETURN.post(`postReturnCreCheck`, param);
}

const postReturnCreApproved = (param) => {
    return http.APIRETURN.post(`postReturnCreApproved`, param);
}

const postReturnPUReceive = (param) => {
    return http.APIRETURN.post(`postReturnPUReceive`, param);
}

const postReturnPUIssued = (param) => {
    return http.APIRETURN.post(`postReturnPUIssued`, param);
}

const postReturnPUCheck = (param) => {
    return http.APIRETURN.post(`postReturnPUCheck`, param);
}

const postReturnPUApproved = (param) => {
    return http.APIRETURN.post(`postReturnPUApproved`, param);
}

const postReturnDDReceive = (param) => {
    return http.APIRETURN.post(`postReturnDDReceive`, param);
}

const postReturnDDIssued = (param) => {
    return http.APIRETURN.post(`postReturnDDIssued`, param);
}

const postReturnDDCheck = (param) => {
    return http.APIRETURN.post(`postReturnDDCheck`, param);
}

const postReturnDDApproved = (param) => {
    console.log(param);
    return http.APIRETURN.post(`postReturnDDApproved`, param);
}

const postReturnENReceive = (param) => {
    return http.APIRETURN.post(`postReturnENReceive`, param);
}

const postReturnENIssued = (param) => {
    return http.APIRETURN.post(`postReturnENIssued`, param);
}

const postReturnENCheck = (param) => {
    return http.APIRETURN.post(`postReturnENCheck`, param);
}

const postReturnENApproved = (param) => {
    return http.APIRETURN.post(`postReturnENApproved`, param);
}

const postReturnSQCReceive = (param) => {
    return http.APIRETURN.post(`postReturnSQCReceive`, param);
}

const postReturnSQCIssued = (param) => {
    return http.APIRETURN.post(`postReturnSQCIssued`, param);
}

const postReturnSQCCheck = (param) => {
    return http.APIRETURN.post(`postReturnSQCCheck`, param);
}

const postReturnSQCApproved = (param) => {
    return http.APIRETURN.post(`postReturnSQCApproved`, param);
}

const postReturnQCReceive = (param) => {
    return http.APIRETURN.post(`postReturnQCReceive`, param);
}

const postReturnQCIssued = (param) => {
    return http.APIRETURN.post(`postReturnQCIssued`, param);
}

const postReturnQCCheck = (param) => {
    return http.APIRETURN.post(`postReturnQCCheck`, param);
}

const postReturnQCApproved = (param) => {
    return http.APIRETURN.post(`postReturnQCApproved`, param);
}

const postReturnQAReceive = (param) => {
    return http.APIRETURN.post(`postReturnQAReceive`, param);
}

const postReturnQAIssued = (param) => {
    return http.APIRETURN.post(`postReturnQAIssued`, param);
}

const postReturnQACheck = (param) => {
    return http.APIRETURN.post(`postReturnQACheck`, param);
}

const postReturnQAApproved = (param) => {
    return http.APIRETURN.post(`postReturnQAApproved`, param);
}

export default {
    postReturnCreCheck,
    postReturnCreApproved,
    postReturnPUReceive,
    postReturnPUIssued,
    postReturnPUCheck,
    postReturnPUApproved,
    postReturnDDReceive,
    postReturnDDIssued,
    postReturnDDCheck,
    postReturnDDApproved,
    postReturnENReceive,
    postReturnENIssued,
    postReturnENCheck,
    postReturnENApproved,
    postReturnSQCReceive,
    postReturnSQCIssued,
    postReturnSQCCheck,
    postReturnSQCApproved,
    postReturnQCReceive,
    postReturnQCIssued,
    postReturnQCCheck,
    postReturnQCApproved,
    postReturnQAReceive,
    postReturnQAIssued,
    postReturnQACheck,
    postReturnQAApproved,
};