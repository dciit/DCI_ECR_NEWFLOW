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



export default {
    getPermission,
    getPermissionMenu,
    postAddPermission
}