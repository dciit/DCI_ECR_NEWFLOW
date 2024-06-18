import http from "../constant/_configAxios"


const getECRHOLD = (ecrno) => {
    return http.APIHOLD.get(`getECRHOLD/${ecrno}`);
}


export default {
    getECRHOLD,
};