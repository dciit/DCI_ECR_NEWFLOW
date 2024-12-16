import React from 'react'
import './Login.css'
import Pic1 from '../../../../public/asset/Image/Pic1.png'
import Picture from '../../../../public/asset/Image/Picture.gif'
import Picture2 from '../../../../public/asset/Image/Picture2.gif'
import Pichon from '../../../../public/asset/Image/Pison.png'
import LoginVI from '../../../pages/Login/LoginVI'

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
                        <LoginVI />
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

