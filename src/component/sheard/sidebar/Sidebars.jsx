import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/collapse'
import './Sidebar.css'
import SrvPermissiom from '../../../service/getPermisson.js'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie';


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
        // ----- SET REDUX ----- //
        dispatch({ type: 'PERMISSION_ACTIVE', payload: item })
        // ----- SET REDUX ----- //
    };

    return (
        <div className='styleWidthSide'>
            <div className='row' style={{ height: '104pc' }}>
                <div className='styleSidebar'>
                    <ul>

                        {/* HEAD TITLE */}
                        {
                            data.filter((el, ind) => {
                                return el.menuType == "HEAD" || el.menuType == "SUB"
                            }).map((item, index) => {
                                return item.menuType == "HEAD" ?
                                    <li>
                                        <label className='nav-link pk-2 ' style={{ backgroundColor: "#73766c", fontSize: '18px' }}>
                                            <i style={{ color: 'lightyellow' }} className={item.menuIcon} /><span className='styleicon'><label style={{ color: 'white' }}>{item.menuTitle}</label></span>
                                        </label>
                                    </li>
                                    :
                                    <li >
                                        <a className='nav-link pk-2' href={item.menuUrl} id='colorText' onClick={() => handleActive(item)}>
                                            <i className={item.menuIcon} /><span className='styleicon'>{item.menuTitle}</span>
                                        </a>
                                    </li>
                            })
                        }
                        {/* END  HEAD TITLE */}
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default Sidebars



