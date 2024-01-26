import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar';
import { LuCake, LuCrown, LuEar, LuExpand, LuFoldHorizontal, LuItalic, LuLogOut, LuTextCursor } from "react-icons/lu";
import './Navbar.css'
import Cookies from 'js-cookie';


const dep = localStorage.getItem("DEPT_Long");
// const empCode = localStorage.getItem("code");
// const user_name = localStorage.getItem("name");
const empCode = Cookies.get('code')
const user_name = Cookies.get('name')
const img_user = "http://dcidmc.dci.daikin.co.jp/PICTURE/" + empCode + ".jpg"
import ENTool from '../../../../public/asset/Image/ENTool.png'

function Navbars() {
    const logout = () => {
        Cookies.remove('code');
        Cookies.remove('name');
        Cookies.remove('section');
        location.reload();
    }

    return (
        <>
            <Navbar style={{ backgroundColor: 'rgb(52 58 64)' }}>
                <Container>
                    <div class="container">
                        <div class="row">
                            <div class="col-12" style={{ width: '45%' }}>
                                <label className='stylelb'><img src={ENTool} />ECR</label>
                                <p className='gradiantTitle'>Engineering Change Request</p>
                            </div>
                        </div>
                    </div>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                <div className='navbarstyle'>
                    <img src={img_user} alt={empCode} className='styleImage' />
                    <span className='styleText'>{empCode}</span>
                    <span className='styleText'> : </span>
                    <span class="username">
                        <span className='styleText'>{user_name}</span>
                    </span>

                    <a className='styleLogin' href="/ECR/Login" id='colorText' >
                        <LuLogOut />
                        <span onClick={logout}>Log out</span>
                    </a>
                </div>
            </Navbar>
        </>
    )
}

export default Navbars