import { SOAP_URL_PART, TEST_API, API_ECR, API_REPORT, API_ADDFILE, API_DELETEFILE, API_CHAT, API_HEADER, API_DETAIL, API_PERMISSION, API_HOLD, API_RETURN, API_ASSIGNED, API_CHECKDOCUMENT, API_APPROVEDDOCUMENT } from "./constant"; // *{ อย่าลืมเรียก Part URL }*
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

// DELETE FILE
const APIDeleteFile = Axios.create({
    baseURL: API_DELETEFILE,
    headers: {
        'Content-Type': 'application/json'
    }
})
// END DELETE FILE


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


//  HOLD
const APIHOLD = Axios.create({
    baseURL: API_HOLD,
    headers: {
        'Content-Type': 'application/json'
    }
})
// END HOLD


//  RETURN
const APIRETURN = Axios.create({
    baseURL: API_RETURN,
    headers: {
        'Content-Type': 'application/json'
    }
})
// END RETURN


//  ASSIGNED
const APIASSIGNED = Axios.create({
    baseURL: API_ASSIGNED,
    headers: {
        'Content-Type': 'application/json'
    }
})
// END ASSIGNED



//  CHECK DOCUMENT
const APICHECKDOC = Axios.create({
    baseURL: API_CHECKDOCUMENT,
    headers: {
        'Content-Type': 'application/json'
    }
})
// END CHECK DOCUMENT


//  APPROVED DOCUMENT
const APIAPPROVEDDOC = Axios.create({
    baseURL: API_APPROVEDDOCUMENT,
    headers: {
        'Content-Type': 'application/json'
    }
})
// END APPROVED DOCUMENT


export default {
    SOAP,
    TEST,
    APIECR,
    REPORT,
    SaveFile,
    APIDeleteFile,
    APICHAT,
    APIHEADER,
    APIDETAIL,
    APIPERMISSION,
    APIHOLD,
    APIRETURN,
    APIASSIGNED,
    APICHECKDOC,
    APIAPPROVEDDOC,
};