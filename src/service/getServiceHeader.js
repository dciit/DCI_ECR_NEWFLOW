import http from "../constant/_configAxios"


// const getECRList = (docNo, status) => {
//     return http.APIHEADER.get(`getECRList/${encodeURIComponent(docNo)}/${status}`);
// }


const postECRList = (param) => {
    return http.APIHEADER.post(`postECRList`, param);
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


const getECRListLoad = (section, status) => {
    return http.APIHEADER.get(`getECRListLoad/${section}/${status}`);
}



export default {
    // getECRList,
    getCheck,
    getApproved,
    getStatusCreate,
    getECRListLoad,
    postECRList
};