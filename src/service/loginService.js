import http from "../constant/_configAxios"
// Method Get all product

// step 1 create fuction
const Login = (username, password) => {
    return http.SOAP.get(`authen?username=${username}&password=${encodeURIComponent(password)}`);
};

export default {
    Login,
};