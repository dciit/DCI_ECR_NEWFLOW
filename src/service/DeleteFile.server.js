import http from "../constant/_configAxios"



const PostDeleteFile = (param) => {
    return http.APIDeleteFile.post(`PostDeleteFile`, param);
}




export default {
    PostDeleteFile,
};