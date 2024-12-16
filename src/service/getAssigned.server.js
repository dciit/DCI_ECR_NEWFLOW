import http from "../constant/_configAxios"


const getAssigned = (Section, Step) => {
    return http.APIASSIGNED.get(`getAssigned/${Section}/${Step}`);
}

const getShowAssigned = (ecrno) => {
    return http.APIASSIGNED.get(`getShowAssigned/${ecrno}`);
}


export default {
    getAssigned,
    getShowAssigned
};