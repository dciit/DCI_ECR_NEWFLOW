import http from "../constant/_configAxios"


const getECRList = (docNo, status) => {
    return http.APIHEADER.get(`getECRList/${encodeURIComponent(docNo)}/${status}`);
}


const getCheck = (docNo, status, section) => {
    return http.APIHEADER.get(`getCheck/${docNo}/${status}/${section}`);
}

const getApproved = (docNo, status, section) => {
    return http.APIHEADER.get(`getApproved/${docNo}/${status}/${section}`);
}


const getStatusCreate = (docNo) => {
    return http.APIHEADER.get(`getStatusCreate/${docNo}`);
}


export default {
    getECRList,
    getCheck,
    getApproved,
    getStatusCreate,
};