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


const getEmployee = () => {
    return http.APIPERMISSION.get(`getEmployee`);
}


const postAddNotifyTo = (param) => {
    return http.APIPERMISSION.post(`postAddNotifyTo`, param);
}


const getNotifyTo = (ecrno) => {
    return http.APIPERMISSION.get(`getNotifyTo/${ecrno}`);
}


const getDeleteNotify = (code) => {
    return http.APIPERMISSION.get(`getDeleteNotify/${code}`);
}


export default {
    getPermission,
    getPermissionMenu,
    postAddPermission,
    getEmployee,
    postAddNotifyTo,
    getNotifyTo,
    getDeleteNotify
}