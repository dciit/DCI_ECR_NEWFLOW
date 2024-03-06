import React, { useEffect, useState } from 'react'
import './FormDetail.css';
import Button from 'react-bootstrap/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import TextField from '@mui/material/TextField';
import getDataSrv from '../../service/getdataService.js';
import getDataSrvPermiss from '../../service/getPermisson.js'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ModelAttachFile from '../FileAttached/ModelAttachFile.jsx';
import moment from 'moment'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


//********************* Collapsible ************************ */
const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));
//*********************END Collapsible ************************ */

function FormCreate(props) {
    const { show, close, ecrno, refresh, section } = props;
    const permission = useSelector((state) => state.reducer.permission);
    let position = permission[0]?.grpRole;
    const [employee, setemployee] = useState('');
    const [employeeArray, setEmployeeArray] = useState([]);
    const [strposition, setPosition] = useState('');
    const [step, setStep] = useState('ISSUED');
    const stepArrayCre = ['CHECK', 'APPROVED'];
    const [tableNotify, setTableNotify] = useState([]);


    useEffect(() => {
        if (show) {
            initFiles();
            setbtnAddFile(false);
            setShowDueDate(false)
        }

    }, [show]);


    //********************* Collapsible ************************ */
    const [expanded, setExpanded] = React.useState('panel1');
    const handleChangeCollapse = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    //*********************END Collapsible ************************ */

    const group = (val) => {
        var varGroup = '';

        if (val == 'DD') {
            varGroup = "Design"
        }
        else {
            varGroup = "Purchasing";
        }
        return varGroup;
    }

    const grpSection = group(permission[0]?.grpRoleSect);


    //*********************SECTION CREATE************************ */
    // *********************** ตัวแปร ส่งไป API*******************
    const [btnAddFile, setbtnAddFile] = useState(false);
    const [openAttrFile, setOpenAttrFile] = useState(false);
    const [showDueDate, setShowDueDate] = useState(false)
    const [ecrnoSelected, setEcrnoSelected] = useState('');
    const [title, setTitle] = useState('');
    const [ddlSection, setddlSection] = React.useState('Design');
    const [isVisible, setIsVisible] = useState(false);
    const [cbPU, setcbPU] = useState([]);
    const [cbDD, setcbDD] = useState([]);
    const [cbMODEL, setcbMODEL] = useState([]);
    const [cbLINE, setcbLINE] = useState([]);
    const [cbFORDDNEED, setcbFORDDNEED] = useState([]);
    const [partNo, setpartNo] = useState('');
    const [partName, setpartName] = useState('');
    const [remark, setremark] = useState('');
    const [methodRemark, setmethodRemark] = useState('');
    const [purpose, setPurpose] = useState('');
    const [methodOld, setMethodOld] = useState('');
    const [methodNew, setMethodNew] = useState('');
    const [detail, setDetail] = useState('');
    const [requestPU, setRequestPU] = useState('');
    const [duedate, setduedate] = useState(moment().format('YYYY-MM-DD'));
    const [itemOther, setItemOther] = useState('');
    const [notification, setNotification] = useState('');
    const [drNo, setDrNo] = useState('');
    const [modelOther, setModelOther] = useState('');
    const [lineOther, setLineOther] = useState('');
    // const empCode = localStorage.getItem("name");
    const empCode = Cookies.get('code')
    const [nbr, setNbr] = useState([])
    const [strclass, setClass] = useState('CLASS E');
    const [filesDrawing, setFilesDrawing] = useState({})
    const [filesBR, setFilesBR] = useState({})
    // ***************จบ ตัวแปร ส่งไป API ***********************


    const initFiles = () => {
        getDataSrv.getNbr().then((res) => {
            try {
                if (Object.keys(res.data).length) {
                    setNbr(res.data);
                }
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });

        getDataSrv.getDict().then((res) => {
            setcbPU(res.data.filter(item => item.dictType == 'REQ_PU'));
        })
        ///*************************************************** */
        getDataSrv.getDict().then((res) => {
            setcbDD(res.data.filter(item => item.dictType == 'REQ_DD'));
        })
        ///*************************************************** */
        getDataSrv.getDict().then((res) => {
            setcbMODEL(res.data.filter(item => item.dictType == 'REQ_MODEL'));
        })
        ///*************************************************** */
        getDataSrv.getDict().then((res) => {
            setcbLINE(res.data.filter(item => item.dictType == 'REQ_PROCESS'));
        })
        ///*************************************************** */
        getDataSrv.getDict().then((res) => {
            setcbFORDDNEED(res.data.filter(item => item.dictType == 'REQ_FOR'));
        })

        getDataSrvPermiss.getEmployeeForCreate().then((res) => {
            try {
                setEmployeeArray(res.data);
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    //********************************************************** */
    // เงื่อนไข Dropdown Section
    const handleChangeSection = (event) => {
        setddlSection(event.target.value);

        if (event.target.value === 'Design') {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    };
    // จบเงื่อนไข Dropdown Section
    //*********************END SECTION CEREATE******************** */

    //*************************** FUNCTON CHECK CHECKBOX *************************** */
    function handleCheckBoxPU(indexCheck, checked) {
        var items = cbPU;
        items[indexCheck]['checked'] = checked;
        setcbPU(items);
    }

    function handleCheckBoxDD(indexCheck, checked) {
        var items = cbDD;
        items[indexCheck]['checked'] = checked;
        setcbDD(items);
    }

    function handleCheckBoxMODEL(indexCheck, checked) {
        var items = cbMODEL;
        items[indexCheck]['checked'] = checked;
        setcbMODEL(items);
    }

    function handleCheckBoxLINE(indexCheck, checked) {
        var items = cbLINE;
        items[indexCheck]['checked'] = checked;
        setcbLINE(items);
    }

    function handleCheckBoxFORDDNEED(indexCheck, checked) {
        var items = cbFORDDNEED;
        items[indexCheck]['checked'] = checked;
        setcbFORDDNEED(items);
    }
    //***************************END FUNCTON CHECK CHECKBOX *************************** */

    //***************************FUNCTON INPUT DATA INSERT HEAD , DETAIL*************************** */
    const postInputData = () => {
        /// ************สั้น************
        const selectItem = (cb) => {
            return cb.filter((item) => item.checked).map((item) => {
                return item.dictCode
            }).join(',')
        }
        /// ************จบ สั้น************

        let cbitem = grpSection == "Design" ? selectItem(cbDD) : selectItem(cbPU);
        var secForDD = selectItem(cbFORDDNEED) != "" ? selectItem(cbFORDDNEED) : ""
        if (grpSection == "Design" && selectItem(cbFORDDNEED) != "") {
            secForDD = selectItem(cbFORDDNEED);
        }
        else {
            secForDD = "-";
        }

        var itOther = itemOther != "" ? itemOther : "-";
        var noti = notification != "" ? notification : "-";
        var drno = drNo != "" ? drNo : "-";
        var modelot = modelOther != "" ? modelOther : "-";
        var lineOt = lineOther != "" ? lineOther : "-";

        // if (title != "" && cbitem != "" && selectItem(cbMODEL) != "" && selectItem(cbLINE) != "" && partNo != "" && partName != "" && remark != "" && purpose != "" && methodOld != "" && methodNew != "" && detail != "" && requestPU != "" && (filesDrawing.length | 0) > 0 && (filesBR.length | 0) > 0) {
        if (title != "" && cbitem != "" && selectItem(cbMODEL) != "" && selectItem(cbLINE) != "" && partNo != "" && partName != "" && remark != "" && purpose != "" && methodOld != "" && methodNew != "" && detail != "" && requestPU != "") {
            setbtnAddFile(true);
            // console.log(filesDrawing, filesBR)
            getDataSrv.postInputData({
                Ecrno: nbr[0]?.runningNumber, TitleNane: title, Section: grpSection, Item: cbitem, ItemOther: itOther, Notificaion: noti, DRNo: drno, Model: selectItem(cbMODEL), ModelOther: modelot, Line: selectItem(cbLINE), LineOther: lineOt, EmpCode: empCode, PartNo: partNo, PartName: partName, Remark: remark, DueDate: duedate, Method: methodRemark, SecForDD: secForDD, purpose: purpose, methodOld: methodOld, methodNew: methodNew, detail: detail, requestPU: requestPU, strclass: strclass
            }).then((res) => {
                try {
                    refresh();
                    setFilesDrawing('');
                    setFilesBR('');
                    // close(false)
                }
                catch (error) {
                    console.log(error);
                    return error;
                }
            });
        }
        else {
            alert("กรุณากรอกเอกสาร และ แนบไฟล์ให้ครบถ้วน ตามที่ทำเครื่องหมาย (*) ไว้");
        }
    };
    //***************************END FUNCTON INPUT DATA*************************** */


    //******************SET NOTIFY TO*************** */
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

    const posit = strposition[0]?.position;


    const handleChangeStep = (event) => {
        setStep(event.target.value);
    };


    const postAddNotifyTo = (ecR_NO, position, section) => {
        getDataSrvPermiss.postAddNotifyTo({ employeeCode: employee, employeeFullName: employee, ecrno: ecR_NO, step: step, position: position, createBy: empCode, section: section }).then((res) => {
            try {
                getDataSrvPermiss.getNotifyTo(ecR_NO).then((res) => {
                    try {
                        alert('successfully');
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
    //******************END SET NOTIFY TO*************** */

    //****************** DELETE NOTIFY TO*************** */
    const getDeleteNotify = (ecr_No, code, step) => {
        getDataSrvPermiss.getDeleteNotify(code, step).then((res) => {
            try {
                getDataSrvPermiss.getNotifyTo(ecr_No).then((res) => {
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
    //******************END DELETE NOTIFY TO*************** */

    const classArray = ['CLASS C', 'CLASS D', 'CLASS E']


    const handleChangeClass = (event) => {
        setClass(event.target.value);
        console.log(event.target.value)
        if (event.target.value == "CLASS C") {
            setShowDueDate(true)
        }
        else {
            setShowDueDate(false)
        }
    };


    const addFilesDrawing = (event) => {
        setFilesDrawing(event.target.files)
    };

    const addFilesBR = (event) => {
        setFilesBR(event.target.files)
    };


    return (
        <div>
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={show}
            >
                <Dialog
                    open={show}
                    fullWidth
                    maxWidth="lg"
                    // maxWidth="md"
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
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
                        <Container>
                            <div class="row">
                                <div class="col-md-10">
                                    <h4 style={{ marginLeft: '33%' }}>ENGINEERING CHANGE REQUEST</h4>
                                </div>
                                <div class="col-md-2"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-7"></div>
                                <div class="col-md-5">
                                    <Form.Label>ECR NO :</Form.Label>
                                    <Form.Control type="text" className='FormControl' value={nbr[0]?.runningNumber} readOnly />
                                </div>
                            </div>
                            <hr></hr>

                            <div class="row" className='styleChangeItem'>
                                <div class="col-sm-12" style={{ display: 'flex' }}>
                                    <h6>TITLE</h6> &nbsp; &nbsp; <p style={{ color: 'red', fontSize: '18px' }}>*</p> &nbsp; &nbsp;
                                    <TextField id="txtTitle" variant="standard" style={{ width: '95%', backgroundColor: '#f8ef64', height: '67%' }} onChange={(event) => setTitle(event.target.value)} />
                                    <br></br><br></br>
                                    <Form.Label>Section</Form.Label>
                                    <Form.Control type="text" className='FormControl' value={grpSection} style={{ marginTop: '5px', marginLeft: '11px' }} />
                                </div>
                            </div>

                            <hr></hr>
                            <Row className='styleChangeItem'>
                                <Col xs={12} md={12}>
                                    <p>CHANGE REQUEST ITEM</p>
                                </Col>
                            </Row>
                        </Container>



                        <Accordion expanded={expanded === 'panel1'} >
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography>ส่วนที่ 1 Create ECR</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {grpSection == "Purchasing" ? (
                                        <Row className='styleRow'>
                                            <Col xs={12} md={12}>
                                                <div className='styleCard'>
                                                    <Form.Label>PU <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                                    <div>
                                                        {
                                                            cbPU.map((item, index) => {
                                                                return <div key={item?.dictCode} style={{ display: 'flex' }} > <input type="checkbox" value={item} onClick={(event) => handleCheckBoxPU(index, event.target.checked)} />    <div style={{ display: 'none' }}> {item?.dictCode} </div> <div style={{ marginLeft: '13px' }}>{item?.dictDesc}</div> <br></br></div>
                                                            })
                                                        }
                                                        <Box
                                                            component="form"
                                                            sx={{
                                                                '& > :not(style)': { m: 1, width: '33ch' },
                                                            }}
                                                            noValidate
                                                            autoComplete="off"
                                                        >
                                                            <TextField id="txtOtherPU" label="Other..." variant="standard" style={{ width: '95%' }} onChange={(event) => { setItemOther(event.target.value) }} />
                                                        </Box>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    ) :
                                        <Row className='styleRow'>
                                            <Col xs={12} md={12}>
                                                <div className='styleCard'>
                                                    <Form.Label>DD <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                                    <div>
                                                        {
                                                            cbDD.map((item, index) => {
                                                                return <div key={item?.dictCode} style={{ display: 'flex' }} > <input type="checkbox" value={item} onChange={(event) => handleCheckBoxDD(index, event.target.checked)} />    <div style={{ display: 'none' }}> {item?.dictCode} </div> <div style={{ marginLeft: '13px' }}>{item?.dictDesc}</div> <br></br></div>
                                                            })
                                                        }
                                                        <Box
                                                            component="form"
                                                            sx={{
                                                                '& > :not(style)': { m: 1, width: '33ch' },
                                                            }}
                                                            noValidate
                                                            autoComplete="off"
                                                        >
                                                            <span style={{ color: 'red', fontSize: '18px' }}>*</span>    <TextField id="txtOtherNoti" label="Notification No" variant="standard" style={{ width: '95%' }} onChange={(event) => setNotification(event.target.value)} /><br></br>
                                                            <span style={{ color: 'white', fontSize: '18px' }}>*</span><TextField id="txtOtherDrNo" label="DR No" variant="standard" style={{ width: '95%' }} onChange={(event) => setDrNo(event.target.value)} /> <br></br>
                                                            <span style={{ color: 'white', fontSize: '18px' }}>*</span><TextField id="txtOtherDD" label="Other...." variant="standard" style={{ width: '95%' }} onChange={(event) => setItemOther(event.target.value)} />
                                                        </Box>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    }

                                    {grpSection == "Purchasing" ? (
                                        <Row className='styleRow'>
                                            <Col xs={12} md={4}>
                                                <div className='styleCard'>
                                                    <Form.Label>MODEL <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                                    <div>
                                                        {
                                                            cbMODEL.map((item, index) => {
                                                                return <div key={item?.dictCode} style={{ display: 'flex' }} > <input type="checkbox" value={item} onChange={(event) => handleCheckBoxMODEL(index, event.target.checked)} />    <div style={{ display: 'none' }}> {item?.dictCode} </div> <div style={{ marginLeft: '13px' }}>{item?.dictDesc}</div> <br></br></div>
                                                            })
                                                        }
                                                        <Box
                                                            component="form"
                                                            sx={{
                                                                '& > :not(style)': { m: 1, width: '33ch' },
                                                            }}
                                                            noValidate
                                                            autoComplete="off"
                                                        >
                                                            <TextField id="txtOtherModel" label="Other..." variant="standard" style={{ width: '90%' }} onChange={(event) => setModelOther(event.target.value)} />
                                                        </Box>
                                                    </div>
                                                </div>
                                            </Col>


                                            <Col xs={12} md={4}>
                                                <div className='styleCard'>
                                                    <Form.Label>LINE <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                                    <div>
                                                        {
                                                            cbLINE.map((item, index) => {
                                                                return <div key={item?.dictCode} style={{ display: 'flex' }} > <input type="checkbox" value={item} onChange={(event) => handleCheckBoxLINE(index, event.target.checked)} />    <div style={{ display: 'none' }}> {item?.dictCode} </div> <div style={{ marginLeft: '13px' }}>{item?.dictDesc}</div> <br></br></div>
                                                            })

                                                        }
                                                        <Box
                                                            component="form"
                                                            sx={{
                                                                '& > :not(style)': { m: 1, width: '33ch' },
                                                            }}
                                                            noValidate
                                                            autoComplete="off"
                                                        >
                                                            <TextField id="txtOtherLine" label="Other..." variant="standard" style={{ width: '90%' }} onChange={(event) => setLineOther(event.target.value)} />
                                                        </Box>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col xs={12} md={4}>
                                            </Col>
                                        </Row>
                                    ) :
                                        <Row className='styleRow'>
                                            <Col xs={12} md={4}>
                                                <div className='styleCard'>
                                                    <Form.Label>MODEL <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                                    <div>
                                                        {
                                                            cbMODEL.map((item, index) => {
                                                                return <div key={item?.dictCode} style={{ display: 'flex' }} > <input type="checkbox" value={item} onChange={(event) => handleCheckBoxMODEL(index, event.target.checked)} />    <div style={{ display: 'none' }}> {item?.dictCode} </div> <div style={{ marginLeft: '13px' }}>{item?.dictDesc}</div> <br></br></div>
                                                            })
                                                        }
                                                        <Box
                                                            component="form"
                                                            sx={{
                                                                '& > :not(style)': { m: 1, width: '33ch' },
                                                            }}
                                                            noValidate
                                                            autoComplete="off"
                                                        >
                                                            <TextField id="txtOtherModel" label="Other..." variant="standard" onChange={(event) => setModelOther(event.target.value)} />
                                                        </Box>
                                                    </div>
                                                </div>
                                            </Col>


                                            <Col xs={12} md={4}>
                                                <div className='styleCard'>
                                                    <Form.Label>LINE <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                                    <div>
                                                        {
                                                            cbLINE.map((item, index) => {
                                                                return <div key={item?.dictCode} style={{ display: 'flex' }} > <input type="checkbox" value={item} onChange={(event) => handleCheckBoxLINE(index, event.target.checked)} />    <div style={{ display: 'none' }}> {item?.dictCode} </div> <div style={{ marginLeft: '13px' }}>{item?.dictDesc}</div> <br></br></div>
                                                            })
                                                        }
                                                        <Box
                                                            component="form"
                                                            sx={{
                                                                '& > :not(style)': { m: 1, width: '33ch' },
                                                            }}
                                                            noValidate
                                                            autoComplete="off"
                                                        >
                                                            <TextField id="txtOtherLine" label="Other..." variant="standard" onChange={(event) => setLineOther(event.target.value)} />
                                                        </Box>
                                                    </div>
                                                </div>
                                            </Col>


                                            <Col xs={12} md={4}>
                                                <div className='styleCard'>
                                                    <Form.Label>FOR DD <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                                    <div>
                                                        {
                                                            cbFORDDNEED.map((item, index) => {
                                                                // return <div key={item?.req_FORCODE}><input type="checkbox" />    {item?.req_FORCODE} <br></br></div>
                                                                return <div key={item?.dictCode} style={{ display: 'flex' }} > <input type="checkbox" value={item} onChange={(event) => handleCheckBoxFORDDNEED(index, event.target.checked)} />    <div style={{ display: 'none' }}> {item?.dictCode} </div> <div style={{ marginLeft: '13px' }}>{item?.dictDesc}</div> <br></br></div>
                                                            })
                                                        }
                                                        <Box
                                                            component="form"
                                                            sx={{
                                                                '& > :not(style)': { m: 1, width: '33ch' },
                                                            }}
                                                            noValidate
                                                            autoComplete="off"
                                                        >
                                                        </Box>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>}


                                    <Row className='styleRowText'>
                                        <Col xs={6} md={4}>
                                            <Form.Label>PART NO (DRAWING) <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                            <p>(Please input new revision of part) </p>
                                            {/* <Form.Control type="text" onChange={(event) => setpartNo(event.target.value)} /> */}
                                            <Form.Control as="textarea" rows={5} onChange={(event) => setpartNo(event.target.value)} />
                                        </Col>
                                        <Col xs={6} md={4}>
                                            <Form.Label>PART NAME <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                            <p>-</p>
                                            {/* <Form.Control type="text" onChange={(event) => setpartName(event.target.value)} /> */}
                                            <Form.Control as="textarea" rows={5} onChange={(event) => setpartName(event.target.value)} />
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <Form.Label>REMARK / MODEL <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                            <p>-</p>
                                            {/* <Form.Control as="textarea" onChange={(event) => setremark(event.target.value)} /> */}
                                            <Form.Control as="textarea" rows={5} onChange={(event) => setremark(event.target.value)} />
                                        </Col>
                                    </Row>

                                    {/* <Row className='styleRowText'>
                                        <Col xs={12} md={12}>
                                            <Form.Label>วัตถุประสงค์,วิธีการ,ข้อมูลการส่งมอบ (Purposr,Method & Delivery Schedule)</Form.Label>
                                            <Form.Control as="textarea" rows={5} onChange={(event) => setmethodRemark(event.target.value)} />
                                        </Col>
                                    </Row> */}


                                    <Row className='styleRowText'>
                                        <Col xs={12} md={6}>
                                            <Form.Label>PURPOSE / PROJECT: <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                            <Form.Control as="textarea" rows={3} onChange={(event) => setPurpose(event.target.value)} />
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <div className='styleCard'>
                                                <p style={{ fontSize: '14px' }}>
                                                    C =  เริ่มใช้ PART ใหม่หรือวิธีการใหม่ตามเดือนที่กำหนดทันที โดยไม่สามารถใช้ PART SPEC.เก่าหรือวิธีการเก่าในการผลิต
                                                    <br></br>
                                                    D = สามารถใช้ PART เก่าให้หมดก่อนเริ่มใช้ PART ใหม่ได้ตามความเหมาะสมของสถานการณ์ของDCI แต่ไม่สามารถใช้PARTเก่าและใหม่ปนกันได้
                                                    <br></br>
                                                    E =  เป็นการแก้ไขเอกสารให้ถูกต้องตามการปฏิบัติงานจริงหรือ PART ที่ใช้งานจริง
                                                </p>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className='styleRowText'>
                                        <Col xs={12} md={6}>
                                            <Form.Label>DRAWING NO OLD : <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                            <Form.Control as="textarea" rows={3} onChange={(event) => setMethodOld(event.target.value)} />
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Form.Label>CLASS : <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                                <InputLabel id="demo-select-small-label">Class</InputLabel>
                                                <Select
                                                    labelId="demo-select-small-label"
                                                    id="demo-select-small"
                                                    value={strclass}
                                                    label="Class"
                                                    onChange={handleChangeClass}>
                                                    {
                                                        classArray.map((item, index) =>
                                                            <MenuItem value={item}>{item}</MenuItem>
                                                        )
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Col>
                                    </Row>


                                    <Row className='styleRowText'>
                                        <Col xs={12} md={6}>
                                            <Form.Label>DRAWING NO NEW : <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                            <Form.Control as="textarea" rows={3} onChange={(event) => setMethodNew(event.target.value)} />
                                        </Col>
                                        {
                                            showDueDate && <Col xs={12} md={6}>
                                                <Form.Label>Due Date (Target) : </Form.Label> <br></br>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        value={dayjs(duedate)}
                                                        slotProps={{
                                                            textField: {
                                                                format: 'YYYY-MM-DD',
                                                            },
                                                        }}
                                                        onChange={(newValue) => setduedate(dayjs(newValue).format('YYYY-MM-DD'))}
                                                    />
                                                </LocalizationProvider>
                                            </Col>
                                        }
                                    </Row>


                                    <Row className='styleRowText'>
                                        <Col xs={12} md={6}>
                                            <Form.Label>DETAIL / CHENGE POINT : <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                            <Form.Control as="textarea" rows={3} onChange={(event) => setDetail(event.target.value)} />
                                        </Col>
                                        <Col xs={12} md={6}> </Col>
                                    </Row>


                                    <Row className='styleRowText'>
                                        <Col xs={12} md={6}>
                                            <Form.Label>REQUEST PU  : <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                            <Form.Control as="textarea" rows={3} onChange={(event) => setRequestPU(event.target.value)} />
                                        </Col>
                                        <Col xs={12} md={6}> </Col>
                                    </Row>



                                    {/* <Row className='styleRowText'>
                                        <Col xs={12} md={6}>
                                            <Form.Label>ADD FILE DRAWING  : <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                            <input type="file" name="file" accept='application/pdf' onChange={addFilesDrawing} />
                                            {
                                                filesDrawing.length | 0
                                            }
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Form.Label>ADD FILE BR : <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                            <input type="file" name="file" accept='application/pdf' onChange={addFilesBR} />
                                            {
                                                filesBR.length | 0
                                            }
                                        </Col>
                                    </Row> */}



                                    <br></br>
                                    {
                                        btnAddFile && <Row style={{ display: 'flex', alignItems: 'center' }} >
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
                                                                <MenuItem value={item?.employeeCode}>{item?.employeeFullName}</MenuItem>
                                                            )
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Col>
                                            <Col xs={12} md={3} style={{ marginTop: '-24px' }}>
                                                <InputLabel id="demo-simple-select-label">Position</InputLabel>
                                                <Form.Control type="text" className='FormControl' value={posit} style={{ marginTop: '5px', marginLeft: '11px' }} readOnly />
                                            </Col>
                                            <Col xs={12} md={3}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={step}
                                                        label="Status"
                                                        onChange={handleChangeStep}>
                                                        {
                                                            stepArrayCre.map((item, index) =>
                                                                <MenuItem value={item}>{item}</MenuItem>
                                                            )
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Col>
                                            <Col xs={12} md={2}>
                                                {
                                                    permission.filter((item) => {
                                                        return ((permission[0]?.grpRole == 'RECEIVED' || permission[0]?.grpRole == "ISSUED" || permission[0]?.grpRoleSect == "ADMIN"))
                                                    }).length ? <>
                                                        <Button variant="success" onClick={() => postAddNotifyTo(nbr[0]?.runningNumber, posit, "CREATE")}>
                                                            + เพิ่มผู้ดำเนินการ
                                                        </Button>
                                                    </> : ""
                                                }
                                            </Col>
                                        </Row>
                                    }

                                    <br></br>
                                    {
                                        btnAddFile && <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                            <table className='notify'>
                                                <tr>
                                                    <td style={{ border: '1px solid black', fontSize: '14px', width: '4pc' }}><center><b>Approved (AGM up)</b></center></td>
                                                    <td style={{ border: '1px solid black', fontSize: '14px', width: '4pc' }}><center><b>Checked</b></center></td>
                                                </tr>
                                                <tr>
                                                    <td style={{ border: '1px solid black', color: tableNotify[0]?.cre_approvedBit == "F" ? 'black' : 'gainsboro' }}>
                                                        <center>{tableNotify[0]?.cre_approved}<br></br> {tableNotify[0]?.cre_approvedBit == 'F' ? tableNotify[0]?.cre_approvedDate : ''}</center>
                                                        {
                                                            tableNotify[0]?.cre_approved != null ?
                                                                (typeof permission == 'object' && Object.keys(permission).length && ((permission[0]?.grpRole == 'ISSUED' || permission[0]?.grpRole == 'RECEIVED' || permission[0]?.grpRole == 'ADMIN'))) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(nbr[0]?.runningNumber, tableNotify[0]?.cre_approvedCode, tableNotify[0]?.cre_approved_step)}>
                                                                    ลบ
                                                                </Button>
                                                                : ''
                                                        }
                                                    </td>
                                                    <td style={{ border: '1px solid black', color: tableNotify[0]?.cre_checkedBit == "F" ? 'black' : 'gainsboro' }}>
                                                        <center>{tableNotify[0]?.cre_checked}<br></br>{tableNotify[0]?.cre_checkedBit == 'F' ? tableNotify[0]?.cre_checkedDate : ''}</center>
                                                        {
                                                            tableNotify[0]?.cre_checked != null ?
                                                                (typeof permission == 'object' && Object.keys(permission).length && ((permission[0]?.grpRole == 'ISSUED' || permission[0]?.grpRole == 'RECEIVED' || permission[0]?.grpRole == 'ADMIN'))) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(nbr[0]?.runningNumber, tableNotify[0]?.cre_checkedCode, tableNotify[0]?.cre_check_step)}>
                                                                    ลบ
                                                                </Button>
                                                                : ''
                                                        }
                                                    </td>
                                                </tr>
                                            </table>
                                        </Row>
                                    }


                                </Typography>
                            </AccordionDetails>
                        </Accordion>


                    </DialogContent>
                    <DialogActions>
                    </DialogActions>
                    <div className='styleButtonCreate'>
                        <Stack direction={'row'} gap={3}>
                            <Button variant="secondary" onClick={() => {
                                setFilesDrawing({});
                                setFilesBR({});
                                close(false);
                            }}>
                                Close
                            </Button>
                            {
                                btnAddFile && <Button variant="info" onClick={() => {
                                    var idECR = nbr[0]?.runningNumber;
                                    setEcrnoSelected({
                                        ecrno: idECR, title: title
                                    })
                                    setOpenAttrFile(true);
                                    // close(false)
                                }}><FontAwesomeIcon icon={faFileCirclePlus} /> Add File</Button>
                            }
                        </Stack>
                        <div>
                            <Button autoFocus variant="success" onClick={postInputData}>
                                Save
                            </Button>
                        </div>
                    </div>
                    <br></br>
                </Dialog>
            </BootstrapDialog >


            <ModelAttachFile
                show={openAttrFile}
                // onHide={setOpenAttrFile}
                close={setOpenAttrFile}
                item={ecrnoSelected}
                section={section}
            />


        </div >
    )
}

export default FormCreate