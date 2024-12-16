import http from "../constant/_configAxios"



const getCheckCreate = (ecrno, issued) => {
    return http.APICHECKDOC.get(`getCheckCreate/${ecrno}/${issued}`);
}


const getCheckPU = (ecrno, issued) => {
    return http.APICHECKDOC.get(`getCheckPU/${ecrno}/${issued}`);
}


const getCheckDD = (ecrno, issued) => {
    return http.APICHECKDOC.get(`getCheckDD/${ecrno}/${issued}`);
}


const getCheckEN = (ecrno, issued) => {
    return http.APICHECKDOC.get(`getCheckEN/${ecrno}/${issued}`);
}


const getCheckSQC = (ecrno, issued) => {
    return http.APICHECKDOC.get(`getCheckSQC/${ecrno}/${issued}`);
}


const getCheckQC = (ecrno, issued) => {
    return http.APICHECKDOC.get(`getCheckQC/${ecrno}/${issued}`);
}


const getCheckQA = (ecrno, issued) => {
    return http.APICHECKDOC.get(`getCheckQA/${ecrno}/${issued}`);
}


export default {
    getCheckCreate,
    getCheckPU,
    getCheckDD,
    getCheckEN,
    getCheckSQC,
    getCheckQC,
    getCheckQA,
};