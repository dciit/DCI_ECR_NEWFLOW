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


const getEmployeeForCreateCheck = () => {
    return http.APIPERMISSION.get(`getEmployeeForCreateCheck`);
}

const getEmployeeForCreateApproved = () => {
    return http.APIPERMISSION.get(`getEmployeeForCreateApproved`);
}


const getEmployeeForPUReceived = () => {
    return http.APIPERMISSION.get(`getEmployeeForPUReceived`);
}

const getEmployeeForPUIssued = () => {
    return http.APIPERMISSION.get(`getEmployeeForPUIssued`);
}


const getEmployeeForPUCheck = () => {
    return http.APIPERMISSION.get(`getEmployeeForPUCheck`);
}


const getEmployeeForPUApproved = () => {
    return http.APIPERMISSION.get(`getEmployeeForPUApproved`);
}

const getEmployeeForDDReceived = () => {
    return http.APIPERMISSION.get(`getEmployeeForDDReceived`);
}

const getEmployeeForDDIssued = () => {
    return http.APIPERMISSION.get(`getEmployeeForDDIssued`);
}

const getEmployeeForDDCheck = () => {
    return http.APIPERMISSION.get(`getEmployeeForDDCheck`);
}

const getEmployeeForDDApproved = () => {
    return http.APIPERMISSION.get(`getEmployeeForDDApproved`);
}

const getEmployeeForENReceived = () => {
    return http.APIPERMISSION.get(`getEmployeeForENReceived`);
}

const getEmployeeForENIssued = () => {
    return http.APIPERMISSION.get(`getEmployeeForENIssued`);
}

const getEmployeeForENCheck = () => {
    return http.APIPERMISSION.get(`getEmployeeForENCheck`);
}

const getEmployeeForENApproved = () => {
    return http.APIPERMISSION.get(`getEmployeeForENApproved`);
}

const getEmployeeForSQCReceived = () => {
    return http.APIPERMISSION.get(`getEmployeeForSQCReceived`);
}

const getEmployeeForSQCIssued = () => {
    return http.APIPERMISSION.get(`getEmployeeForSQCIssued`);
}

const getEmployeeForSQCCheck = () => {
    return http.APIPERMISSION.get(`getEmployeeForSQCCheck`);
}

const getEmployeeForSQCApproved = () => {
    return http.APIPERMISSION.get(`getEmployeeForSQCApproved`);
}

const getEmployeeForQCReceived = () => {
    return http.APIPERMISSION.get(`getEmployeeForQCReceived`);
}

const getEmployeeForQCIssued = () => {
    return http.APIPERMISSION.get(`getEmployeeForQCIssued`);
}

const getEmployeeForQCCheck = () => {
    return http.APIPERMISSION.get(`getEmployeeForQCCheck`);
}

const getEmployeeForQCApproved = () => {
    return http.APIPERMISSION.get(`getEmployeeForQCApproved`);
}

const getEmployeeForQAReceived = () => {
    return http.APIPERMISSION.get(`getEmployeeForQAReceived`);
}

const getEmployeeForQAIssued = () => {
    return http.APIPERMISSION.get(`getEmployeeForQAIssued`);
}

const getEmployeeForQACheck = () => {
    return http.APIPERMISSION.get(`getEmployeeForQACheck`);
}

const getEmployeeForQAApproved = () => {
    return http.APIPERMISSION.get(`getEmployeeForQAApproved`);
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


const getNotifypersonBy = (ecrno, empLogin) => {
    return http.APIPERMISSION.get(`getNotifypersonBy/${ecrno}/${empLogin}`)
}



export default {
    getPermission,
    getPermissionMenu,
    postAddPermission,
    getEmployeeForCreateCheck,
    getEmployeeForCreateApproved,
    getEmployeeForPUReceived,
    getEmployeeForPUIssued,
    getEmployeeForPUCheck,
    getEmployeeForPUApproved,
    getEmployeeForDDReceived,
    getEmployeeForDDIssued,
    getEmployeeForDDCheck,
    getEmployeeForDDApproved,
    getEmployeeForENReceived,
    getEmployeeForENIssued,
    getEmployeeForENCheck,
    getEmployeeForENApproved,
    getEmployeeForSQCReceived,
    getEmployeeForSQCIssued,
    getEmployeeForSQCCheck,
    getEmployeeForSQCApproved,
    getEmployeeForQCReceived,
    getEmployeeForQCIssued,
    getEmployeeForQCCheck,
    getEmployeeForQCApproved,
    getEmployeeForQAReceived,
    getEmployeeForQAIssued,
    getEmployeeForQACheck,
    getEmployeeForQAApproved,
    postAddNotifyTo,
    getNotifyTo,
    getDeleteNotify,
    getShowEmployee,
    getSearchEmployee,
    getTestLogin,
    getDeletePermission,
    getPosition,
    getNotifypersonBy,
}