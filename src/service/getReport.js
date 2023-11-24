import http from "../constant/_configAxios"


const getReportECR = (ECRNo) => {
    return http.REPORT.get(`getReportECR/${ECRNo}`);
}


export default {
    getReportECR
}