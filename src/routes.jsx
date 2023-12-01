import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import { BrowserRouter } from "react-router-dom";
import LoginLayout from "./component/layouts/login/LoginLayout";
import Home from "./pages/Home/Home";
import Backend from "./component/layouts/backend/Backend";
import Createform from "./pages/Create/Createform";
import Print from "./pages/Print/Print";
import Chat from "./pages/Chat/Chat";
import Detail from "./pages/Create/FormDetail";
import AddPermissions from "./pages/Home/AddPermissions";
import Test from "./pages/Create/Test";
let logintrue = false
logintrue = localStorage.getItem('logintrue', false)


const Routess = () => {
    const BASE_PATH = 'ECR'
    return (
        <BrowserRouter>
            <Routes>
                {/* Frontend */}
                <Route path="*" element={<LoginLayout />} />
                <Route path="/Login" element={<LoginLayout />} />

                <Route element={<Backend />}>
                    <Route path={BASE_PATH + '/createform'} element={<Createform />} />
                    <Route path={BASE_PATH + '/home'} element={<Home />} />
                    <Route path={BASE_PATH + '/AddPermissions'} element={<AddPermissions />} />
                    <Route path={BASE_PATH + '/Print/:ecrno'} element={<Print />} />
                    <Route path={BASE_PATH + '/Chat/:ecrno'} element={<Chat />} />
                    <Route path={BASE_PATH + '/ModalDetail'} element={<Detail />} />
                    <Route path={BASE_PATH + '/PrintTest'} element={<Test />} />
                </Route>
            </Routes>
        </BrowserRouter >
    );
};

export default Routess;