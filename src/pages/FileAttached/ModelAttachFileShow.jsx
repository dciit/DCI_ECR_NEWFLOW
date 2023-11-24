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



function ModelAttachFileShow(props) {
    const { show, close, item } = props;
    const empCode = localStorage.getItem("name");
    const ref = useRef();


    useEffect(() => {
        initFiles();
    });

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





    return (
        <Modal
            {...props}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>ECR NO : {item.ecrno}</Modal.Title>
                <Modal.Title style={{ display: 'none' }}>Title : {item.title}</Modal.Title>
                <Modal.Title style={{ display: 'none' }}>Section : {item.section}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                                    </StyledTableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}

export default ModelAttachFileShow