import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import getDataFile from '../../service/getFileAttech.js'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { FcFullTrash } from "react-icons/fc";
import { LuLink } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import './ModelAttachFile.css'
import { useDropzone } from 'react-dropzone';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



function ModelAttachFile(props) {
    const { show, close, item } = props;
    // const empCode = localStorage.getItem("name");
    const empCode = Cookies.get('code')
    const [copyPath, setCopyPath] = useState('');
    const ref = useRef();
    const permission = useSelector((state) => state.reducer.permission);


    useEffect(() => {
        initFiles();
    }, [show]);

    // ************SHOW FILE************
    const [showFile, setshowFile] = useState([]);
    const initFiles = () => {
        getDataFile.getShowFile(item.ecrno).then((res) => {
            try {
                setshowFile(res.data);
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    // ************END  SHOW FILE ************


    // ************ ADD FILE  ************
    const [selectedFile, setSelectedFile] = useState('');


    const changeHandler = (event) => {
        // setPathPDF(event.target.files[0]);
        setSelectedFile(event.target.files[0]);
    };


    const [pathPDF, setPathPDF] = useState('');
    const [path, setPath] = useState('');




    // var W3CDOM = (document.createElement && document.getElementsByTagName);

    // function initFileUploads() {
    //     if (!W3CDOM) return;
    //     var fakeFileUpload = document.createElement('div');
    //     fakeFileUpload.className = 'fakefile';
    //     fakeFileUpload.appendChild(document.createElement('input'));
    //     // var image = document.createElement('img');
    //     // image.src = 'pix/button_select.gif';
    //     // fakeFileUpload.appendChild(image);
    //     var x = document.getElementsByTagName('input');
    //     for (var i = 0; i < x.length; i++) {
    //         if (x[i].type != 'file') continue;
    //         if (x[i].parentNode.className != 'fileinputs') continue;
    //         x[i].className = 'file hidden';
    //         var clone = fakeFileUpload.cloneNode(true);
    //         x[i].parentNode.appendChild(clone);
    //         x[i].relatedElement = clone.getElementsByTagName('input')[0];
    //         x[i].onchange = x[i].onmouseout = function () {
    //             this.relatedElement.value = this.value;
    //             setPath(this.value);
    //         }
    //     }
    // }






    const handleClear = () => {
        ref.current.value = null;
    }

    let sectionFile = showFile[0]?.section
    let secPermission = permission[0]?.grpRoleSect


    const handleSubmission = () => {
        if (selectedFile != '' && copyPath != '') {
            getDataFile.postFile({
                ECRNO: item.ecrno, SECTION: secPermission, DOCNAME: item.title, ACTION: 'UPDATE', LOGBY: empCode, FileAttached: selectedFile, StatusFile: 'INSERT', FILEPATH: copyPath
            }).then((res) => {
                try {
                    initFiles();
                    handleClear();
                    setSelectedFile('');
                    setCopyPath('');
                }
                catch (error) {
                    console.log(error);
                    return error;
                }
            });
        }
        else {
            alert("กรุณากรอก Path File และ เลือกไฟล์ ให้ครบ");
        }
    };
    // ************END  ADD FILE  ************



    // ************DELETE************
    const handleDelete = (docid) => {
        getDataFile.getDeleteFile(docid).then((res) => {
            try {
                initFiles();
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    };
    // ************END  DELETE************

    const handelCose = (event) => {
        close(false);
    }


    const OpenFile = (pathfilename) => {
        // navigate(`/ECR/PrintPage/${ecrno}`,
        // );
        window.open(`http://dciweb.dci.daikin.co.jp/ECR/asset/FileAttech/${pathfilename}`, '_blank', 'noopener,noreferrer');
    }


    return (
        <>
            <BootstrapDialog
                open={show}
            >
                <Dialog
                    open={show}
                    fullWidth
                    maxWidth="md"
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        <Row>
                            <Col xs={12} md={7}>
                                <b><h1>Add File</h1></b>
                                {/* <>1={path}</>
                                <>2={pathPDF}</> */}
                            </Col>
                            <Col xs={12} md={5}>
                                <p>ECR NO : {item.ecrno}</p>
                            </Col>
                        </Row>
                    </DialogTitle>
                    <IconButton aria-label="close" onClick={handelCose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            <Container>
                                <Row>
                                    <Col xs={12} md={5}>
                                        {
                                            permission.filter((item) => {
                                                return item.menuCode == "BTN0002" && item.rolE_VIEW == "True"
                                            }).length ? <>
                                                <p>-</p>
                                                <input type="file" name="file" accept='application/pdf' ref={ref} onChange={changeHandler} />
                                            </>
                                                :
                                                ""
                                        }
                                    </Col>
                                    <Col xs={12} md={6}>
                                        {/* <div style={{ display: 'flex' }}>
                                            <div class="fileinputs">
                                                <input type="file" class="file" style={{ width: '300px' }} onChange={initFileUploads} />
                                                <div class="fakefile">
                                                    <input />
                                                    <button>Browse..</button>
                                                </div>
                                            </div>
                                        </div> */}


                                        <div>
                                            {
                                                permission.filter((item) => {
                                                    return item.menuCode == "BTN0003" && item.rolE_VIEW == "True"
                                                }).length ? <>
                                                    <p>วาง Path File ที่นี้ <span style={{ color: 'red', fontSize: '18px' }}>*</span></p>
                                                    <input type="text" autoFocus style={{ width: '390px' }} value={copyPath} onChange={(event) => setCopyPath(event.target.value)} />
                                                </>
                                                    :
                                                    ""
                                            }
                                        </div>


                                    </Col>
                                    <Col xs={12} md={1}>
                                        {
                                            permission.filter((item) => {
                                                return item.menuCode == "BTN0003" && item.rolE_VIEW == "True"
                                            }).length ? <Button variant="success" onClick={(e) => { handleSubmission() }}>Add</Button>
                                                :
                                                ""
                                        }
                                    </Col>
                                </Row>
                            </Container>
                            <br></br>
                            {/* {
                                JSON.stringify(showFile)
                            } */}
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">#</StyledTableCell>
                                            <StyledTableCell align="center">File Name</StyledTableCell>
                                            <StyledTableCell align="center">File Path</StyledTableCell>
                                            <StyledTableCell align="center">Section</StyledTableCell>
                                            <StyledTableCell align="center">Add By</StyledTableCell>
                                            <StyledTableCell align="center">Add Date</StyledTableCell>
                                            <StyledTableCell align="center">Detail</StyledTableCell>
                                            <StyledTableCell align="center">Delete</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            showFile?.map((item, index) => {
                                                return <StyledTableRow key={item.docid}>
                                                    <StyledTableCell align="center">{item.no}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.filename}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.filepath}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.section}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.addfileby}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.addfiledate}</StyledTableCell>
                                                    <StyledTableCell align="center" style={{ color: '#0e68ff' }}>
                                                        {/* <a href={`http://dciweb.dci.daikin.co.jp/ECR/asset/FileAttech/${item.pathfilename}`}> <LuLink></LuLink>
                                                        </a> */}
                                                        <LuLink onClick={() => OpenFile(item.pathfilename)}>
                                                        </LuLink>
                                                    </StyledTableCell>

                                                    {
                                                        permission.filter((item) => {
                                                            return item.menuCode == "BTN0003" && item.rolE_VIEW == "True"
                                                        }).length ? item.section == secPermission ?
                                                            <StyledTableCell align="center" onClick={() => handleDelete(item.docid)}><Link><FcFullTrash></FcFullTrash></Link></StyledTableCell>
                                                            :
                                                            <StyledTableCell />
                                                            : ""
                                                    }
                                                </StyledTableRow>
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="secondary" onClick={handelCose}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </BootstrapDialog >
        </>
    )
}

export default ModelAttachFile