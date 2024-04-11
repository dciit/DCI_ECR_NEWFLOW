import { React, useEffect, useState } from 'react'
import Navbars from '../../sheard/navbar/Navbars'
import Sidebars from '../../sheard/sidebar/Sidebars'
import Footer from '../../sheard/Footer/Footers'
import { Outlet } from 'react-router-dom'
import './Backend.css'
import jsCookie from 'js-cookie';
import LoginLayout from '../login/LoginLayout'



function Backend() {
    const [login, setLogin] = useState();
    useEffect(() => {
        setLogin(jsCookie.get('name'));
    }, [])

    return (
        <div>
            {
                (login == "" || login == "undefined" || typeof login == 'undefined') ? <LoginLayout />
                    //(login == "" || login == "undefined" || typeof login == 'undefined') ? <Login />
                    :
                    <div>
                        <Navbars />
                        <div className='styleNavbar'>
                            <Sidebars />
                            <Outlet />
                        </div>
                        <Footer />
                    </div>

            }
        </div>
    )
}

export default Backend