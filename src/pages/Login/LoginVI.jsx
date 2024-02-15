import React, { useState } from 'react'
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import './LoginVI.css';
import DAIKIN_logo from '../../../public/asset/Image/DAIKIN_logo.svg.png'
import LoginLayout from '../../component/layouts/login/LoginLayout.jsx';
import getDataSrvPermiss from '../../service/getPermisson.js'
import Swal from "sweetalert2";
import LoginService from '../../service/loginService.js'
import { Link, useNavigate } from "react-router-dom";
import { BsFillLockFill, BsFillPersonFill } from "react-icons/bs";
import jsCookie from 'js-cookie';
import User from '../../../public/asset/Image/user.jpg'
import { useDispatch } from 'react-redux'


function LoginVI() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [failLogin, setfailLogin] = useState(false);  // set ค่าเริ่มต้นตอนเปิดหน้า login ให้ตัวแปร failLogin เป็น false
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    const login = (event) => {
        event.preventDefault();
        // LoginService.Login(username, password).then((res) => {
        //     try {
        //         if (res.data[0].EmpCode != null) {
        //             jsCookie.set("code", res.data[0].EmpCode, { expires: 7 })
        //             jsCookie.set("name", res.data[0].ShortName, { expires: 7 })
        //             jsCookie.set("section", res.data[0].DEPT_Short, { expires: 7 })
        //             navigate("/ECR/createform");
        //             location.reload();
        //         }
        //         else {
        //             setfailLogin(true) // ถ้า Login ผิด ให้เป็น true
        //         }
        //     }
        //     catch (error) {
        //         console.log(error); // You might send an exception to your error tracker like AppSignal
        //         return error;
        //     }
        // });

        getDataSrvPermiss.getTestLogin(username).then((res) => {
            try {
                if (res.data[0].code != null) {
                    jsCookie.set("code", res.data[0].code, { expires: 7 })
                    jsCookie.set("name", res.data[0].fullName, { expires: 7 })


                    getDataSrvPermiss.getPermission(username).then((res) => {
                        try {
                            // ----- SET REDUX ----- //
                            dispatch({ type: 'SET_PERMISSION', payload: res.data })
                            // ----- SET REDUX ----- //

                            setData(res.data);
                            navigate("/ECR/createform");
                            location.reload();
                        }
                        catch (error) {
                            console.log(error); // You might send an exception to your error tracker like AppSignal
                            return error;
                        }
                    });
                }
                else {
                    setfailLogin(true) // ถ้า Login ผิด ให้เป็น true
                }
            }
            catch (error) {
                console.log(error); // You might send an exception to your error tracker like AppSignal
                return error;
            }
        });
    };


    return (
        <div style={{ height: '100%' }}>
            <div class="relative">
                <div class="absolute">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" style={{
                        opacity: '0.1', width: '50%',
                        height: 'auto'
                    }} />
                </div>
                <div class="absolute-input">
                    <form onSubmit={login}>
                        <div className="d-flex flex-row align-items-center justify-content-center">
                            <p className='Title' style={{ fontSize: '65px' }}>ECR Online </p>
                        </div>

                        <div className="d-flex flex-row align-items-center justify-content-center">
                            <p>Engineering Change Request (ECR)</p>
                        </div>

                        <div className="d-flex flex-row align-items-center justify-content-center">
                            <img src={DAIKIN_logo} height={40} />
                        </div>


                        <div className="divider d-flex align-items-center my-4">
                        </div>

                        <p><b>รหัสพนักงาน</b></p>
                        <MDBInput wrapperClass='mb-4' id='username' type='text' size="lg"
                            value={username}
                            autoComplete="username"
                            className="form-control mt-1"
                            onChange={(event) => setUsername(event.target.value)}
                            required />


                        {/* <p><b>Password</b></p>
                        <MDBInput wrapperClass='mb-4' id='password' type='password' size="lg"
                            value={password}
                            autoComplete="password"
                            className="form-control mt-1"
                            onChange={(event) => setPassword(event.target.value)}
                            required /> */}


                        <div className='text-center text-md-start mt-4 pt-2'>
                            <MDBBtn type="submit" className="mb-0 px-5" size='lg'>Login</MDBBtn>
                        </div>

                        <div className="d-flex flex-row align-items-center justify-content-center">
                            <p></p>
                        </div>

                        <div className="d-flex flex-row align-items-center justify-content-center">
                            <p style={{ color: 'blue' }}>Login ด้วย Username / Password เข้าเครื่องคอม</p>
                        </div>


                        {failLogin && <span className='styleError'>รหัสผ่านไม่ถูกต้อง กรุณาลองอีกครั้ง !!!</span>}    {/* ถ้าเปิดหน้า Login มา ตัวแปร failLogin มีค่าเป็น false ให้แสดงข้อความนี้ */}
                    </form>
                </div>
            </div>

            <MDBContainer fluid className="p-3 my-5 h-custom" style={{ display: 'none' }}>
                <MDBRow>
                    <MDBCol col='10' md='12' className="d-flex flex-row align-items-center justify-content-center">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" style={{ opacity: '0.3' }} />
                    </MDBCol>
                    <MDBCol col='4' md='12'>
                        <form onSubmit={login}>
                            <div className="d-flex flex-row align-items-center justify-content-center">
                                <p className='Title' style={{ fontSize: '65px' }}>ECR Online </p>
                            </div>

                            <div className="d-flex flex-row align-items-center justify-content-center">
                                <p>Engineering Change Request (ECR)</p>
                            </div>

                            <div className="d-flex flex-row align-items-center justify-content-center">
                                <img src={DAIKIN_logo} height={40} />
                            </div>

                            <div className="divider d-flex align-items-center my-4">
                            </div>

                            <p><b>รหัสพนักงาน</b></p>
                            <MDBInput wrapperClass='mb-4' id='username' type='text' size="lg"
                                value={username}
                                autoComplete="username"
                                className="form-control mt-1"
                                onChange={(event) => setUsername(event.target.value)}
                                required />

                            <div className='text-center text-md-start mt-4 pt-2'>
                                <MDBBtn type="submit" className="mb-0 px-5" size='lg'>Login</MDBBtn>
                            </div>

                            {failLogin && <span className='styleError'>รหัสผ่านไม่ถูกต้อง กรุณาลองอีกครั้ง !!!</span>}    {/* ถ้าเปิดหน้า Login มา ตัวแปร failLogin มีค่าเป็น false ให้แสดงข้อความนี้ */}
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer >
        </div>
    )
}

export default LoginVI