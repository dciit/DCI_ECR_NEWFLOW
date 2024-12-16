import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/collapse'
import './Sidebar.css'
import SrvPermissiom from '../../../service/getPermisson.js'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie';
import { Divider } from 'rsuite'


function Sidebars() {
    // const empCode = localStorage.getItem("code");
    const empCode = Cookies.get('code')
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        loadPage();
    }, [])


    function loadPage() {
        SrvPermissiom.getPermission(empCode).then((res) => {
            try {
                // ----- SET REDUX ----- //
                dispatch({ type: 'SET_PERMISSION', payload: res.data })
                // ----- SET REDUX ----- //
                setData(res.data);
            }
            catch (error) {
                console.log(error); // You might send an exception to your error tracker like AppSignal
                return error;
            }
        });
    }

    const handleActive = (item) => {
        alert(item)
        // ----- SET REDUX ----- //
        dispatch({ type: 'PERMISSION_ACTIVE', payload: item })
        // ----- SET REDUX ----- //
    };

    return (
        <>
            <div className='styleWidthSide'>
                <div className='row' style={{ height: '104pc' }}>
                    <div className='styleSidebar'>
                        <ul>
                            {
                                data.filter((item) => {
                                    return item.grpRoleSect == "ADMIN"
                                }).length ? <>
                                    <li>
                                        <label className='nav-link pk-2 ' style={{ backgroundColor: "#676768", fontSize: '16px' }}>
                                            <i style={{ color: 'lightyellow' }} className='bi-lock-fill' /><span className='styleicon'><label style={{ color: 'white' }}>Permisson</label></span>
                                        </label>
                                    </li>

                                    <li >
                                        <a className='nav-link pk-2' href='/ECR/AddPermissions' id='colorText' onClick={() => handleActive(item)} style={{ backgroundColor: '#343a40' }}>
                                            <i className='bi-person-fill-check' /><span className='styleicon'>Add Permission</span>
                                        </a>
                                    </li>
                                </> : ""
                            }


                            <li>
                                <label className='nav-link pk-2 ' style={{ backgroundColor: "#676768", fontSize: '16px' }}>
                                    <i style={{ color: 'lightyellow' }} className='bi bi-telephone-fill' /><span className='styleicon'><label style={{ color: 'white' }}>Contact</label></span>
                                </label>
                            </li>

                            <li >
                                <a className='nav-link pk-2' href='/ECR/Contact' id='colorText' onClick={() => handleActive(item)} style={{ backgroundColor: '#343a40' }}>
                                    <i class="bi bi-headset"></i><span className='styleicon'>Contact</span>
                                </a>
                            </li>

                            <li>
                                <label className='nav-link pk-2 ' style={{ backgroundColor: "#676768", fontSize: '16px' }}>
                                    <i style={{ color: 'lightyellow' }} className='bi-stack' /><span className='styleicon'><label style={{ color: 'white' }}>Menu</label></span>
                                </label>
                            </li>

                            <li >
                                <a className='nav-link pk-2' href='/ECR/createform' id='colorText' onClick={() => handleActive(item)} style={{ backgroundColor: '#343a40' }}>
                                    <i className='bi-rocket-takeoff' /><span className='styleicon'>รายการ ECR</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Sidebars



