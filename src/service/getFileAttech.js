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

const postPathFile = (param) => {
    return http.SaveFile.post(`postPathFile`, param);
}


const getShowFile = (docNo) => {
    return http.SaveFile.get(`getShowFile/${docNo}`);
}


const PostDeleteFile = (param) => {
    return http.DeleteFile.post(`PostDeleteFile`, param);
}


const getDataToAddFile = (ecrno) => {
    return http.SaveFile.get(`getDataToAddFile/${ecrno}`);
}





export default {
    getNbrAddFile,
    postFile,
    postPathFile,
    getShowFile,
    PostDeleteFile,
    getECRNO,
    getDataToAddFile,
};