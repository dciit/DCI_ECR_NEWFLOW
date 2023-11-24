import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
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
    const { show, close, item, section } = props;
    // const empCode = localStorage.getItem("name");
    const empCode = Cookies.get('code')
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
        setSelectedFile(event.target.files[0]);
    };

    const handleClear = () => {
        ref.current.value = null;
    }


    const handleSubmission = () => {
        getDataFile.postFile({
            ECRNO: item.ecrno, SECTION: section, DOCNAME: item.title, ACTION: 'UPDATE', LOGBY: empCode, FileAttached: selectedFile, StatusFile: 'INSERT'
        }).then((res) => {
            try {
                // if (Object.keys(res.data).length) {
                initFiles();
                handleClear()
                // }
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
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

    return (
        <>
            {
                JSON.stringify(close)
            }
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
                            <Col xs={12} md={6}>
                                <b><h1>Add File</h1></b>
                            </Col>
                            <Col xs={12} md={1}>
                            </Col>
                            <Col xs={12} md={4}>
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
                                    <Col xs={12} md={11}>
                                        {
                                            permission.filter((item) => {
                                                return item.menuCode == "BTN0002" && item.rolE_VIEW == "True"
                                            }).length ? <input type="file" name="file" accept='application/pdf' ref={ref} onChange={changeHandler} />
                                                :
                                                ""
                                        }
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
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">#</StyledTableCell>
                                            <StyledTableCell align="center">File Name</StyledTableCell>
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
                                                    <StyledTableCell align="center">{item.docfile}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.section}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.addfileby}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.addfiledate}</StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <a href={`http://localhost:5173/asset/FileAttech/${item.pathfilename}`}> <LuLink></LuLink>
                                                        </a>
                                                    </StyledTableCell>
                                                    {
                                                        permission.filter((item) => {
                                                            return item.menuCode == "BTN0003" && item.rolE_VIEW == "True"
                                                        }).length ? <StyledTableCell align="center" onClick={() => handleDelete(item.docid)}><Link><FcFullTrash></FcFullTrash></Link></StyledTableCell>
                                                            :
                                                            <StyledTableCell />
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



        // <Modal
        //     {...props}
        //     size="lg"
        //     centered
        // >
        //     <Modal.Header closeButton>
        //         <Modal.Title>ECR NO : {item.ecrno} </Modal.Title>
        //         <Modal.Title style={{ display: 'none' }}>Title : {item.title}</Modal.Title>
        //         <Modal.Title style={{ marginTop: '8px', marginLeft: '40%' }}><h6 >Section : {section}</h6></Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>
        //         <Container>
        //             <Row>
        //                 <Col xs={12} md={8}>
        //                     {
        //                         permission.filter((item) => {
        //                             return item.menuCode == "BTN0002" && item.rolE_VIEW == "True"
        //                         }).length ? <input type="file" name="file" accept='application/pdf' ref={ref} onChange={changeHandler} />
        //                             :
        //                             ""
        //                     }
        //                 </Col>
        //                 <Col xs={12} md={4}>
        //                     {
        //                         permission.filter((item) => {
        //                             return item.menuCode == "BTN0003" && item.rolE_VIEW == "True"
        //                         }).length ? <Button variant="success" onClick={(e) => { handleSubmission() }}>Add</Button>
        //                             :
        //                             ""
        //                     }
        //                 </Col>
        //             </Row>
        //         </Container>
        //         <br></br>
        //         <TableContainer component={Paper}>
        //             <Table>
        //                 <TableHead>
        //                     <TableRow>
        //                         <StyledTableCell align="center">#</StyledTableCell>
        //                         <StyledTableCell align="center">File Name</StyledTableCell>
        //                         <StyledTableCell align="center">Section</StyledTableCell>
        //                         <StyledTableCell align="center">Add By</StyledTableCell>
        //                         <StyledTableCell align="center">Add Date</StyledTableCell>
        //                         <StyledTableCell align="center">Detail</StyledTableCell>
        //                         <StyledTableCell align="center">Delete</StyledTableCell>
        //                     </TableRow>
        //                 </TableHead>
        //                 <TableBody>
        //                     {
        //                         showFile?.map((item, index) => {
        //                             return <StyledTableRow key={item.docid}>
        //                                 <StyledTableCell align="center">{item.no}</StyledTableCell>
        //                                 <StyledTableCell align="center">{item.docfile}</StyledTableCell>
        //                                 <StyledTableCell align="center">{item.section}</StyledTableCell>
        //                                 <StyledTableCell align="center">{item.addfileby}</StyledTableCell>
        //                                 <StyledTableCell align="center">{item.addfiledate}</StyledTableCell>
        //                                 <StyledTableCell align="center">
        //                                     <a href={`http://localhost:5173/asset/FileAttech/${item.pathfilename}`}> <LuLink></LuLink>
        //                                     </a>
        //                                 </StyledTableCell>
        //                                 {
        //                                     permission.filter((item) => {
        //                                         return item.menuCode == "BTN0003" && item.rolE_VIEW == "True"
        //                                     }).length ? <StyledTableCell align="center" onClick={() => handleDelete(item.docid)}><Link><FcFullTrash></FcFullTrash></Link></StyledTableCell>
        //                                         :
        //                                         <StyledTableCell />
        //                                 }
        //                             </StyledTableRow>
        //                         })
        //                     }
        //                 </TableBody>
        //             </Table>
        //         </TableContainer>
        //     </Modal.Body>
        //     <Modal.Footer>
        //     </Modal.Footer>
        // </Modal>

    )
}

export default ModelAttachFile