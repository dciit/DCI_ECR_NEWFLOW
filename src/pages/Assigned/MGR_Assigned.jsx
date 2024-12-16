import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ServerAss from '../../service/getAssigned.server.js'
import getDataSrvPermiss from '../../service/getPermisson.js'
import getDataSrv from '../../service/getdataService.js';
import Modal from 'react-bootstrap/Modal';
import getChat from '../../service/getServiceChat.js'
import getDataFile from '../../service/getFileAttech.js'
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import './MGR_Assigned.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2'
import ModelAttachFile from '../FileAttached/ModelAttachFile.jsx';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from 'react-bootstrap/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import { LuLink } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { FcFullTrash } from "react-icons/fc";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Form from 'react-bootstrap/Form';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider'
import { CompressOutlined } from '@mui/icons-material';






const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));




function MGR_Assigned(props) {
    const { show, close, item } = props;
    const permission = useSelector((state) => state.reducer.permission);
    const empCode = Cookies.get('code')
    let position = permission[0]?.grpRole;
    const [step, setStep] = useState('');
    const user_name = Cookies.get('name')
    const [strposition, setPosition] = useState('');
    const posit = strposition[0]?.position;
    const [section, setsection] = useState('');
    const [employee, setemployee] = useState('');
    const [employeeArray, setemployeeArray] = useState([]);
    const stepArray = ['ISSUED', 'CHECK', 'APPROVED'];
    const stepArray2 = ['ISSUED', 'CHECK'];
    const stepArray3 = ['CHECK', 'APPROVED'];
    const [tableMGReceive, settableMGReceive] = useState([]);
    const [tablePermissMGReceive, settablePermissMGReceive] = useState([]);
    const [tableNotify, setTableNotify] = useState([]);
    const [dataModaldt, setDataModaldt] = useState([]);
    const sectionArray = ['PU', 'DD', 'EN', 'SQC', 'QC', 'QA']
    const ref = useRef();


    useEffect(() => {
        if (show == true) {
            initFiles();
        }
    }, [show]);



    // ************SHOW************

    const initFiles = () => {
        getDataSrvPermiss.getTableMGReceiveBySection(item.ecrno, empCode).then((res) => {
            try {
                settablePermissMGReceive(res.data);
            }
            catch (error) {
                console.log(error);
                return error;
            }
        })

        getDataSrvPermiss.getTableMGReceive(item.ecrno).then((res) => {
            try {
                settableMGReceive(res.data);
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });

        getDataSrvPermiss.getNotifyTo(item.ecrno).then((res) => {
            try {
                setTableNotify(res.data);
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });


        getDataSrv.getDetailCreate(item.ecrno).then((res) => {
            try {
                if (Object.keys(res.data).length) {
                    setDataModaldt(res.data.detail);
                }
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }

    useEffect(() => {
        // ตั้งค่าเริ่มต้นให้เป็นค่าแรกของ tablePermissMGReceive
        if (tablePermissMGReceive.length > 0) {
            setsection(tablePermissMGReceive[0].section);
        }
    }, [tablePermissMGReceive]); // การอัปเดตเมื่อ tablePermissMGReceive เปลี่ยนแปลง

    // ************END  SHOW ************

    const handleChangeEmployee = (event) => {
        setemployee(event.target.value);

        getDataSrvPermiss.getPosition(event.target.value).then((res) => {
            try {
                setPosition(res.data);
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    };


    const handleChangeSection = (event) => {
        setsection(event.target.value);


        ServerAss.getAssigned(event.target.value, step).then((res) => {
            if (res.data.length > 0) {
                setemployeeArray(res.data)
            }
            else {

            }
        })
    };

    const handleChangeStep = (event) => {
        setStep(event.target.value);

        ServerAss.getAssigned(section, event.target.value).then((res) => {
            if (res.data.length > 0) {
                setemployeeArray(res.data)
            }
            else {

            }
        })
    };

    const postAddNotifyTo = (ecR_NO, position, section) => {
        console.log(employee, step, position, section)
        if (employee != "" && step != "" && position != "" && section != "") {
            getDataSrvPermiss.postAddNotifyTo({ employeeCode: employee, employeeFullName: employee, ecrno: ecR_NO, step: step, position: position, createBy: empCode, section: section }).then((res) => {
                try {
                    getDataSrvPermiss.getNotifyTo(ecR_NO).then((res) => {
                        try {
                            setTableNotify(res.data);
                            Swal.fire({
                                icon: "success",
                                title: "Add Successfully",
                                showConfirmButton: false,
                                timer: 1000,
                            });
                            refresh();
                        }
                        catch (error) {
                            console.log(error);
                            return error;
                        }
                    });
                }
                catch (error) {
                    console.log(error);
                    return error;
                }
            });
        }
        else {
            Swal.fire({
                icon: "error",
                title: "กรุณาระบุ ชื่อ และ Status ที่จะใช้ดำเนินการเอกสาร",
                showConfirmButton: false,
                timer: 3000
            });
        }

        setemployee('');
        setStep('');
        position = "";
    };


    const getDeleteNotify = (ecrno, code, step) => {
        getDataSrvPermiss.getDeleteNotify(code, step).then((res) => {
            try {
                getDataSrvPermiss.getNotifyTo(ecrno).then((res) => {
                    try {
                        setTableNotify(res.data);
                    }
                    catch (error) {
                        console.log(error);
                        return error;
                    }
                });
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    };


    return (
        <>
            <div>
                <BootstrapDialog
                    open={show}
                >
                    <Dialog
                        open={show}
                        fullWidth
                        maxWidth="lg"
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                    >
                        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                            <h1>Assigned</h1>
                            <center>ECR NO : {item.ecrno}</center>
                            {/* {
                                JSON.stringify(tablePermissMGReceive)
                            } */}
                        </DialogTitle>
                        <IconButton aria-label="close" onClick={() => close(false)}
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

                                {
                                    permission.filter((item) => {
                                        return (((permission[0]?.grpRole == 'ADMIN' || tablePermissMGReceive[0]?.status == "OK")))
                                    }).length ? <>
                                        <Row style={{ display: 'flex', alignItems: 'center' }}  >
                                            <Col xs={12} md={2}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Section</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={section}
                                                        label="Section"
                                                        onChange={handleChangeSection}>
                                                        {
                                                            // sectionArray.map((item, index) =>
                                                            //     <MenuItem value={item}>{item}</MenuItem>
                                                            // )
                                                            tablePermissMGReceive.map((item, index) =>
                                                                <MenuItem value={item.section}>{item.section}</MenuItem>
                                                            )
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Col>
                                            <Col xs={12} md={2}>
                                                {
                                                    (section == "PU" || section == "DD" || section == "EN") ? <>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">Step</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={step}
                                                                label="Step"
                                                                onChange={handleChangeStep}>
                                                                {
                                                                    stepArray.map((item, index) =>
                                                                        <MenuItem value={item}>{item}</MenuItem>
                                                                    )
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                    </> : ""
                                                }
                                                {
                                                    (section == "SQC" || section == "QC") ? <>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">Step</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={step}
                                                                label="Step"
                                                                onChange={handleChangeStep}>
                                                                {
                                                                    stepArray2.map((item, index) =>
                                                                        <MenuItem value={item}>{item}</MenuItem>
                                                                    )
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                    </> : ""
                                                }
                                                {
                                                    section == "QA" ? <>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">Step</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={step}
                                                                label="Step"
                                                                onChange={handleChangeStep}>
                                                                {
                                                                    stepArray3.map((item, index) =>
                                                                        <MenuItem value={item}>{item}</MenuItem>
                                                                    )
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                    </> : ""
                                                }
                                            </Col>
                                            <Col xs={12} md={4}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">EmpCode</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={employee}
                                                        label="EmpCode"
                                                        onChange={handleChangeEmployee}>
                                                        {
                                                            employeeArray.map((item, index) =>
                                                                <MenuItem value={item?.empCode_PU}>{item?.fullName_PU}</MenuItem>
                                                            )
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Col>
                                            <Col xs={12} md={2} style={{ marginTop: '-24px' }}>
                                                <InputLabel id="demo-simple-select-label">Position</InputLabel>
                                                <Form.Control type="text" className='FormControl' value={posit} style={{ marginTop: '5px', marginLeft: '11px', width: '100%' }} readOnly />
                                            </Col>



                                            <Col xs={12} md={2}>
                                                <Button variant="success" onClick={() => postAddNotifyTo(item.ecrno, posit, section)}>
                                                    ADD
                                                </Button>
                                            </Col>
                                        </Row>
                                    </> : ""
                                }



                                <br></br>
                                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                    <table className='MGRAssigned'>
                                        <tr>
                                            <th style={{ fontSize: '14px', width: '4pc' }}><center><b>Section</b></center></th>
                                            <th style={{ fontSize: '14px', width: '4pc' }}><center><b>Issued</b></center></th>
                                            <th style={{ fontSize: '14px', width: '4pc' }}><center><b>Check</b></center></th>
                                            <th style={{ fontSize: '14px', width: '4pc' }}><center><b>Approved</b></center></th>
                                        </tr>
                                        <tr>
                                            <td>PU</td>
                                            <td style={{ color: tableNotify[0]?.pu_issuedBit == "F" ? 'black' : 'gainsboro' }}>
                                                <center>{tableNotify[0]?.pu_issued}<br></br> {tableNotify[0]?.pu_issuedBit == 'F' ? tableNotify[0]?.pu_issuedDate : ''}</center>
                                                {
                                                    tableNotify[0]?.pu_issued != null ?
                                                        ((empCode == tableMGReceive[0]?.empCode_PU && tableMGReceive[0]?.section_PU == 'PU' && dataModaldt[0]?.pU_IssuedBit != "F") || (permission[0]?.grpRole == 'ADMIN' && dataModaldt[0]?.pU_IssuedBit != "F")) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(item.ecrno, tableNotify[0]?.pu_issuedCode, tableNotify[0]?.pu_issued_step)}>
                                                            ลบ
                                                        </Button>
                                                        : ''
                                                }
                                            </td>
                                            <td style={{ color: tableNotify[0]?.pu_checkedBit == "F" ? 'black' : 'gainsboro' }}>
                                                <center>{tableNotify[0]?.pu_checked}<br></br>{tableNotify[0]?.pu_checkedBit == 'F' ? tableNotify[0]?.pu_checkedDate : ''}</center>
                                                {
                                                    tableNotify[0]?.pu_checked != null ?
                                                        ((empCode == tableMGReceive[0]?.empCode_PU && tableMGReceive[0]?.section_PU == 'PU' && dataModaldt[0]?.pU_CheckBit != "F") || (permission[0]?.grpRole == 'ADMIN' && dataModaldt[0]?.pU_CheckBit != "F")) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.pu_checkedCode, tableNotify[0]?.pu_checked_step)}>
                                                            ลบ
                                                        </Button>
                                                        : ''
                                                }
                                            </td>
                                            <td style={{ color: tableNotify[0]?.pu_approvedBit == "F" ? 'black' : 'gainsboro' }}>
                                                <center>{tableNotify[0]?.pu_approved}<br></br> {tableNotify[0]?.pu_approvedBit == 'F' ? tableNotify[0]?.pu_approvedDate : ''}</center>
                                                {
                                                    tableNotify[0]?.pu_approved != null ?
                                                        ((empCode == tableMGReceive[0]?.empCode_PU && tableMGReceive[0]?.section_PU == 'PU' && dataModaldt[0]?.pU_ApprovedBit != "F") || (permission[0]?.grpRole == 'ADMIN' && dataModaldt[0]?.pU_ApprovedBit != "F")) &&
                                                        <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.pu_approvedCode, tableNotify[0]?.pu_approved_step)}>
                                                            ลบ
                                                        </Button>
                                                        : ''
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>DD</td>
                                            <td style={{ color: tableNotify[0]?.dd_issuedBit == "F" ? 'black' : 'gainsboro' }}>
                                                <center>{tableNotify[0]?.dd_issued}<br></br> {tableNotify[0]?.dd_issuedBit == 'F' ? tableNotify[0]?.dd_issuedDate : ''}</center>
                                                {
                                                    tableNotify[0]?.dd_issued != null ?
                                                        ((empCode == tableMGReceive[0]?.empCode_DD && tableMGReceive[0]?.section_DD == 'DD' && dataModaldt[0]?.dD_IssuedBit != "F") || (permission[0]?.grpRole == 'ADMIN' && dataModaldt[0]?.dD_IssuedBit != "F")) &&
                                                        <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(item.ecrno, tableNotify[0]?.dd_issuedCode, tableNotify[0]?.dd_issued_step)}>
                                                            ลบ
                                                        </Button>
                                                        : ''
                                                }
                                            </td>
                                            <td style={{ color: tableNotify[0]?.dd_checkedBit == "F" ? 'black' : 'gainsboro' }}>
                                                <center>{tableNotify[0]?.dd_checked}<br></br>{tableNotify[0]?.dd_checkedBit == 'F' ? tableNotify[0]?.dd_checkedDate : ''}</center>
                                                {
                                                    tableNotify[0]?.dd_checked != null ?
                                                        ((empCode == tableMGReceive[0]?.empCode_DD && tableMGReceive[0]?.section_DD == 'DD' && dataModaldt[0]?.dD_CheckBit != "F") || (permission[0]?.grpRole == 'ADMIN' && dataModaldt[0]?.dD_CheckBit != "F")) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.dd_checkedCode, tableNotify[0]?.dd_checked_step)}>
                                                            ลบ
                                                        </Button>
                                                        : ''
                                                }
                                            </td>
                                            <td style={{ color: tableNotify[0]?.dd_approvedBit == "F" ? 'black' : 'gainsboro' }}>
                                                <center>{tableNotify[0]?.dd_approved}<br></br> {tableNotify[0]?.dd_approvedBit == 'F' ? tableNotify[0]?.dd_approvedDate : ''}</center>
                                                {
                                                    tableNotify[0]?.dd_approved != null ?
                                                        ((empCode == tableMGReceive[0]?.empCode_DD && tableMGReceive[0]?.section_DD == 'DD' && dataModaldt[0]?.dD_ApprovedBit != "F") || (permission[0]?.grpRole == 'ADMIN' && dataModaldt[0]?.dD_ApprovedBit != "F")) &&
                                                        <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.dd_approvedCode, tableNotify[0]?.dd_approved_step)}>
                                                            ลบ
                                                        </Button>
                                                        : ''
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>EN</td>
                                            <td style={{ color: tableNotify[0]?.en_issuedBit == "F" ? 'black' : 'gainsboro' }}>
                                                <center>{tableNotify[0]?.en_issued}<br></br> {tableNotify[0]?.en_issuedBit == 'F' ? tableNotify[0]?.en_issuedDate : ''}</center>
                                                {
                                                    tableNotify[0]?.en_issued != null ?
                                                        ((empCode == tableMGReceive[0]?.empCode_EN && tableMGReceive[0]?.section_EN == 'EN' && dataModaldt[0]?.eN_IssuedBit != "F") || (permission[0]?.grpRole == 'ADMIN' && dataModaldt[0]?.eN_IssuedBit != "F")) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(item.ecrno, tableNotify[0]?.en_issuedCode, tableNotify[0]?.en_issued_step)}>
                                                            ลบ
                                                        </Button>
                                                        : ''
                                                }
                                            </td>
                                            <td style={{ color: tableNotify[0]?.en_checkedBit == "F" ? 'black' : 'gainsboro' }}>
                                                <center>{tableNotify[0]?.en_checked}<br></br>{tableNotify[0]?.en_checkedBit == 'F' ? tableNotify[0]?.en_checkedDate : ''}</center>
                                                {
                                                    tableNotify[0]?.en_checked != null ?
                                                        ((empCode == tableMGReceive[0]?.empCode_EN && tableMGReceive[0]?.section_EN == 'EN' && dataModaldt[0]?.eN_CheckBit != "F") || (permission[0]?.grpRole == 'ADMIN' && dataModaldt[0]?.eN_CheckBit != "F")) &&
                                                        <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.en_checkedCode, tableNotify[0]?.en_checked_step)}>
                                                            ลบ
                                                        </Button>
                                                        : ''
                                                }
                                            </td>
                                            <td style={{ color: tableNotify[0]?.en_approvedBit == "F" ? 'black' : 'gainsboro' }}>
                                                <center>{tableNotify[0]?.en_approved}<br></br> {tableNotify[0]?.en_approvedBit == 'F' ? tableNotify[0]?.en_approvedDate : ''}</center>
                                                {
                                                    tableNotify[0]?.en_approved != null ?
                                                        ((empCode == tableMGReceive[0]?.empCode_EN && tableMGReceive[0]?.section_EN == 'EN' && dataModaldt[0]?.eN_ApprovedBit != "F") || (permission[0]?.grpRole == 'ADMIN' && dataModaldt[0]?.eN_ApprovedBit != "F")) &&
                                                        <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.en_approvedCode, tableNotify[0]?.en_approved_step)}>
                                                            ลบ
                                                        </Button>
                                                        : ''
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>SQC</td>
                                            <td style={{ color: tableNotify[0]?.sqc_issuedBit == "F" ? 'black' : 'gainsboro' }}>
                                                <center>{tableNotify[0]?.sqc_issued}<br></br> {tableNotify[0]?.sqc_issuedBit == 'F' ? tableNotify[0]?.sqc_issuedDate : ''}</center>
                                                {
                                                    tableNotify[0]?.sqc_issued != null ?
                                                        ((empCode == tableMGReceive[0]?.empCode_SQC && tableMGReceive[0]?.section_SQC == 'SQC' && dataModaldt[0]?.sqC_IssuedBit != "F") || (permission[0]?.grpRole == 'ADMIN' && dataModaldt[0]?.sqC_IssuedBit != "F"))
                                                        && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(item.ecrno, tableNotify[0]?.sqc_issuedCode, tableNotify[0]?.sqc_issued_step)}>
                                                            ลบ
                                                        </Button>
                                                        : ''
                                                }
                                            </td>
                                            <td style={{ color: tableNotify[0]?.sqc_checkedBit == "F" ? 'black' : 'gainsboro' }}>
                                                <center>{tableNotify[0]?.sqc_checked}<br></br>{tableNotify[0]?.sqc_checkedBit == 'F' ? tableNotify[0]?.sqc_checkedDate : ''}</center>
                                                {
                                                    tableNotify[0]?.sqc_checked != null ?
                                                        ((empCode == tableMGReceive[0]?.empCode_SQC && tableMGReceive[0]?.section_SQC == 'SQC' && dataModaldt[0]?.sqC_CheckBit != "F") || (permission[0]?.grpRole == 'ADMIN' && dataModaldt[0]?.sqC_CheckBit != "F"))
                                                        && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.sqc_checkedCode, tableNotify[0]?.sqc_checked_step)}>
                                                            ลบ
                                                        </Button>
                                                        : ''
                                                }
                                            </td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>QC</td>
                                            <td style={{ color: tableNotify[0]?.qc_issuedBit == "F" ? 'black' : 'gainsboro' }}>
                                                <center>{tableNotify[0]?.qc_issued}<br></br> {tableNotify[0]?.qc_issuedBit == 'F' ? tableNotify[0]?.qc_issuedDate : ''}</center>
                                                {
                                                    tableNotify[0]?.qc_issued != null ?
                                                        ((empCode == tableMGReceive[0]?.empCode_QC && tableMGReceive[0]?.section_QC == 'QC' && dataModaldt[0]?.qC_IssuedBit != "F") || (permission[0]?.grpRole == 'ADMIN' && dataModaldt[0]?.qC_IssuedBit != "F"))
                                                        && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(item.ecrno, tableNotify[0]?.qc_issuedCode, tableNotify[0]?.qc_issued_step)}>
                                                            ลบ
                                                        </Button>
                                                        : ''
                                                }
                                            </td>
                                            <td style={{ color: tableNotify[0]?.qc_checkedBit == "F" ? 'black' : 'gainsboro' }}>
                                                <center>{tableNotify[0]?.qc_checked}<br></br>{tableNotify[0]?.qc_checkedBit == 'F' ? tableNotify[0]?.qc_checkedDate : ''}</center>
                                                {
                                                    tableNotify[0]?.qc_checked != null ?
                                                        ((empCode == tableMGReceive[0]?.empCode_QC && tableMGReceive[0]?.section_QC == 'QC' && dataModaldt[0]?.qC_CheckBit != "F") || (permission[0]?.grpRole == 'ADMIN' && dataModaldt[0]?.qC_CheckBit != "F")) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.qc_checkedCode, tableNotify[0]?.qc_checked_step)}>
                                                            ลบ
                                                        </Button>
                                                        : ''
                                                }
                                            </td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>QA</td>
                                            <td>
                                                -
                                            </td>
                                            <td style={{ color: tableNotify[0]?.qa_checkedBit == "F" ? 'black' : 'gainsboro' }}>
                                                <center>{tableNotify[0]?.qa_checked}<br></br>{tableNotify[0]?.qa_checkedBit == 'F' ? tableNotify[0]?.qa_checkedDate : ''}</center>
                                                {
                                                    tableNotify[0]?.qa_checked != null ?
                                                        ((empCode == tableMGReceive[0]?.empCode_QA && tableMGReceive[0]?.section_QA == 'QA' && dataModaldt[0]?.qA_CheckBit != "F") || (permission[0]?.grpRole == 'ADMIN' && dataModaldt[0]?.qA_CheckBit != "F")) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.qa_checkedCode, tableNotify[0]?.qa_checked_step)}>
                                                            ลบ
                                                        </Button>
                                                        : ''
                                                }
                                            </td>
                                            <td style={{ color: tableNotify[0]?.qa_approvedBit == "F" ? 'black' : 'gainsboro' }}>
                                                <center>{tableNotify[0]?.qa_approved}<br></br> {tableNotify[0]?.qa_approvedBit == 'F' ? tableNotify[0]?.qa_approvedDate : ''}</center>
                                                {
                                                    tableNotify[0]?.qa_approved != null ?
                                                        ((empCode == tableMGReceive[0]?.empCode_QA && tableMGReceive[0]?.section_QA == 'QA' && dataModaldt[0]?.qA_ApprovedBit != "F") || (permission[0]?.grpRole == 'ADMIN' && dataModaldt[0]?.qA_ApprovedBit != "F")) &&
                                                        <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.qa_approvedCode, tableNotify[0]?.qa_approved_step)}>
                                                            ลบ
                                                        </Button>
                                                        : ''
                                                }
                                            </td>
                                        </tr>
                                    </table>
                                </Row>
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="secondary" onClick={() => close(false)}>
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </BootstrapDialog>
            </div>
        </>
    )
}

export default MGR_Assigned