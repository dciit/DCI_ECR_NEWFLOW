import http from "../constant/_configAxios"



const getApprovedCreate = (ecrno, issued, Duedate) => {
    return http.APIAPPROVEDDOC.get(`getApprovedCreate/${ecrno}/${issued}/${Duedate}`);
}


const getApprovedPU = (ecrno, issued) => {
    return http.APIAPPROVEDDOC.get(`getApprovedPU/${ecrno}/${issued}`);
}


const getApprovedDD = (ecrno, issued, sendDIL) => {
    return http.APIAPPROVEDDOC.get(`getApprovedDD/${ecrno}/${issued}/${sendDIL}`);
}


const getApprovedEN = (ecrno, issued) => {
    return http.APIAPPROVEDDOC.get(`getApprovedEN/${ecrno}/${issued}`);
}


const postApprovedGroupQC = (param) => {
    return http.APIAPPROVEDDOC.post(`postApprovedGroupQC`, param);
}



const getApprovedDILDD = (ecrno, issued) => {
    return http.APIAPPROVEDDOC.get(`getApprovedDILDD/${ecrno}/${issued}`);
}


const getApprovedDILQC = (ecrno, issued) => {
    return http.APIAPPROVEDDOC.get(`getApprovedDILQC/${ecrno}/${issued}`);
}

export default {
    getApprovedCreate,
    getApprovedPU,
    getApprovedDD,
    getApprovedEN,
    postApprovedGroupQC,
    getApprovedDILDD,
    getApprovedDILQC,
};