import http from "../constant/_configAxios"

const getNbrAddFile = () => {
    return http.APIECR.get(`getNbrAddFile`);
}


const getECRNO = (docNo) => {
    return http.SaveFile.get(`getECRNO/${docNo}`);
}


const postFile = (param) => {
    return http.SaveFile.post(`postFile`, param);
}


const getShowFile = (docNo) => {
    return http.SaveFile.get(`getShowFile/${docNo}`);
}

const getDeleteFile = (docNo) => {
    return http.SaveFile.get(`getDeleteFile/${docNo}`);
}

const getDataToAddFile = (ecrno) => {
    return http.SaveFile.get(`getDataToAddFile/${ecrno}`);
}

export default {
    getNbrAddFile,
    postFile,
    getShowFile,
    getDeleteFile,
    getECRNO,
    getDataToAddFile,
};