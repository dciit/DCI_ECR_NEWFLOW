import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import LoginLayout from "./component/layouts/login/LoginLayout";
import Contact from "./pages/Home/Contact";
import Backend from "./component/layouts/backend/Backend";
import Createform from "./pages/Create/Createform";
import Print from "./pages/Print/Print";
import Chat from "./pages/Chat/Chat";
import Detail from "./pages/Create/FormDetail";
import AddPermissions from "./pages/Home/AddPermissions";
import LoginVI from "./pages/Login/LoginVI";
import PrintComponent from "./pages/Print/PrintComponent";
let logintrue = false
logintrue = localStorage.getItem('logintrue', false)
import ModelAttachFile from "./pages/FileAttached/ModelAttachFile"
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../src/redux/store";
import jsCookie from 'js-cookie';
const Routess = () => {
    const BASE_PATH = 'ECR_APP_TEST';
    // let REDUX_VER = useSelector(state => state.reducer.ver);
    // console.log(REDUX_VER)
    // let ENV_VER = import.meta.env.VITE_VERSION;
    // const dispatch = useDispatch();
    // if (REDUX_VER != ENV_VER) {
    //     console.log(REDUX_VER, ENV_VER)
    //     persistor.purge();
    //     dispatch({ type: 'RESET', payload: ENV_VER });
    //     jsCookie.remove('name');
    //     location.reload();
    // }

    return (
        <BrowserRouter>
            <Routes>
                {/* Frontend */}
                {/* <Route path="*" element={<LoginLayout />} />
                <Route path="/Login" element={<LoginLayout />} /> */}
                <Route path="*" element={<LoginVI />} />
                <Route path="/Login" element={<LoginVI />} />
                <Route path={BASE_PATH + '/PrintPage/:ecrno'} element={<PrintComponent />} />
                <Route path={BASE_PATH + '/LoginVI'} element={<LoginVI />} />
                <Route element={<Backend />}>
                    <Route path={BASE_PATH + '/createform'} element={<Createform />} />
                    <Route path={BASE_PATH + '/Contact'} element={<Contact />} />
                    <Route path={BASE_PATH + '/AddPermissions'} element={<AddPermissions />} />
                    <Route path={BASE_PATH + '/PrintPage/:ecrno'} element={<PrintComponent />} />
                    <Route path={BASE_PATH + '/Chat/:ecrno'} element={<Chat />} />
                    <Route path={BASE_PATH + '/ModalDetail'} element={<Detail />} />
                    <Route path={BASE_PATH + '/a'} element={<ModelAttachFile />} />
                </Route>
            </Routes>
        </BrowserRouter >
    );
};

export default Routess;