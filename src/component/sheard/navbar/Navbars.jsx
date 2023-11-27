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

function Navbars() {
    const logout = () => {
        Cookies.remove('code');
        Cookies.remove('name');
        Cookies.remove('section');
        location.reload();
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <div style={{ width: '31%' }}>
                        <label className='stylelb'><img src="/public/asset/Image/ENTool.png" />ECR</label>
                        <p className='gradiantTitle'>Engineering Change Request</p>
                    </div>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/home" id='colorText'>Dashboard</Nav.Link>
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

                    <a className='styleLogin' href="/Login" id='colorText' >
                        <LuLogOut />
                        <span onClick={logout}>Log out</span>
                    </a>
                    {/* <button onClick={logout}>Logout</button> */}
                </div>
                {/* <Navbar.Brand href="#home" style={{ color: 'red' }}>My-Web</Navbar.Brand> */}
            </Navbar>
        </>
    )
}

export default Navbars