import { SOAP_URL_PART, TEST_API, API_ECR, API_REPORT, API_ADDFILE, API_CHAT, API_HEADER, API_DETAIL, API_PERMISSION } from "./constant"; // *{ อย่าลืมเรียก Part URL }*
import Axios from "axios"

// LOGIN
const SOAP = Axios.create({
    baseURL: SOAP_URL_PART,
    headers: {
        'Content-Type': 'application/json'
    }
})
// LOGIN


const TEST = Axios.create({
    baseURL: TEST_API,
    headers: {
        'Content-Type': 'application/json'
    }
})

// ITEM PU
const APIECR = Axios.create({
    baseURL: API_ECR,
    headers: {
        'Content-Type': 'application/json'
    }
})
// ITEM PU



// REPORT
const REPORT = Axios.create({
    baseURL: API_REPORT,
    headers: {
        'Content-Type': 'application/json'
    }
})
// END REPORT


// SAVE FILE
const SaveFile = Axios.create({
    baseURL: API_ADDFILE,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})
// SAVE FILE




// CHAT
const APICHAT = Axios.create({
    baseURL: API_CHAT,
    headers: {
        'Content-Type': 'application/json'
    }
})
// END CHAT



//  HEADER
const APIHEADER = Axios.create({
    baseURL: API_HEADER,
    headers: {
        'Content-Type': 'application/json'
    }
})
// END HEADER



//  DETAIL
const APIDETAIL = Axios.create({
    baseURL: API_DETAIL,
    headers: {
        'Content-Type': 'application/json'
    }
})
// END DETAIL


//  PERMISSION
const APIPERMISSION = Axios.create({
    baseURL: API_PERMISSION,
    headers: {
        'Content-Type': 'application/json'
    }
})
// END PERMISSION





export default {
    SOAP,
    TEST,
    APIECR,
    REPORT,
    SaveFile,
    APICHAT,
    APIHEADER,
    APIDETAIL,
    APIPERMISSION,
};