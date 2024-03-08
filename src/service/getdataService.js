import http from "../constant/_configAxios"
// Method Get all product

// step 1 create fuction

const Login = (username, password) => {
    return http.SOAP.get(`authen?username=${username}&password=${encodeURIComponent(password)}`);
};


const getNbr = () => {
    return http.APIECR.get(`getNbr`);
}


const getData = () => {
    return http.TEST.get(`pstMstr`)   // TEST TABLE
}


const getDict = () => {
    return http.APIECR.get(`getDict`);
}


const postInputData = (param) => {
    return http.APIECR.post(`postInputData`, param);
}


const postUpdateData = (param) => {
    return http.APIECR.post(`postUpdateData`, param);
}


const getLoadPage = () => {
    return http.APIECR.get(`getLoadPage`);
}

const getDetailCreate = (item) => {
    return http.APIECR.get(`getDetailCreate/${item}`);
}

const getSearchECRNO = (docNo, status) => {
    return http.APIECR.get(`getSearchECRNO/${docNo}/${status}`);
}

const getDeleteDoc = (ecrno) => {
    return http.APIECR.get(`getDeleteDoc/${ecrno}`);
}


const getDetailDIL = (ecrno) => {
    return http.APIECR.get(`getDetailDIL/${ecrno}`);
}




export default {
    getNbr,
    Login,
    getData,
    postInputData,
    postUpdateData,
    getDict,
    getLoadPage,
    getDetailCreate,
    getSearchECRNO,
    getDeleteDoc,
    getDetailDIL,
};