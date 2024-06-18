import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
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
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



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
    const user_name = Cookies.get('name')
    const [permis, setpermis] = useState([]);
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
        window.open(`http://dciweb.dci.daikin.co.jp/ECR/asset/FileAttech/${pathfilename}`, '_blank', 'noopener,noreferrer');
    }


    const [checked, setChecked] = React.useState(true);
    const handleChange = (event) => {
        setChecked(event.target.checked);
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


                                {/* <Row>
                                    <Col xs={12} md={4}>
                                        {
                                            permission.filter((item) => {
                                                return item.menuCode == "BTN0002" && item.rolE_VIEW == "True"
                                            }).length ? <>
                                                <p>ไฟล์ :</p>
                                                <input type="file" name="file" accept='application/pdf' ref={ref} onChange={changeHandler} />
                                            </>
                                                :
                                                ""
                                        }
                                    </Col>
                                    <Col xs={12} md={2}>
                                        <p>ไม่ระบุ</p>
                                        <Checkbox
                                            checked={checked}
                                            onChange={handleChange}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </Col>
                                    <Col xs={12} md={5}>
                                        <p>REMARK <span style={{ color: 'red', fontSize: '18px' }}>*</span></p>
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            multiline
                                            maxRows={5}
                                            style={{ width: '300px' }}
                                        />
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
                                </Row> */}



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
                                        <div>
                                            {
                                                permission.filter((item) => {
                                                    return item.menuCode == "BTN0003" && item.rolE_VIEW == "True"
                                                }).length ? <>
                                                    <p>วาง Path File ที่นี้ <span style={{ color: 'red', fontSize: '18px' }}>*</span></p>
                                                    <input type="text" autoFocus style={{ width: '390px' }} value={copyPath} onChange={(event) => setCopyPath(event.target.value)} />
                                                </> : ""
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
                                <br></br>
                            </Container>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">No</StyledTableCell>
                                            <StyledTableCell align="center">File Name</StyledTableCell>
                                            <StyledTableCell align="center">File Path</StyledTableCell>
                                            <StyledTableCell align="center">Section</StyledTableCell>
                                            <StyledTableCell align="center">Add By</StyledTableCell>
                                            <StyledTableCell align="center">Add Date</StyledTableCell>
                                            <StyledTableCell align="center">Detail</StyledTableCell>
                                            <StyledTableCell align="center">Delete</StyledTableCell>
                                            <StyledTableCell align="center"></StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            showFile?.map((item, index) => {
                                                console.log(item.addfileby, user_name)
                                                return <StyledTableRow key={item.docid}>
                                                    <StyledTableCell align="center">{item.no}</StyledTableCell>
                                                    <StyledTableCell align="left">{item.filename}</StyledTableCell>
                                                    <StyledTableCell align="left">{item.filepath}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.section}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.addfileby}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.addfiledate}</StyledTableCell>
                                                    <StyledTableCell align="center" style={{ color: '#0e68ff' }}>
                                                        <LuLink onClick={() => OpenFile(item.pathfilename)}>
                                                        </LuLink>
                                                    </StyledTableCell>


                                                    {
                                                        item.addfileby == user_name && <>
                                                            <StyledTableCell align="center" onClick={() => handleDelete(item.docid)}><Link><FcFullTrash></FcFullTrash></Link></StyledTableCell>
                                                            <StyledTableCell />
                                                        </>
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