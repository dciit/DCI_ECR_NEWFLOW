import React from 'react'
import './Login.css'
import Login from '../../../pages/Login/Login'
import Pic1 from '../../../../public/asset/Image/Pic1.png'
import Picture from '../../../../public/asset/Image/Picture.gif'
import Picture2 from '../../../../public/asset/Image/Picture2.gif'
import Pichon from '../../../../public/asset/Image/Pison.png'


function LoginLayout() {

    return (
        <div className='styleBgColor'>
            {/* <div className="Auth-form-container"> */}
            {/* <div style={{ display: 'flex' }}> */}
            <div class="row" style={{ display: 'flex', alignItems: 'center' }}>
                <div class="col-sm-2">
                    {/* <img src={Picture2} className='image-1' /> */}
                </div>
                <div class="col-sm-8" >
                    {/* <img src={Picture2} className='image-1' /> */}
                    <div style={{ marginLeft: '0%' }}>
                        <h1 className='styleH'>ECR Online (TEST)</h1>
                        <h5 className='styletextP'>Engineering Change Request (ECR)</h5>
                        <Login />
                    </div>
                    {/* <img src={Pichon} className='image-2' /> */}
                </div>
                <div class="col-sm-2">
                    {/* <img src={Pichon} className='image-2' /> */}
                </div>
            </div>
            {/* </div> */}
        </div >
    )
}

export default LoginLayout

