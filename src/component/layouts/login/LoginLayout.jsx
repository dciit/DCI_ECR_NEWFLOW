import React from 'react'
import './Login.css'
import Login from '../../../pages/Login/Login'


function LoginLayout() {

    return (
        <div className='styleBgColor'>
            <div className="Auth-form-container">
                <img src='/public/asset/Image/image-1.png' className='image-1' />
                <div>
                    <h1 className='styleH'>ECR System</h1>
                    <h5 className='styletextP'>Engineering Change Request (ECR)</h5>
                    <Login />
                </div>
                <img src='/public/asset/Image/image-2.png' className='image-2' />
            </div>
        </div >
    )
}

export default LoginLayout

