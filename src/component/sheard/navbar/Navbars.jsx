// import React from 'react'
// import { Button, Container, Nav } from 'react-bootstrap'
// import Navbar from 'react-bootstrap/Navbar';
// import { LuCake, LuCrown, LuEar, LuExpand, LuFoldHorizontal, LuItalic, LuLogOut, LuTextCursor } from "react-icons/lu";
// import './Navbar.css'
// import Cookies from 'js-cookie';
// import ENTool from '../../../../public/asset/Image/ENTool.png'



// function Navbars() {
//     const dep = localStorage.getItem("DEPT_Long");
//     const empCode = Cookies.get('code')
//     const user_name = Cookies.get('name')
//     const img_user = "http://dcidmc.dci.daikin.co.jp/PICTURE/" + empCode + ".jpg"
//     const [value, setValue] = React.useState(0);
//     const logout = () => {
//         Cookies.remove('code');
//         Cookies.remove('name');
//         Cookies.remove('section');
//         location.reload();
//     }

//     return (
//         <>
//             <Navbar style={{ backgroundColor: '#343a40' }}>
//                 <Container>
//                     <div class="container">
//                         <div class="row">
//                             <div class="col-12" style={{ width: '40%' }}>
//                                 <label className='stylelb'><img src={ENTool} style={{ width: '55px' }} />ECR</label>
//                                 <p className='gradiantTitle'>Engineering Change Request</p>
//                             </div>
//                         </div>
//                     </div>
//                 </Container>
//                 <div className='navbarstyle'>
//                     <img src={img_user} alt={empCode} className='styleImage' />
//                     <span className='styleText'>{empCode}</span>
//                     <span className='styleText'> : </span>
//                     <span class="username">
//                         <span className='styleText'>{user_name}</span>
//                     </span>

//                     <a className='styleLogin' href="/ECR/Login" id='colorText' >
//                         <LuLogOut />
//                         <span onClick={logout}>Log out</span>
//                     </a>
//                 </div>
//             </Navbar>
//         </>
//     )
// }

// export default Navbars


import React, { useEffect, useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Container, Avatar, Button, Tooltip, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import Daikin100 from '../../../../public/asset/Image/Daikin100.png';
import SrvPermissiom from '../../../service/getPermisson.js';
import './Navbar.css'
import ENTool from '../../../../public/asset/Image/ENTool.png'
import { LuCake, LuCrown, LuEar, LuExpand, LuFoldHorizontal, LuItalic, LuLogOut, LuTextCursor } from "react-icons/lu";

const Navbars = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const empCode = Cookies.get('code');
    const user_name = Cookies.get('name');
    const img_user = `http://dcidmc.dci.daikin.co.jp/PICTURE/${empCode}.jpg`;
    const [data, setData] = useState([]);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    useEffect(() => {
        SrvPermissiom.getPermission(empCode).then((res) => {
            dispatch({ type: 'SET_PERMISSION', payload: res.data });
            setData(res.data);
        }).catch((error) => console.error(error));
    }, [empCode, dispatch]);

    const logout = () => {
        Cookies.remove('code');
        Cookies.remove('name');
        Cookies.remove('section');
        location.reload();
    };

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    // const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);

    const isAdmin = data.some(item => item.grpRoleSect === "ADMIN");
    const pages = isAdmin ? ['Add Permission', 'รายการ ECR', 'Contact'] : ['รายการ ECR', 'Contact'];

    const handleActive = (page) => {
        if (page === 'Add Permission') navigate('/ECR_APP_TEST/AddPermissions');
        else if (page === 'รายการ ECR') navigate('/ECR_APP_TEST/createform');
        else if (page === 'Contact') navigate('/ECR_APP_TEST/Contact');
        dispatch({ type: 'PERMISSION_ACTIVE', payload: page });
    };

    return (
        <AppBar position="static" style={{ backgroundColor: 'rgb(37 64 90)' }}>
            <Container maxWidth="lx2">
                <Toolbar>

                    {/* <img src={ENTool} style={{ width: '55px' }} /> */}

                    <img
                        src={Daikin100}
                        alt="Logo"
                        style={{
                            width: '13%',
                            maxWidth: '100%',  // ให้ภาพไม่เกินขนาดของคอนเทนเนอร์
                            height: 'auto',    // รักษาสัดส่วนของภาพ
                            marginTop: '-38px'
                        }}
                    />

                    <p
                        className="gradiantTitle"
                        sx={{
                            fontSize: {
                                xs: '16px',  // ขนาดข้อความในหน้าจอเล็ก (มือถือ)
                                sm: '18px',  // ขนาดข้อความในหน้าจอขนาดกลาง (แท็บเล็ต)
                                md: '24px'   // ขนาดข้อความในหน้าจอขนาดใหญ่ (เดสก์ท็อป)
                            },
                            textAlign: 'center', // จัดข้อความให้อยู่ตรงกลาง
                        }}
                    >
                        Engineering Change Request
                    </p>


                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;



                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton onClick={handleOpenNavMenu} color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorElNav}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={() => handleActive(page)}>
                                    <Typography>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button key={page} onClick={() => handleActive(page)} sx={{ color: 'white' }}>
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Box>
                        <Tooltip title="User Settings">
                            <IconButton>
                                <Avatar src={img_user} /> &nbsp; &nbsp;
                                <span className='styleText'>{empCode}</span>
                                <span className='styleText'> : </span>
                                <span class="username">
                                    <span className='styleText'>{user_name}</span>
                                </span>

                                <a className='styleLogin' href="/ECR_APP_TEST/Login" id='colorText' >
                                    <LuLogOut />
                                    <span onClick={logout}></span>
                                </a>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={() => setAnchorElUser(null)}
                        >
                            <MenuItem onClick={logout}>
                                <Typography>Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbars;
