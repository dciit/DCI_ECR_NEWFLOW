import http from "../constant/_configAxios"


const getPermission = (empCode) => {
    return http.APIPERMISSION.get(`getPermission/${empCode}`);
}

const getPermissionMenu = (empCode) => {
    return http.APIPERMISSION.get(`getPermissionMenu/${empCode}`);
}

const postAddPermission = (param) => {
    return http.APIPERMISSION.post(`postAddPermission`, param);
}


const getEmployeeForCreate = () => {
    return http.APIPERMISSION.get(`getEmployeeForCreate`);
}

const getEmployeeForPU = () => {
    return http.APIPERMISSION.get(`getEmployeeForPU`);
}

const getEmployeeForDD = () => {
    return http.APIPERMISSION.get(`getEmployeeForDD`);
}

const getEmployeeForEN = () => {
    return http.APIPERMISSION.get(`getEmployeeForEN`);
}

const getEmployeeForQC = () => {
    return http.APIPERMISSION.get(`getEmployeeForQC`);
}

const postAddNotifyTo = (param) => {
    return http.APIPERMISSION.post(`postAddNotifyTo`, param);
}


const getNotifyTo = (ecrno) => {
    return http.APIPERMISSION.get(`getNotifyTo/${ecrno}`);
}


const getDeleteNotify = (code, step) => {
    return http.APIPERMISSION.get(`getDeleteNotify/${code}/${step}`);
}

const getShowEmployee = () => {
    return http.APIPERMISSION.get(`getShowEmployee`);
}

const getSearchEmployee = (empCode) => {
    return http.APIPERMISSION.get(`getSearchEmployee/${empCode}`);
}

const getTestLogin = (code) => {
    return http.APIPERMISSION.get(`getTestLogin/${code}`);
}


const getDeletePermission = (code, grpCode) => {
    return http.APIPERMISSION.get(`getDeletePermission/${code}/${grpCode}`)
}


const getPosition = (empCode) => {
    return http.APIPERMISSION.get(`getPosition/${empCode}`);
}


export default {
    getPermission,
    getPermissionMenu,
    postAddPermission,
    getEmployeeForCreate,
    getEmployeeForPU,
    getEmployeeForDD,
    getEmployeeForEN,
    getEmployeeForQC,
    postAddNotifyTo,
    getNotifyTo,
    getDeleteNotify,
    getShowEmployee,
    getSearchEmployee,
    getTestLogin,
    getDeletePermission,
    getPosition,
}