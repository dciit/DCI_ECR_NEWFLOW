import React, { useState } from 'react'
import LoginLayout from '../../component/layouts/login/LoginLayout';
import Swal from "sweetalert2";
import LoginService from '../../service/loginService.js'
import { Link, useNavigate } from "react-router-dom";
import { BsFillLockFill, BsFillPersonFill } from "react-icons/bs";
import './Login.css'
import jsCookie from 'js-cookie';


function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [failLogin, setfailLogin] = useState(false);  // set ค่าเริ่มต้นตอนเปิดหน้า login ให้ตัวแปร failLogin เป็น false



    const login = (event) => {
        event.preventDefault();
        LoginService.Login(username, password).then((res) => {
            try {
                if (res.data[0].EmpCode != null) {
                    // localStorage.setItem("code", res.data[0].EmpCode);
                    // localStorage.setItem("name", res.data[0].ShortName);
                    // localStorage.setItem("section", res.data[0].DEPT_Short);
                    jsCookie.set("code", res.data[0].EmpCode, { expires: 7 })
                    jsCookie.set("name", res.data[0].ShortName, { expires: 7 })
                    jsCookie.set("section", res.data[0].DEPT_Short, { expires: 7 })
                    navigate("/createform");
                    location.reload();
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
        <form className="card p4 col-md-12" onSubmit={login}>
            <div className='styleImg'>
                <img src="/public/asset/Image/DAIKIN_logo.svg.png" height={40} />
            </div>
            <img src="/public/asset/Image/user.jpg" className='styleImgUser' />
            <div className="form-group mt-3">
                <div>
                    <p className='styleP'>Login ด้วย Username / Password เข้าเครื่องคอม</p>
                </div>
                <span className='stylespan'> <BsFillPersonFill /></span>
                <label>Username</label>
                <input
                    type="text"
                    id='username'
                    value={username}
                    autoComplete="username"
                    className="form-control mt-1"
                    // placeholder="Username"
                    onChange={(event) => setUsername(event.target.value)}
                    required
                />
            </div>
            <div>
                <span className='stylespan'> <BsFillLockFill /></span>
                <label>Password</label>
                <input
                    type="password"
                    id="password"
                    className="form-control mt-1"
                    // placeholder="Enter password"
                    autoComplete="current-password"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    required
                />
            </div>
            <div className='btnLogin'>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </div>

            {failLogin && <span className='styleError'>รหัสผ่านไม่ถูกต้อง กรุณาลองอีกครั้ง !!!</span>}    {/* ถ้าเปิดหน้า Login มา ตัวแปร failLogin มีค่าเป็น false ให้แสดงข้อความนี้ */}

            <p className="forgot-password text-right mt-2">
            </p>
        </form>

    )
}

export default Login