import React, { useEffect, useState } from 'react'
import getDataSrv from '../../service/getdataService.js';
import getDataSrvHD from '../../service/getServiceHeader.js';
import getDataSrvDT from '../../service/getServiceDetail.js';
import getDataSrvPermiss from '../../service/getPermisson.js'
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
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import TextField from '@mui/material/TextField';
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
import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { json } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';




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

function FormDetail(props) {
    //*********************SECTION CREATE************************ */
    // const empCode = localStorage.getItem("name");
    const empCode = Cookies.get('code')
    const permission = useSelector((state) => state.reducer.permission);
    const [dataModaldt, setDataModaldt] = useState([]);
    const [cbPUEdit, setcbPUEdit] = useState([]);
    const [cbDDEdit, setcbDDEdit] = useState([]);
    const [cbMODELEdit, setcbMODELEdit] = useState([]);
    const [cbLINEEdit, setcbLINEEdit] = useState([]);
    const [cbFORDDNEEDEdit, setcbFORDDNEEDEdit] = useState([]);
    const [cbItemSecDD, setCBItemSecDD] = useState([]);
    const [dictQC, setDictQC] = useState([]);
    const [cbChchanges, setcbChchanges] = useState([]);
    const [cbCustomer, setcbCustomer] = useState([]);
    const [cbDistribution, setCBDistribution] = useState([]);
    const [openAttrFile, setOpenAttrFile] = useState(false);
    const [ecrnoSelected, setEcrnoSelected] = useState('');
    const [itemOther, setItemOther] = useState('');
    const [notification, setNotification] = useState('');
    const [drNo, setDrNo] = useState('');
    const [modelOther, setModelOther] = useState('');
    const [lineOther, setLineOther] = useState('');
    const [partNo, setpartNo] = useState('');
    const [partName, setpartName] = useState('');
    const [remark, setremark] = useState('');
    const [method, setMethod] = useState('');
    const [purpose, setPurpose] = useState('');
    const [methodOld, setMethodOld] = useState('');
    const [methodNew, setMethodNew] = useState('');
    const [detail, setDetail] = useState('');
    const [duedate, setduedate] = useState(moment().format('YYYY-MM-DD'));
    const [remarkPU, setRemarkPU] = useState('');
    const [remarkCancel, setRemarkCancel] = useState('');
    const [receive, setReceive] = useState('');
    const [DDRemark2, setDD_Remark2] = useState('');
    const [pu_Receive, setPU_Receive] = useState('');
    const [dd_Receive, setDD_Receive] = useState('');
    const [en_Receive, setEN_Receive] = useState('');
    const [sqc_Receive, setSQC_Receive] = useState('');
    const [qc_Receive, setQC_Receive] = useState('');
    const [dil_Receive, setDIL_Receive] = useState('');
    const [qa_Receive, setQA_Receive] = useState('');
    const [remarkEN, setRemarkEN] = useState('');
    const [remarkSQC, setRemarkSQC] = useState('');
    const [remarkQC1, setRemarkQC1] = useState('');
    const [remarkDILDD, setRemarkDILDD] = useState('');
    const [issuedDILDD, setIssuedDILDD] = useState('');
    const [checkDILDD, setCheckDILDD] = useState('');
    const [approvedDILDD, setApprovedDILDD] = useState('');
    const [remarkDILQC, setRemarkDILQC] = useState('');
    const [issuedDILQC, setIssuedDILQC] = useState('');
    const [checkDILQC, setCheckDILQC] = useState('');
    const [approvedDILQC, setApprovedDILQC] = useState('');
    const [otherCus, setOtherCus] = useState('');
    const [informationDate, setInformationDate] = useState(moment().format('YYYY-MM-DD'));
    const [informationBy, setInformationBy] = useState('');
    const [employeeArrayCRE, setEmployeeArrayCRE] = useState([]);
    const [employeeArrayPU, setEmployeeArrayPU] = useState([]);
    const [employeeArrayDD, setEmployeeArrayDD] = useState([]);
    const [employeeArrayEN, setEmployeeArrayEN] = useState([]);
    const [employeeArrayQC, setEmployeeArrayQC] = useState([]);
    const [employee, setemployee] = useState('');
    const [step, setStep] = useState('ISSUED');
    const [showDtSec, setshowDtSec] = useState(false);
    const [tableNotify, setTableNotify] = useState([]);
    const [notify, setNotify] = useState('PU');
    const { show, close, ecrno, refresh, statusCreateAppBit } = props;
    let section = permission[0]?.grpRoleSect;
    let position = permission[0]?.grpRole;
    const [strclass, setClass] = useState('');
    const [requestPU, setRequestPU] = useState('');
    const [showDueDate, setShowDueDate] = useState(false)
    const [strposition, setPosition] = useState('');
    const [radioDILDD, setRadioDILDD] = React.useState('NEED');
    const [radioDILQC, setRadioDILQC] = React.useState('NEED');


    useEffect(() => {
        if (show) {
            initFiles();
            setExpanded(Ppanel(section, position, statusCreateAppBit));
        }
    }, [show]);

    useEffect(() => {
        if (typeof dataModaldt != 'undefined' && Object.keys(dataModaldt).length) {
            setClass(dataModaldt[0].strclass)
        }
    }, [dataModaldt]);
    useEffect(() => {
        if (strclass != '') {
        }
    }, [strclass])
    const initFiles = () => {
        dataModaldt.createBy = empCode;
        // setDataModaldt([...dataModaldt])
        getDataSrv.getDetailCreate(ecrno).then((res) => {
            try {
                if (Object.keys(res.data).length) {
                    setDataModaldt(res.data.detail);
                    setcbPUEdit(res.data.pu);
                    setcbDDEdit(res.data.dd);
                    setcbMODELEdit(res.data.model);
                    setcbLINEEdit(res.data.line);
                    setcbFORDDNEEDEdit(res.data.forDD);
                    setCBItemSecDD(res.data.itemSecDD);
                    setDictQC(res.data.itemSecQC);
                    setcbChchanges(res.data.chChangesQA);
                    setcbCustomer(res.data.customer);
                    setCBDistribution(res.data.distribution);
                    if (res.data.detail[0]?.section == 'Purchasing') {
                        setshowDtSec(true);
                    }
                    else {
                        setshowDtSec(false);
                    }
                }
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });

        getDataSrvPermiss.getEmployeeForCreate().then((res) => {
            try {
                setEmployeeArrayCRE(res.data);
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });

        getDataSrvPermiss.getEmployeeForPU().then((res) => {
            try {
                setEmployeeArrayPU(res.data);
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });

        getDataSrvPermiss.getEmployeeForDD().then((res) => {
            try {
                setEmployeeArrayDD(res.data);
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });

        getDataSrvPermiss.getEmployeeForEN().then((res) => {
            try {
                setEmployeeArrayEN(res.data);
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });

        getDataSrvPermiss.getEmployeeForQC().then((res) => {
            try {
                setEmployeeArrayQC(res.data);
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });

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
    //*********************END SECTION CEREATE******************** */

    const group = (val) => {
        var varGroup = '';

        if (val == 'Design') {
            varGroup = "DD"
        }
        else {
            varGroup = "PU";
        }
        return varGroup;
    }

    const creSec = group(dataModaldt[0]?.section);
    const roleSec = permission[0]?.grpRoleSect;



    const Ppanel = (section, step, statusCreateAppBit) => {
        let varpanel = '';

        if (section == 'ADMIN') {
            varpanel = "CREATE"
        }
        else if (section == 'PU' && statusCreateAppBit != 'F') {
            varpanel = "CREATE"
        }
        else if (section == 'PU' && statusCreateAppBit == 'F') {
            varpanel = "PU"
        }
        else if (section == 'DD' && statusCreateAppBit != 'F') {
            varpanel = "CREATE"
        }
        else if (section == 'DD' && statusCreateAppBit == 'F') {
            varpanel = "DD"
        }
        else if (section == 'EN') {
            varpanel = "EN"
        }
        else if (section == 'SQC') {
            varpanel = "SQC"
        }
        else if (section == 'QC') {
            varpanel = "QC"
        }
        else if (section == 'DIL') {
            varpanel = "DIL"
        }
        else if (section == 'QA') {
            varpanel = "QA"
        }
        // else if (step == 'RECEIVED') {
        //     varpanel = "RECEIVE"
        // }
        // else {
        //     varpanel = "CREATE"
        // }

        return varpanel;
    }

    //********************* Collapsible ************************ */
    const [expanded, setExpanded] = useState('');

    const handleChangeCollapse = (section) => (event, newExpanded) => {
        setExpanded(newExpanded ? section : false);
    };
    //*********************END Collapsible ************************ */


    //*************************** FUNCTON DELETE DOCUMENT*************************** */
    const getDeleteDoc = (ecR_NO) => {
        let txtAlertDelete = "คุณต้องการลบเอกสาร ใช่หรือไม่?";
        if (confirm(txtAlertDelete) == true) {
            getDataSrv.getDeleteDoc(ecR_NO).then((res) => {
                try {
                    refresh();
                    close(false);
                }
                catch (error) {
                    console.log(error);
                    return error;
                }
            });
        }
    };
    //***************************END FUNCTON DELETE DOCUMENT*************************** */
    //*****************FUNCTION เปลี่ยนข้อมูลจาก Array เป็น String + Comma */
    const selectItem = (cb) => {
        return cb.filter((item) => item.checked).map((item) => {
            return item.dict_Code
        }).join(',')
    }
    //*****************FUNCTION เปลี่ยนข้อมูลจาก Array เป็น String + Comma */
    var data = dataModaldt;

    function handleCheckBoxPUEdit(indexCheck, checked) {
        cbPUEdit[indexCheck]['checked'] = checked;
        data[0] = { ...data[0], item: selectItem(cbPUEdit) }
        setDataModaldt(data);
        setcbPUEdit([...cbPUEdit]);
    }

    function handleCheckBoxDDEdit(indexCheck, checked) {
        cbDDEdit[indexCheck]['checked'] = checked;
        data[0] = { ...data[0], item: selectItem(cbDDEdit) }
        setDataModaldt(data);
        setcbDDEdit([...cbDDEdit]);
    }

    function handleCheckBoxMODELEdit(indexCheck, checked) {
        cbMODELEdit[indexCheck]['checked'] = checked;
        data[0] = { ...data[0], model: selectItem(cbMODELEdit) }
        setDataModaldt(data);
        setcbMODELEdit([...cbMODELEdit]);
    }

    function handleCheckBoxLINEEdit(indexCheck, checked) {
        cbLINEEdit[indexCheck]['checked'] = checked;
        data[0] = { ...data[0], line: selectItem(cbLINEEdit) }
        setDataModaldt(data);
        setcbLINEEdit([...cbLINEEdit]);
    }

    function handleCheckBoxFORDDNEEDEdit(indexCheck, checked) {
        cbFORDDNEEDEdit[indexCheck]['checked'] = checked;
        data[0] = { ...data[0], forDDsection: selectItem(cbFORDDNEEDEdit) }
        setDataModaldt(data);
        setcbFORDDNEEDEdit([...cbFORDDNEEDEdit]);
    }

    function handleCheckBoxSecDD(indexCheck, checked) {
        cbItemSecDD[indexCheck]['checked'] = checked;
        data[0] = { ...data[0], dD_Remark1: selectItem(cbItemSecDD) }
        setDataModaldt(data);
        setCBItemSecDD([...cbItemSecDD]);
    }


    function handleChChangesCus(indexCheck, checked) {
        cbChchanges[indexCheck]['checked'] = checked;
        data[0] = { ...data[0], chChangesQA: selectItem(cbChchanges) }
        setDataModaldt(data);
        setcbChchanges([...cbChchanges]);
    }


    function handleCustomer(indexCheck, checked) {
        cbCustomer[indexCheck]['checked'] = checked;
        data[0] = { ...data[0], customerForQA: selectItem(cbCustomer) }
        setDataModaldt(data);
        setcbCustomer([...cbCustomer]);
    }


    function handleDistribution(indexCheck, checked) {
        cbDistribution[indexCheck]['checked'] = checked;
        data[0] = { ...data[0], distribution: selectItem(cbDistribution) }
        setDataModaldt(data);
        setCBDistribution([...cbDistribution]);
    }




    function handleCheckBoxQCEdit(qcCode, checked, type) {
        var qc = [];  // ประกาศตัวแปรที่เป็น Arry
        if (dataModaldt[0].qC_Remark2 != "") {   // เช็คว่าตำแหน่งแรกต้องไม่เท่ากับค่าว่าง
            qc = dataModaldt[0]?.qC_Remark2.split(',');     // แปลงค่า String = QCD01,QCD02,QCD03 ให้เป็น Arry = [QCD01,QCD02,QCD03] 
        }


        if (type == 'checkbox') {  // Type checkbox
            if (qcCode == 'QCD07' && checked == false) {
                // เอา 71 - 74 ออก
                var index = qc.indexOf('QCD07');
                if (index !== -1) {
                    qc.splice(index, 1);
                }
                var index = qc.indexOf('QCD071');
                if (index !== -1) {
                    qc.splice(index, 1);
                }
                var index = qc.indexOf('QCD072');
                if (index !== -1) {
                    qc.splice(index, 1);
                }
                var index = qc.indexOf('QCD073');
                if (index !== -1) {
                    qc.splice(index, 1);
                }
                var index = qc.indexOf('QCD074');
                if (index !== -1) {
                    qc.splice(index, 1);
                }
            } else {
                if (checked) {  // เช็คค่า QCD ใน Dict ถูกเช็คว่า checked = true ไหม
                    qc.push(qcCode);  // ถ้า checked = true เป็นเมธอดสำหรับเพิ่มข้อมูลเข้าไปยังอาเรย์
                } else {  // else คือ checked = false
                    var index = qc.indexOf(qcCode);  // คำสั่งตัดค่าใน Arry ที่ไม่มีการบันทึกในฐานข้อมูลทิ้ง แล้วเป็นตัวแปร index
                    qc.splice(index, 1);   // ทำการตัดค่าตำแหน่ง ด้วยค่าที่อยู่ในตัวแปร index ทิ้งกรณีไม่มีค่าใน Arry
                }
            }
        }
        else { // Type Radio
            if (qcCode == 'QCD071' && checked) {
                // เอา 71 ไม่เอา 72
                qc.push(qcCode);
                var index = qc.indexOf('QCD072');
                if (index !== -1) {
                    qc.splice(index, 1);
                }
            } else if (qcCode == 'QCD072' && checked) {
                // เอา 72 ไม่เอา 71
                qc.push(qcCode);
                var index = qc.indexOf('QCD071');
                if (index !== -1) {
                    qc.splice(index, 1);
                }
            } else if (qcCode == 'QCD073' && checked) {
                // เอา 73 ไม่เอา 74
                qc.push(qcCode);
                var index = qc.indexOf('QCD074');
                if (index !== -1) {
                    qc.splice(index, 1);
                }
            } else if (qcCode == 'QCD074' && checked) {
                // เอา 74 ไม่เอา 73
                qc.push(qcCode);
                var index = qc.indexOf('QCD073');
                if (index !== -1) {
                    qc.splice(index, 1);
                }
            }

            if (checked && !qc.includes("QCD07")) {  //  เช็คว่าถ้าใน Arry qc ไม่มี ค่า QCD07 
                qc.push('QCD07')   // ให้เพิ่ม QCD07
            }

        }

        dataModaldt[0].qC_Remark2 = qc.join(',');   // อ่านจากขวามาซ้าย  qc คือ Arry   >>> คือการถอดค่าที่เป็น Arry 
        setDataModaldt([...dataModaldt])
    }


    //***************************FUNCTON EDIT DATA*************************** */
    const upDateData = (ecrno) => {
        let txtAlertUpdate = "คุณต้องการ แก้ไขเอกสารหรือไม่ ";
        if (confirm(txtAlertUpdate) == true) {
            getDataSrv.postUpdateData(dataModaldt[0]).then((res) => {
                try {
                    refresh();
                    //close(false);
                    alert("successfully")
                }
                catch (error) {
                    return error;
                }
            });
        } else {
        }
    };
    //***************************END FUNCTON EDIT DATA*************************** */


    //**************************** FUNCTION RECEIVE************ */
    const getReceive = (ecrno) => {
        let sectionReceive = "";
        if (section == 'PU') {
            sectionReceive = dataModaldt[0].pU_Receive_Remark
        }
        else if (section == 'DD') {
            sectionReceive = dataModaldt[0].dD_Remark_Receive
        }
        else if (section == 'EN') {
            sectionReceive = dataModaldt[0].eN_Remark_Receive
        }
        else if (section == 'SQC') {
            sectionReceive = dataModaldt[0].sqC_Remark_Receive
        }
        else if (section == 'QC') {
            sectionReceive = dataModaldt[0].qC_Remark_Receive
        }
        else if (section == 'DIL') {
            sectionReceive = dataModaldt[0].diL_Remark_Receive
        }
        else if (section == 'QA') {
            sectionReceive = dataModaldt[0].qA_Remark_Receive
        }

        // console.log(object)
        // return false

        getDataSrvDT.postReceive({ ecrno: ecrno, remark: sectionReceive, issued: empCode, section: section }).then((res) => {
            try {
                refresh();
                close(false);
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    };
    //****************************END FUNCTION RECEIVE************ */


    //**************************** FUNCTION ISSUED************ */
    const getIssued = (ecrno) => {
        data[0] = { ...data[0], group: section }
        data[0] = { ...data[0], empcode: empCode }
        //data[0] = { ...data[0], qA_InformationDate: dataModaldt[0].qA_InformationDate }
        setDataModaldt(data);
        setDataModaldt([...dataModaldt]);
        if (dataModaldt[0]?.qA_InformationDate == "") {
            data[0] = { ...data[0], qA_InformationDate: informationDate }
        }
        else {

        }

        getDataSrvDT.postIssued(dataModaldt[0]).then((res) => {
            try {
                refresh();
                close(false);
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    };
    //****************************END FUNCTION ISSUED************ */


    //**************************** FUNCTION CHECK************ */
    const getCheck = (ecrno, ecrCreateBySection, ecrCreateStatus) => {

        let createBySection = (ecrCreateBySection == 'Design') ? 'DD' : 'PU';

        let _section = (createBySection == section) ? (ecrCreateStatus == 'U' || ecrCreateStatus == 'R') ? 'CREATE' : section : section;

        getDataSrvHD.getCheck(ecrno, empCode, _section).then((res) => {
            try {
                refresh();
                close(false);
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    };
    //****************************END FUNCTION CHECK************ */


    //**************************** FUNCTION APPROVED************ */
    const getApproved = (ecrno, ecrCreateBySection, ecrCreateStatus) => {
        let createBySection = (ecrCreateBySection == 'Design') ? 'DD' : 'PU';

        let _section = (createBySection == section) ? (ecrCreateStatus == 'U' || ecrCreateStatus == 'R') ? 'CREATE' : section : section;
        getDataSrvHD.getApproved(ecrno, empCode, _section).then((res) => {
            try {
                refresh();
                close(false);
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    };
    //****************************END FUNCTION APPROVED************ */



    //**************************** FUNCTION APPROVED DIL************ */
    const ApprovedDIL = (ecrno) => {
        getDataSrvDT.postApprovedDIL({ ecrno: ecrno, empcode: empCode, remarkdd: radioDILDD, remarkqc: radioDILQC }).then((res) => {
            try {
                refresh();
                close(false);
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    };
    //****************************END FUNCTION APPROVED DIL************ */


    //**************************** FUNCTION RECEIVE************ */
    const getReturn = (ecrno) => {
        if (remarkCancel != "") {
            getDataSrvDT.getReturn({ ecrno: ecrno, remark: remarkCancel, issued: empCode, section: section, position: position }).then((res) => {
                try {
                    //initFiles();
                    refresh();
                    close(false);
                }
                catch (error) {
                    console.log(error);
                    return error;
                }
            });
        } else {
            alert("กรุณาใส่เหตุผลการตีกลับ (Return)");
            this.txtCancel.focus();
        }
    };
    //****************************END FUNCTION RECEIVE************ */
    const stepArray = ['ISSUED', 'CHECK', 'APPROVED'];

    const stepArrayCre = ['CHECK', 'APPROVED'];

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


    const classArray = ['CLASS A', 'CLASS B', 'CLASS C', 'CLASS D', 'CLASS E']


    const handleChangeClass = (event) => {
        setClass([...dataModaldt])
        setClass(event.target.value)

        let data = dataModaldt;
        data[0].strclass = event.target.value;
        setDataModaldt([...data]);

        if (event.target.value == "CLASS C" || event.target.value == "CLASS D" || event.target.value == "CLASS E") {
            setShowDueDate(true)
        }
        else {
            setShowDueDate(false)
        }
    };

    const handleChangeRadioDILDD = (event) => {
        setRadioDILDD(event.target.value);
    };


    const handleChangeRadioDILQC = (event) => {
        setRadioDILQC(event.target.value);
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
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        <h3>ECR Detail</h3>
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
                        {/* <Button onClick={handleAdd}>TEST ADD</Button> */}
                        <div class="row">
                            <div class="col-sm-2">  </div>
                            <div class="col-sm-10">
                                <h5 style={{ marginLeft: '10%' }}>ENGINEERING CHANGE REQUEST</h5>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-7"></div>
                            <div class="col-sm-5">
                                <Form.Label>ECR NO :</Form.Label>
                                <Form.Control type="text" className='FormControl' style={{ backgroundColor: 'rgb(255 141 0)', color: 'white' }} value={dataModaldt[0]?.ecR_NO} readOnly />
                            </div>
                        </div>
                        <hr></hr>

                        <Row className='styleChangeItem'>
                            <div class="col-sm-7" style={{ display: 'flex' }}>
                                <h6>TITLE</h6> &nbsp; &nbsp; <span style={{ color: 'red', fontSize: '18px' }}>*</span>
                                {
                                    <TextField id="txtTitle" variant="standard" style={{ width: '95%' }} value={decodeURIComponent(dataModaldt[0]?.title)} disabled={(position == "ISSUED" || position == "RECEIVED" || position == "ADMIN") ? false : true}
                                        onChange={(e) => {
                                            dataModaldt[0].title = e.target.value;
                                            setDataModaldt([...dataModaldt]);
                                        }} />
                                }
                                <br></br><br></br>
                            </div>

                            <div class="col-sm-5" style={{ display: 'flex' }}>
                                <Form.Label>Section &nbsp; &nbsp;</Form.Label>
                                <Form.Control type="text" value={dataModaldt[0]?.section} style={{ backgroundColor: '#b9edf3' }} readOnly />
                            </div>
                        </Row>



                        <Accordion expanded={expanded === 'CREATE'} onChange={handleChangeCollapse('CREATE')}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography>ส่วนที่ 1 Create ECR</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {showDtSec ? (
                                        <Row className='styleRow'>
                                            <Col xs={12} md={12}>
                                                <div className='styleCard'>
                                                    <Form.Label>PU <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                                    <div>
                                                        {
                                                            cbPUEdit.map((item, index) => {
                                                                var isChecked = dataModaldt[0]?.item.split(',').includes(item?.dict_Code);
                                                                return <div key={item?.dict_Code} style={{ display: 'flex' }} > <input defaultChecked={isChecked} type="checkbox" value={item} onChange={(event) => handleCheckBoxPUEdit(index, event.target.checked)} disabled={(position == "ISSUED" || position == "RECEIVED" || position == "ADMIN") ? false : true} />    <div style={{ display: 'none' }}> {item?.dict_Code} </div> <div style={{ marginLeft: '13px' }}>{item?.dict_Desc}</div> <br></br></div>
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
                                                            <TextField id="txtOtherPU" label="Other..." variant="standard" style={{ width: '95%' }} value={decodeURIComponent(dataModaldt[0]?.item_Other)} disabled={(position == "ISSUED" || position == "RECEIVED" || position == "ADMIN") ? false : true}
                                                                onChange={(event) => {
                                                                    dataModaldt[0].item_Other = event.target.value;
                                                                    setItemOther([...dataModaldt])
                                                                }} />
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
                                                            cbDDEdit.map((item, index) => {
                                                                var isChecked = dataModaldt[0]?.item.split(',').includes(item?.dict_Code);
                                                                return <div key={item?.dict_Code} style={{ display: 'flex' }} > <input defaultChecked={isChecked} type="checkbox" value={item} onChange={(event) => handleCheckBoxDDEdit(index, event.target.checked)} disabled={(position == "ISSUED" || position == "RECEIVED" || position == "ADMIN") ? false : true} />    <div style={{ display: 'none' }}> {item?.dict_Code} </div> <div style={{ marginLeft: '13px' }}>{item?.dict_Desc}</div> <br></br></div>
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
                                                            <TextField id="txtOtherNoti" label="Notification" variant="standard" style={{ width: '95%' }} value={decodeURIComponent(dataModaldt[0]?.notificationNO)} disabled={(position == "ISSUED" || position == "RECEIVED" || position == "ADMIN") ? false : true}
                                                                onChange={(event) => {
                                                                    dataModaldt[0].notificationNO = event.target.value;
                                                                    setNotification([...dataModaldt])
                                                                }} /><br></br>
                                                            <TextField id="txtOtherDrNo" label="DR No" variant="standard" style={{ width: '95%' }} value={decodeURIComponent(dataModaldt[0]?.drno)} disabled={(position == "ISSUED" || position == "RECEIVED" || position == "ADMIN") ? false : true}
                                                                onChange={(event) => {
                                                                    dataModaldt[0].drno = event.target.value;
                                                                    setDrNo([...dataModaldt])
                                                                }} /><br></br>
                                                            <TextField id="txtOtherDD" label="Other...." variant="standard" style={{ width: '95%' }} value={decodeURIComponent(dataModaldt[0]?.item_Other)} disabled={(position == "ISSUED" || position == "RECEIVED" || position == "ADMIN") ? false : true}
                                                                onChange={(event) => {
                                                                    dataModaldt[0].item_Other = event.target.value;
                                                                    setItemOther([...dataModaldt])
                                                                }} />
                                                        </Box>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    }
                                    <Row className='styleRow'>
                                        <Col xs={12} md={4}>
                                            <div className='styleCard'>
                                                <Form.Label>MODEL <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                                <div>
                                                    {
                                                        cbMODELEdit.map((item, index) => {
                                                            var isChecked = dataModaldt[0]?.model.split(',').includes(item?.dict_Code);
                                                            return <div key={item?.dict_Code} style={{ display: 'flex' }} > <input defaultChecked={isChecked} type="checkbox" value={item} onChange={(event) => handleCheckBoxMODELEdit(index, event.target.checked)} disabled={(position == "ISSUED" || position == "RECEIVED" || position == "ADMIN") ? false : true} />    <div style={{ display: 'none' }}> {item?.dict_Code} </div> <div style={{ marginLeft: '13px' }}>{item?.dict_Desc}</div> <br></br></div>
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
                                                        <TextField id="txtOtherModel" label="Other..." variant="standard" style={{ width: '95%' }} value={decodeURIComponent(dataModaldt[0]?.modelOther)} disabled={(position == "ISSUED" || position == "RECEIVED" || position == "ADMIN") ? false : true}
                                                            onChange={(event) => {
                                                                dataModaldt[0].modelOther = event.target.value;
                                                                setModelOther([...dataModaldt])
                                                            }} />
                                                    </Box>
                                                </div>
                                            </div>
                                        </Col>


                                        <Col xs={12} md={4}>
                                            <div className='styleCard'>
                                                <Form.Label>LINE <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                                <div>
                                                    {
                                                        cbLINEEdit.map((item, index) => {
                                                            var isChecked = dataModaldt[0]?.line.split(',').includes(item?.dict_Code);
                                                            return <div key={item?.dict_Code} style={{ display: 'flex' }} > <input defaultChecked={isChecked} type="checkbox" value={item} onChange={(event) => handleCheckBoxLINEEdit(index, event.target.checked)} disabled={(position == "ISSUED" || position == "RECEIVED" || position == "ADMIN") ? false : true} />    <div style={{ display: 'none' }}> {item?.dict_Code} </div> <div style={{ marginLeft: '13px' }}>{item?.dict_Desc}</div> <br></br></div>
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
                                                        <TextField id="txtOtherLine" label="Other..." variant="standard" style={{ width: '95%' }} value={decodeURIComponent(dataModaldt[0]?.lineOther)} disabled={(position == "ISSUED" || position == "RECEIVED" || position == "ADMIN") ? false : true}
                                                            onChange={(event) => {
                                                                dataModaldt[0].lineOther = event.target.value;
                                                                setLineOther([...dataModaldt])
                                                            }} />
                                                    </Box>
                                                </div>
                                            </div>
                                        </Col>

                                        {showDtSec ? (
                                            <Col></Col>
                                        ) :
                                            <Col xs={12} md={4}>
                                                <div className='styleCard'>
                                                    <Form.Label>FOR DD <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                                    <div>
                                                        {
                                                            cbFORDDNEEDEdit.map((item, index) => {
                                                                var isChecked = dataModaldt[0]?.forDDsection.split(',').includes(item?.dict_Code);
                                                                return <div key={item?.dict_Code} style={{ display: 'flex' }} > <input defaultChecked={isChecked} type="checkbox" value={item} onChange={(event) => handleCheckBoxFORDDNEEDEdit(index, event.target.checked)} disabled={(position == "ISSUED" || position == "RECEIVED" || position == "ADMIN") ? false : true} />    <div style={{ display: 'none' }}> {item?.dict_Code} </div> <div style={{ marginLeft: '13px' }}>{item?.dict_Desc}</div> <br></br></div>
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
                                        }
                                    </Row>

                                    <Row className='styleRowText'>
                                        <Col xs={6} md={4}>
                                            <Form.Label>PART NO (DRAWING) <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                            <Form.Control type="text" id="txtOtherModel" label="Other..." variant="standard" style={{ width: '95%', backgroundColor: 'rgb(250 249 114)' }} value={decodeURIComponent(dataModaldt[0]?.partno)} disabled={(position == "ISSUED" || position == "RECEIVED" || position == "ADMIN") ? false : true}
                                                onChange={(event) => {
                                                    dataModaldt[0].partno = event.target.value;
                                                    setpartNo([...dataModaldt])
                                                }} />
                                        </Col>
                                        <Col xs={6} md={4}>
                                            <Form.Label>PART NAME <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                            <Form.Control type="text" id="txtOtherModel" label="Other..." variant="standard" style={{ width: '95%', backgroundColor: 'rgb(250 249 114)' }} value={decodeURIComponent(dataModaldt[0]?.partName)} disabled={(position == "ISSUED" || position == "RECEIVED" || position == "ADMIN") ? false : true}
                                                onChange={(event) => {
                                                    dataModaldt[0].partName = event.target.value;
                                                    setpartName([...dataModaldt])
                                                }} />
                                        </Col>
                                        <Col xs={6} md={4}>
                                            <Form.Label>REMARK / MODEL <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                            <Form.Control type="text" id="txtOtherModel" label="Other..." variant="standard" style={{ width: '95%', backgroundColor: 'rgb(250 249 114)' }} value={decodeURIComponent(dataModaldt[0]?.remarkCreate)} disabled={(position == "ISSUED" || position == "RECEIVED" || position == "ADMIN") ? false : true}
                                                onChange={(event) => {
                                                    dataModaldt[0].remarkCreate = event.target.value;
                                                    setremark([...dataModaldt])
                                                }} />
                                        </Col>
                                    </Row>



                                    <Row className='styleRowText'>
                                        <Col xs={12} md={6}>
                                            <Form.Label>Purpose : <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                            <Form.Control as="textarea" rows={1} variant="standard" value={decodeURIComponent(dataModaldt[0]?.purpose)} disabled={(position == "ISSUED" || position == "RECEIVED" || position == "ADMIN") ? false : true}
                                                onChange={(event) => {
                                                    dataModaldt[0].purpose = event.target.value;
                                                    setPurpose([...dataModaldt])
                                                }} />
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Form.Label>CLASS : <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                                <InputLabel id="demo-select-small-label">CLASS</InputLabel>
                                                <Select disabled={(position == "ISSUED" || position == "RECEIVED" || position == "ADMIN") ? false : true}
                                                    labelId="demo-select-small-label"
                                                    id="demo-select-small"
                                                    value={strclass}
                                                    label="Class"
                                                    onChange={handleChangeClass}>
                                                    {
                                                        classArray.map((item, index) => {
                                                            return <MenuItem value={item}>{item}</MenuItem>
                                                        }

                                                        )
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Col>
                                    </Row>



                                    <Row className='styleRowText'>
                                        <Col xs={12} md={6}>
                                            <Form.Label>Method Old : <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                            <Form.Control as="textarea" rows={1} variant="standard" value={decodeURIComponent(dataModaldt[0]?.methodOld)} disabled={(position == "ISSUED" || position == "RECEIVED" || position == "ADMIN") ? false : true}
                                                onChange={(event) => {
                                                    dataModaldt[0].methodOld = event.target.value;
                                                    setMethodOld([...dataModaldt])
                                                }} />
                                            {/* <Form.Control as="textarea" rows={1} onChange={(event) => setMethodOld(event.target.value)} /> */}
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Form.Label>Due Date (Target) : &nbsp;&nbsp;</Form.Label>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    // 2023-10-31
                                                    value={dayjs(dataModaldt[0]?.duedate)}
                                                    slotProps={{
                                                        textField: {
                                                            format: 'YYYY-MM-DD',
                                                        },
                                                    }}
                                                    onChange={(val) => {
                                                        dataModaldt[0].duedate = val.format('YYYY-MM-DD');
                                                        setDataModaldt([...dataModaldt])
                                                    }}
                                                    disabled={(position == "ISSUED" || position == "RECEIVED" || position == "ADMIN") ? false : true}
                                                />
                                            </LocalizationProvider>
                                        </Col>
                                    </Row>



                                    <Row className='styleRowText'>
                                        <Col xs={12} md={6}>
                                            <Form.Label>Method New : <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                            <Form.Control as="textarea" rows={1} variant="standard" value={decodeURIComponent(dataModaldt[0]?.methodNew)} disabled={(position == "ISSUED" || position == "RECEIVED" || position == "ADMIN") ? false : true}
                                                onChange={(event) => {
                                                    dataModaldt[0].methodNew = event.target.value;
                                                    setMethodNew([...dataModaldt])
                                                }} />
                                            {/* <Form.Control as="textarea" rows={1} onChange={(event) => setMethodNew(event.target.value)} /> */}
                                        </Col>
                                        <Col xs={12} md={6}>
                                        </Col>
                                    </Row>



                                    <Row className='styleRowText'>
                                        <Col xs={12} md={6}>
                                            <Form.Label>Detail : <span style={{ color: 'red', fontSize: '18px' }}>*</span></Form.Label>
                                            <Form.Control as="textarea" rows={1} variant="standard" value={decodeURIComponent(dataModaldt[0]?.detail)} disabled={(position == "ISSUED" || position == "RECEIVED" || position == "ADMIN") ? false : true}
                                                onChange={(event) => {
                                                    dataModaldt[0].detail = event.target.value;
                                                    setDetail([...dataModaldt])
                                                }} />
                                            {/* <Form.Control as="textarea" rows={3} onChange={(event) => setDetail(event.target.value)} /> */}
                                        </Col>
                                        <Col xs={12} md={6}></Col>
                                    </Row>



                                    <Row className='styleRowText'>
                                        <Col xs={12} md={6}>
                                            <Form.Label>REQUEST PU  : <span style={{ color: '#fc5757', fontSize: '18px', color: 'white' }}>*</span></Form.Label>
                                            {/* <Form.Control as="textarea" rows={1} onChange={(event) => setRequestPU(event.target.value)} /> */}
                                            <Form.Control as="textarea" rows={1} variant="standard" value={decodeURIComponent(dataModaldt[0]?.requestPU)} disabled={(position == "ISSUED" || position == "RECEIVED" || position == "ADMIN") ? false : true}
                                                onChange={(event) => {
                                                    dataModaldt[0].requestPU = event.target.value;
                                                    setRequestPU([...dataModaldt])
                                                }} />
                                        </Col>
                                        <Col xs={12} md={6}> </Col>
                                    </Row>



                                    <br></br>
                                    <Row style={{ display: 'flex', alignItems: 'center' }} >
                                        <Col xs={12} md={4}>
                                            <FormControl fullWidth disabled={(position == 'CHECK' || position == 'APPROVED') ? true : false}>
                                                <InputLabel id="demo-simple-select-label">EmpCode</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={employee}
                                                    label="EmpCode"
                                                    onChange={handleChangeEmployee}>
                                                    {
                                                        employeeArrayCRE.map((item, index) =>
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
                                            <FormControl fullWidth disabled={(position == 'CHECK' || position == 'APPROVED') ? true : false}>
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
                                                    return ((permission[0]?.grpRole == 'RECEIVED' || dataModaldt[0]?.grpRole != "ISSUED" || permission[0]?.grpRoleSect == "ADMIN") && dataModaldt[0]?.create_CheckBit != "F" && empCode == dataModaldt[0]?.createECRBy)
                                                }).length ? <>
                                                    <Button variant="success" onClick={() => postAddNotifyTo(dataModaldt[0]?.ecR_NO, posit, "CREATE")} disabled={(position == 'CHECK' || position == 'APPROVED') ? true : false}>
                                                        + เพิ่มผู้ดำเนินการ
                                                    </Button>
                                                </> : ""
                                            }
                                        </Col>
                                    </Row>

                                    <br></br>
                                    <Row style={{ display: 'flex', justifyContent: 'center' }}>
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
                                                            (typeof permission == 'object' && Object.keys(permission).length && ((permission[0]?.grpRole == 'ISSUED' || permission[0]?.grpRole == 'RECEIVED' || permission[0]?.grpRole == 'ADMIN') && dataModaldt[0]?.create_CheckBit != "F" && empCode == dataModaldt[0]?.createECRBy)) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.cre_approvedCode, tableNotify[0]?.cre_approved_step)}>
                                                                ลบ
                                                            </Button>
                                                            : ''
                                                    }
                                                </td>
                                                <td style={{ border: '1px solid black', color: tableNotify[0]?.cre_checkedBit == "F" ? 'black' : 'gainsboro' }}>
                                                    <center>{tableNotify[0]?.cre_checked}<br></br>{tableNotify[0]?.cre_checkedBit == 'F' ? tableNotify[0]?.cre_checkedDate : ''}</center>
                                                    {
                                                        tableNotify[0]?.cre_checked != null ?
                                                            (typeof permission == 'object' && Object.keys(permission).length && ((permission[0]?.grpRole == 'ISSUED' || permission[0]?.grpRole == 'RECEIVED' || permission[0]?.grpRole == 'ADMIN') && dataModaldt[0]?.create_CheckBit != "F" && empCode == dataModaldt[0]?.createECRBy)) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.cre_checkedCode, tableNotify[0]?.cre_check_step)}>
                                                                ลบ
                                                            </Button>
                                                            : ''
                                                    }
                                                    {/* {
                                                        JSON.stringify(tableNotify)
                                                    } */}
                                                </td>
                                            </tr>
                                        </table>
                                    </Row>



                                    <Row className='styleRowText'>
                                        <Col xs={6} md={3}>
                                            <Form.Label>Create By</Form.Label>
                                            <Form.Control type="text" value={dataModaldt[0]?.createBy} style={{ backgroundColor: '#b9edf3' }} readOnly />
                                        </Col>
                                        <Col xs={6} md={3}>
                                            <Form.Label>Create Date</Form.Label>
                                            <Form.Control type="text" value={dataModaldt[0]?.createDateECR} style={{ backgroundColor: '#b9edf3' }} readOnly />
                                        </Col>
                                        <Col xs={6} md={3}>
                                            <Form.Label>Update By</Form.Label>
                                            <Form.Control type="text" value={dataModaldt[0]?.updateBy} style={{ backgroundColor: '#b9edf3' }} readOnly />
                                        </Col>
                                        <Col xs={6} md={3}>
                                            <Form.Label>Update Date</Form.Label>
                                            <Form.Control type="text" value={dataModaldt[0]?.updateDate} style={{ backgroundColor: '#b9edf3' }} readOnly />
                                        </Col>
                                    </Row>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'PU'} disabled={dataModaldt[0]?.create_ApprovedBit == "F" ? false : true} onChange={handleChangeCollapse('PU')}>
                            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                                <Typography>ส่วนที่ 2 PU</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <Row className='styleRowText'>
                                        <Col xs={12} md={3}></Col>
                                        <Col xs={12} md={6}>
                                            <Form.Label>REQUEST PU :</Form.Label>
                                            <Form.Control as="textarea" style={{ backgroundColor: '#e5e7f3', color: 'red', fontSize: '24px' }} disabled={position == "ISSUED" ? false : true} rows={2} value={dataModaldt[0]?.requestPU} readOnly />
                                        </Col>
                                        <Col xs={12} md={3}></Col>
                                    </Row>

                                    <br></br><br></br>
                                    <h6>2). QUALITY CHECK CONTENT (DCI) and Other</h6>
                                    <Row className='styleRowText'>
                                        <Col xs={12} md={12}>
                                            <Form.Label>2.1 &nbsp;&nbsp; PU Section : Effect Part stock control & Supplier (เฉพาะในกรณี 2 เท่านั้น)</Form.Label>
                                            <Form.Control as="textarea" style={{ backgroundColor: (position == "ISSUED" ? 'rgb(250 249 114)' : 'rgb(228 228 228)') }} disabled={(position == "ISSUED" ? false : true)} rows={10} value={dataModaldt[0]?.pU_Remark}
                                                onChange={(e) => {
                                                    dataModaldt[0].pU_Remark = e.target.value;
                                                    setRemarkPU([...dataModaldt]);
                                                }} />
                                        </Col>
                                    </Row>

                                    <hr></hr>


                                    <h5 style={{ color: 'rgb(50 80 251)' }}>เหตุผลการรับเอกสาร (Receive)</h5>

                                    <Row className='styleRowText'>
                                        <Col xs={12} md={12}>
                                            <Form.Control as="textarea" rows={5} disabled={(position == 'ISSUED' || position == 'CHECK' || position == 'APPROVED') ? true : false} style={{ color: 'rgb(216 96 8)', backgroundColor: (position == "RECEIVED" ? 'rgb(250 249 114)' : 'rgb(228 228 228)') }} value={dataModaldt[0]?.pU_Receive_Remark}
                                                onChange={(e) => {
                                                    dataModaldt[0].pU_Receive_Remark = e.target.value;
                                                    setPU_Receive([...dataModaldt]);
                                                }} />
                                        </Col>
                                    </Row>

                                    <br></br>

                                    <Row style={{ display: 'flex', alignItems: 'center' }} >
                                        <Col xs={12} md={4}>
                                            <FormControl fullWidth disabled={(position == 'ISSUED' || position == 'CHECK' || position == 'APPROVED') ? true : false}>
                                                <InputLabel id="demo-simple-select-label">EmpCode</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={employee}
                                                    label="EmpCode"
                                                    onChange={handleChangeEmployee}>
                                                    {
                                                        employeeArrayPU.map((item, index) =>
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
                                            <FormControl fullWidth disabled={(position == 'ISSUED' || position == 'CHECK' || position == 'APPROVED') ? true : false}>
                                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={step}
                                                    label="Status"
                                                    onChange={handleChangeStep}>
                                                    {
                                                        stepArray.map((item, index) =>
                                                            <MenuItem value={item}>{item}</MenuItem>
                                                        )
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Col>
                                        <Col xs={12} md={2}>
                                            {
                                                permission.filter((item) => {
                                                    return permission[0]?.grpRoleSect == "PU" && permission[0]?.grpRole == 'RECEIVED' && dataModaldt[0]?.pU_IssuedBit != "F"
                                                }).length ? <>
                                                    <Button variant="success" onClick={() => postAddNotifyTo(dataModaldt[0]?.ecR_NO, posit, "PU")}>
                                                        + เพิ่มผู้ดำเนินการ
                                                    </Button>
                                                </> : ""
                                            }
                                        </Col>
                                    </Row>

                                    <br></br>
                                    <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                        <table className='notify'>
                                            <tr>
                                                <td style={{ border: '1px solid black', fontSize: '14px', width: '4pc' }}><center><b>Approved (AGM up)</b></center></td>
                                                <td style={{ border: '1px solid black', fontSize: '14px', width: '4pc' }}><center><b>Checked</b></center></td>
                                                <td style={{ border: '1px solid black', fontSize: '14px', width: '4pc' }}><center><b>Issued</b></center></td>
                                            </tr>
                                            <tr>
                                                <td style={{ border: '1px solid black', color: tableNotify[0]?.pu_approvedBit == "F" ? 'black' : 'gainsboro' }}>
                                                    <center>{tableNotify[0]?.pu_approved}<br></br> {tableNotify[0]?.pu_approvedBit == 'F' ? tableNotify[0]?.pu_approvedDate : ''}</center>
                                                    {
                                                        tableNotify[0]?.pu_approved != null ?
                                                            (typeof permission == 'object' && Object.keys(permission).length && (permission[0]?.grpRoleSect == "PU" && permission[0]?.grpRole == 'RECEIVED' && dataModaldt[0]?.pU_IssuedBit != "F")) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.pu_approvedCode, tableNotify[0]?.pu_approved_step)}>
                                                                ลบ
                                                            </Button>
                                                            : ''
                                                    }
                                                </td>
                                                <td style={{ border: '1px solid black', color: tableNotify[0]?.pu_checkedBit == "F" ? 'black' : 'gainsboro' }}>
                                                    <center>{tableNotify[0]?.pu_checked}<br></br>{tableNotify[0]?.pu_checkedBit == 'F' ? tableNotify[0]?.pu_checkedDate : ''}</center>
                                                    {
                                                        tableNotify[0]?.pu_checked != null ?
                                                            (typeof permission == 'object' && Object.keys(permission).length && (permission[0]?.grpRoleSect == "PU" && permission[0]?.grpRole == 'RECEIVED' && dataModaldt[0]?.pU_IssuedBit != "F")) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.pu_checkedCode, tableNotify[0]?.pu_checked_step)}>
                                                                ลบ
                                                            </Button>
                                                            : ''
                                                    }
                                                </td>
                                                <td style={{ border: '1px solid black', color: tableNotify[0]?.pu_issuedBit == "F" ? 'black' : 'gainsboro' }}>
                                                    <center>{tableNotify[0]?.pu_issued}<br></br> {tableNotify[0]?.pu_issuedBit == 'F' ? tableNotify[0]?.pu_issuedDate : ''}</center>
                                                    {
                                                        tableNotify[0]?.pu_issued != null ?
                                                            (typeof permission == 'object' && Object.keys(permission).length && (permission[0]?.grpRoleSect == "PU" && permission[0]?.grpRole == 'RECEIVED' && dataModaldt[0]?.pU_IssuedBit != "F")) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.pu_issuedCode, tableNotify[0]?.pu_issued_step)}>
                                                                ลบ
                                                            </Button>
                                                            : ''
                                                    }
                                                </td>
                                            </tr>
                                        </table>
                                    </Row>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'DD'} disabled={dataModaldt[0]?.pU_ApprovedBit == "F" ? false : true} onChange={handleChangeCollapse('DD')}>
                            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                                <Typography>ส่วนที่ 3 DD</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <Row className='styleRowText'>
                                        <Col xs={12} md={12}>
                                            <p>หัวข้อการตรวจเช็คคุณภาพ และผล(Quality Check item and Result) :</p>
                                        </Col>
                                        <Col xs={12} md={9}>
                                            <p>2.2  &nbsp;&nbsp; Design Development :<br></br>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  1). ประเมินคุณสมบัติของ Part (Mechanical , Chemical) <br></br>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  2). Dimension  <br></br>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  3). Durabillty , Realibility  <br></br>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  4). BOM System
                                            </p>


                                            {
                                                cbItemSecDD.map((item, index) => {
                                                    var isChecked = dataModaldt[0]?.dD_Remark1.split(',').includes(item?.dict_Code);
                                                    return <div key={item?.dict_Code} style={{ display: 'flex' }} > <input disabled={(position == "ISSUED") ? false : true} defaultChecked={isChecked} type="checkbox" value={item} onChange={(event) => handleCheckBoxSecDD(index, event.target.checked)} />    <div style={{ display: 'none' }}> {item?.dict_Code} </div> <div style={{ marginLeft: '13px' }}>{item?.dict_Desc}</div> <br></br></div>
                                                })
                                            }
                                        </Col>
                                        <Col xs={12} md={3}>
                                            <div style={{ width: '160px', padding: '10px', border: '3px solid gray', margin: '0', fontSize: 'small' }}>
                                                ดำเนินการข้อ 2.1 เฉพาะ <br></br>
                                                ในกรณี ❶ : ข้อ 2  , ข้อ 3 <br></br>
                                                ในกรณี ❷ : ข้อ 1  , ข้อ 2
                                            </div>
                                        </Col>
                                    </Row>


                                    <Row className='styleRowText'>
                                        <Col xs={12} md={12}>
                                            <Form.Control as="textarea" style={{ backgroundColor: (position == "ISSUED" ? 'rgb(250 249 114)' : 'rgb(228 228 228)') }} disabled={(position == "ISSUED" ? false : true)} rows={5} value={dataModaldt[0]?.dD_Remark2}
                                                onChange={(e) => {
                                                    dataModaldt[0].dD_Remark2 = e.target.value;
                                                    setDD_Remark2([...dataModaldt]);
                                                }} />
                                        </Col>
                                    </Row>

                                    <hr></hr>
                                    <Row className='styleRowText'>
                                        <Col xs={12} md={12}>
                                            <h5 style={{ color: 'rgb(50 80 251)' }}>เหตุผลการรับเอกสาร (Receive)</h5>
                                            <Form.Control as="textarea" disabled={(position == 'ISSUED' || position == 'CHECK' || position == 'APPROVED') ? true : false} rows={5} style={{ color: 'rgb(216 96 8)', backgroundColor: (position == "RECEIVED" ? 'rgb(250 249 114)' : 'rgb(228 228 228)') }} value={dataModaldt[0]?.dD_Remark_Receive}
                                                onChange={(e) => {
                                                    dataModaldt[0].dD_Remark_Receive = e.target.value;
                                                    setDD_Receive([...dataModaldt]);
                                                }} />
                                        </Col>
                                    </Row>

                                    <br></br>

                                    <Row style={{ display: 'flex', alignItems: 'center' }} >
                                        <Col xs={12} md={4}>
                                            <FormControl fullWidth disabled={(position == 'ISSUED' || position == 'CHECK' || position == 'APPROVED') ? true : false}>
                                                <InputLabel id="demo-simple-select-label">EmpCode</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={employee}
                                                    label="EmpCode"
                                                    onChange={handleChangeEmployee}>
                                                    {
                                                        employeeArrayDD.map((item, index) =>
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
                                            <FormControl fullWidth disabled={(position == 'ISSUED' || position == 'CHECK' || position == 'APPROVED') ? true : false}>
                                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={step}
                                                    label="Status"
                                                    onChange={handleChangeStep}>
                                                    {
                                                        stepArray.map((item, index) =>
                                                            <MenuItem value={item}>{item}</MenuItem>
                                                        )
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Col>
                                        <Col xs={12} md={2}>
                                            {
                                                permission.filter((item) => {
                                                    return permission[0]?.grpRoleSect == "DD" && permission[0]?.grpRole == 'RECEIVED' && dataModaldt[0]?.dD_ReceiveBit != "F"
                                                }).length ? <>
                                                    <Button variant="success" onClick={() => postAddNotifyTo(dataModaldt[0]?.ecR_NO, posit, "DD")}>
                                                        + เพิ่มผู้ดำเนินการ
                                                    </Button>
                                                </> : ""
                                            }
                                        </Col>
                                    </Row>

                                    <br></br>
                                    <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                        <table className='notify'>
                                            <tr>
                                                <td style={{ border: '1px solid black', fontSize: '14px', width: '4pc' }}><center><b>Approved (AGM up)</b></center></td>
                                                <td style={{ border: '1px solid black', fontSize: '14px', width: '4pc' }}><center><b>Checked</b></center></td>
                                                <td style={{ border: '1px solid black', fontSize: '14px', width: '4pc' }}><center><b>Issued</b></center></td>
                                            </tr>
                                            <tr>
                                                <td style={{ border: '1px solid black', color: tableNotify[0]?.dd_approvedBit == "F" ? 'black' : 'gainsboro' }}>
                                                    <center>{tableNotify[0]?.dd_approved}<br></br> {tableNotify[0]?.dd_approvedBit == 'F' ? tableNotify[0]?.dd_approvedDate : ''}</center>
                                                    {
                                                        tableNotify[0]?.dd_approved != null ?
                                                            (typeof permission == 'object' && Object.keys(permission).length && (permission[0]?.grpRoleSect == "DD" && permission[0]?.grpRole == 'RECEIVED' && dataModaldt[0]?.dD_ReceiveBit != "F")) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.dd_approvedCode, tableNotify[0]?.dd_approved_step)}>
                                                                ลบ
                                                            </Button>
                                                            : ''
                                                    }
                                                </td>
                                                <td style={{ border: '1px solid black', color: tableNotify[0]?.dd_checkedBit == "F" ? 'black' : 'gainsboro' }}>
                                                    <center>{tableNotify[0]?.dd_checked}<br></br>{tableNotify[0]?.dd_checkedBit == 'F' ? tableNotify[0]?.dd_checkedDate : ''}</center>
                                                    {
                                                        tableNotify[0]?.dd_checked != null ?
                                                            (typeof permission == 'object' && Object.keys(permission).length && (permission[0]?.grpRoleSect == "DD" && permission[0]?.grpRole == 'RECEIVED' && dataModaldt[0]?.dD_ReceiveBit != "F")) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.dd_checkedCode, tableNotify[0]?.dd_checked_step)}>
                                                                ลบ
                                                            </Button>
                                                            : ''
                                                    }
                                                </td>
                                                <td style={{ border: '1px solid black', color: tableNotify[0]?.dd_issuedBit == "F" ? 'black' : 'gainsboro' }}>
                                                    <center>{tableNotify[0]?.dd_issued}<br></br> {tableNotify[0]?.dd_issuedBit == 'F' ? tableNotify[0]?.dd_issuedDate : ''}</center>
                                                    {
                                                        tableNotify[0]?.dd_issued != null ?
                                                            (typeof permission == 'object' && Object.keys(permission).length && (permission[0]?.grpRoleSect == "DD" && permission[0]?.grpRole == 'RECEIVED' && dataModaldt[0]?.dD_ReceiveBit != "F")) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.dd_issuedCode, tableNotify[0]?.dd_issued_step)}>
                                                                ลบ
                                                            </Button>
                                                            : ''
                                                    }
                                                </td>
                                            </tr>
                                        </table>
                                    </Row>


                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'EN'} disabled={dataModaldt[0]?.dD_ApprovedBit == "F" ? false : true} onChange={handleChangeCollapse('EN')}>
                            <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                                <Typography>ส่วนที่ 4 EN</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <Row className='styleRowText'>
                                        <Col xs={12} md={12}>
                                            <Form.Label>2.3  Engineer Section : Procesee effect , Tool life  , MQ,PC</Form.Label>
                                            <Form.Control as="textarea" style={{ backgroundColor: (position == "ISSUED" ? 'rgb(250 249 114)' : 'rgb(228 228 228)') }} disabled={(position == "ISSUED" ? false : true)} rows={5} value={dataModaldt[0]?.eN_Remark}
                                                onChange={(e) => {
                                                    dataModaldt[0].eN_Remark = e.target.value;
                                                    setRemarkEN([...dataModaldt]);
                                                }} />
                                        </Col>
                                    </Row>

                                    <hr></hr>

                                    <Row className='styleRowText'>
                                        <Col xs={12} md={12}>
                                            <h5 style={{ color: 'rgb(50 80 251)' }}>เหตุผลการรับเอกสาร (Receive)</h5>
                                            <Form.Control as="textarea" disabled={(position == 'ISSUED' || position == 'CHECK' || position == 'APPROVED') ? true : false} rows={5} style={{ color: 'rgb(216 96 8)', backgroundColor: (position == "RECEIVED" ? 'rgb(250 249 114)' : 'rgb(228 228 228)') }} value={dataModaldt[0]?.eN_Remark_Receive}
                                                onChange={(e) => {
                                                    dataModaldt[0].eN_Remark_Receive = e.target.value;
                                                    setEN_Receive([...dataModaldt]);
                                                }} />
                                        </Col>
                                    </Row>

                                    <br></br>
                                    <Row style={{ display: 'flex', alignItems: 'center' }} >
                                        <Col xs={12} md={4}>
                                            <FormControl fullWidth disabled={(position == 'ISSUED' || position == 'CHECK' || position == 'APPROVED') ? true : false}>
                                                <InputLabel id="demo-simple-select-label">EmpCode</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={employee}
                                                    label="EmpCode"
                                                    onChange={handleChangeEmployee}>
                                                    {
                                                        employeeArrayEN.map((item, index) =>
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
                                            <FormControl fullWidth disabled={(position == 'ISSUED' || position == 'CHECK' || position == 'APPROVED') ? true : false}>
                                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={step}
                                                    label="Status"
                                                    onChange={handleChangeStep}>
                                                    {
                                                        stepArray.map((item, index) =>
                                                            <MenuItem value={item}>{item}</MenuItem>
                                                        )
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Col>
                                        <Col xs={12} md={2}>
                                            {
                                                permission.filter((item) => {
                                                    return permission[0]?.grpRoleSect == "EN" && permission[0]?.grpRole == 'RECEIVED' && dataModaldt[0]?.eN_IssuedBit != "F"
                                                }).length ? <>
                                                    <Button variant="success" onClick={() => postAddNotifyTo(dataModaldt[0]?.ecR_NO, posit, "EN")}>
                                                        + เพิ่มผู้ดำเนินการ
                                                    </Button>
                                                </> : ""
                                            }
                                        </Col>
                                    </Row>

                                    <br></br>
                                    <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                        <table className='notify'>
                                            <tr>
                                                <td style={{ border: '1px solid black', fontSize: '14px', width: '4pc' }}><center><b>Approved (AGM up)</b></center></td>
                                                <td style={{ border: '1px solid black', fontSize: '14px', width: '4pc' }}><center><b>Checked</b></center></td>
                                                <td style={{ border: '1px solid black', fontSize: '14px', width: '4pc' }}><center><b>Issued</b></center></td>
                                            </tr>
                                            <tr>
                                                <td style={{ border: '1px solid black', color: tableNotify[0]?.en_approvedBit == "F" ? 'black' : 'gainsboro' }}>
                                                    <center>{tableNotify[0]?.en_approved}<br></br> {tableNotify[0]?.en_approvedBit == 'F' ? tableNotify[0]?.en_approvedDate : ''}</center>
                                                    {
                                                        tableNotify[0]?.en_approved != null ?
                                                            (typeof permission == 'object' && Object.keys(permission).length && (permission[0]?.grpRoleSect == "EN" && permission[0]?.grpRole == 'RECEIVED' && dataModaldt[0]?.eN_IssuedBit != "F")) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.en_approvedCode, tableNotify[0]?.en_approved_step)}>
                                                                ลบ
                                                            </Button>
                                                            : ''
                                                    }
                                                </td>
                                                <td style={{ border: '1px solid black', color: tableNotify[0]?.en_checkedBit == "F" ? 'black' : 'gainsboro' }}>
                                                    <center>{tableNotify[0]?.en_checked}<br></br>{tableNotify[0]?.en_checkedBit == 'F' ? tableNotify[0]?.en_checkedDate : ''}</center>
                                                    {
                                                        tableNotify[0]?.en_checked != null ?
                                                            (typeof permission == 'object' && Object.keys(permission).length && (permission[0]?.grpRoleSect == "EN" && permission[0]?.grpRole == 'RECEIVED' && dataModaldt[0]?.eN_IssuedBit != "F")) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.en_checkedCode, tableNotify[0]?.en_checked_step)}>
                                                                ลบ
                                                            </Button>
                                                            : ''
                                                    }
                                                </td>
                                                <td style={{ border: '1px solid black', color: tableNotify[0]?.en_issuedBit == "F" ? 'black' : 'gainsboro' }}>
                                                    <center>{tableNotify[0]?.en_issued}<br></br> {tableNotify[0]?.en_issuedBit == 'F' ? tableNotify[0]?.en_issuedDate : ''}</center>
                                                    {
                                                        tableNotify[0]?.en_issued != null ?
                                                            (typeof permission == 'object' && Object.keys(permission).length && (permission[0]?.grpRoleSect == "EN" && permission[0]?.grpRole == 'RECEIVED' && dataModaldt[0]?.eN_IssuedBit != "F")) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.en_issuedCode, tableNotify[0]?.en_issued_step)}>
                                                                ลบ
                                                            </Button>
                                                            : ''
                                                    }
                                                </td>
                                            </tr>
                                        </table>
                                    </Row>

                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'SQC'} disabled={dataModaldt[0]?.eN_ApprovedBit == "F" ? false : true} onChange={handleChangeCollapse('SQC')}>
                            <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                                <Typography>ส่วนที่ 5 SQC</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <Form.Label>2.4 &nbsp;&nbsp; SQC : Quality part (PAS) / Peocess audit :</Form.Label>
                                    <Row className='styleRowText'>
                                        <Col xs={12} md={12}>
                                            <Form.Control as="textarea" rows={5} style={{ backgroundColor: (position == "ISSUED" ? 'rgb(250 249 114)' : 'rgb(228 228 228)') }} disabled={(position == "ISSUED" ? false : true)} value={dataModaldt[0]?.sqC_Remark}
                                                onChange={(e) => {
                                                    dataModaldt[0].sqC_Remark = e.target.value;
                                                    setRemarkSQC([...dataModaldt]);
                                                }} />
                                        </Col>
                                    </Row>

                                    <hr></hr>

                                    <Row className='styleRowText'>
                                        <Col xs={12} md={12}>
                                            <h5 style={{ color: 'rgb(50 80 251)' }}>เหตุผลการรับเอกสาร (Receive)</h5>
                                            <Form.Control as="textarea" rows={5} disabled={(position == 'ISSUED' || position == 'CHECK' || position == 'APPROVED') ? true : false} style={{ color: 'rgb(216 96 8)', backgroundColor: (position == "RECEIVED" ? 'rgb(250 249 114)' : 'rgb(228 228 228)') }} value={dataModaldt[0]?.sqC_Remark_Receive}
                                                onChange={(e) => {
                                                    dataModaldt[0].sqC_Remark_Receive = e.target.value;
                                                    setSQC_Receive([...dataModaldt]);
                                                }} />
                                        </Col>
                                    </Row>

                                    <br></br>
                                    <Row style={{ display: 'flex', alignItems: 'center' }} >
                                        <Col xs={12} md={4}>
                                            <FormControl fullWidth disabled={(position == 'ISSUED' || position == 'CHECK' || position == 'APPROVED') ? true : false}>
                                                <InputLabel id="demo-simple-select-label">EmpCode</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={employee}
                                                    label="EmpCode"
                                                    onChange={handleChangeEmployee}>
                                                    {
                                                        employeeArrayQC.map((item, index) =>
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
                                            <FormControl fullWidth disabled={(position == 'ISSUED' || position == 'CHECK' || position == 'APPROVED') ? true : false}>
                                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={step}
                                                    label="Status"
                                                    onChange={handleChangeStep}>
                                                    {
                                                        stepArray.map((item, index) =>
                                                            <MenuItem value={item}>{item}</MenuItem>
                                                        )
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Col>
                                        <Col xs={12} md={2}>
                                            {
                                                permission.filter((item) => {
                                                    return permission[0]?.grpRoleSect == "SQC" && permission[0]?.grpRole == 'RECEIVED' && dataModaldt[0]?.sqC_IssuedBit != "F"
                                                }).length ? <>
                                                    <Button variant="success" onClick={() => postAddNotifyTo(dataModaldt[0]?.ecR_NO, posit, "SQC")}>
                                                        + เพิ่มผู้ดำเนินการ
                                                    </Button>
                                                </> : ""
                                            }
                                        </Col>
                                    </Row>

                                    <br></br>
                                    <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                        <table className='notify'>
                                            <tr>
                                                <td style={{ border: '1px solid black', fontSize: '14px', width: '4pc' }}><center><b>Approved (AGM up)</b></center></td>
                                                <td style={{ border: '1px solid black', fontSize: '14px', width: '4pc' }}><center><b>Checked</b></center></td>
                                                <td style={{ border: '1px solid black', fontSize: '14px', width: '4pc' }}><center><b>Issued</b></center></td>
                                            </tr>
                                            <tr>
                                                <td style={{ border: '1px solid black', color: tableNotify[0]?.sqc_approvedBit == "F" ? 'black' : 'gainsboro' }}>
                                                    <center>{tableNotify[0]?.sqc_approved}<br></br> {tableNotify[0]?.sqc_approvedBit == 'F' ? tableNotify[0]?.sqc_approvedDate : ''}</center>
                                                    {
                                                        tableNotify[0]?.sqc_approved != null ?
                                                            (typeof permission == 'object' && Object.keys(permission).length && (permission[0]?.grpRoleSect == "SQC" && permission[0]?.grpRole == 'RECEIVED' && dataModaldt[0]?.sqC_IssuedBit != "F")) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.sqc_approvedCode, tableNotify[0]?.sqc_approved_step)}>
                                                                ลบ
                                                            </Button>
                                                            : ''
                                                    }
                                                </td>
                                                <td style={{ border: '1px solid black', color: tableNotify[0]?.sqc_checkedBit == "F" ? 'black' : 'gainsboro' }}>
                                                    <center>{tableNotify[0]?.sqc_checked}<br></br>{tableNotify[0]?.sqc_checkedBit == 'F' ? tableNotify[0]?.sqc_checkedDate : ''}</center>
                                                    {
                                                        tableNotify[0]?.sqc_checked != null ?
                                                            (typeof permission == 'object' && Object.keys(permission).length && (permission[0]?.grpRoleSect == "SQC" && permission[0]?.grpRole == 'RECEIVED' && dataModaldt[0]?.sqC_IssuedBit != "F")) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.sqc_checkedCode, tableNotify[0]?.sqc_checked_step)}>
                                                                ลบ
                                                            </Button>
                                                            : ''
                                                    }
                                                </td>
                                                <td style={{ border: '1px solid black', color: tableNotify[0]?.sqc_issuedBit == "F" ? 'black' : 'gainsboro' }}>
                                                    <center>{tableNotify[0]?.sqc_issued}<br></br> {tableNotify[0]?.sqc_issuedBit == 'F' ? tableNotify[0]?.sqc_issuedDate : ''}</center>
                                                    {
                                                        tableNotify[0]?.sqc_issued != null ?
                                                            (typeof permission == 'object' && Object.keys(permission).length && (permission[0]?.grpRoleSect == "SQC" && permission[0]?.grpRole == 'RECEIVED' && dataModaldt[0]?.sqC_IssuedBit != "F")) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.sqc_issuedCode, tableNotify[0]?.sqc_issued_step)}>
                                                                ลบ
                                                            </Button>
                                                            : ''
                                                    }
                                                </td>
                                            </tr>
                                        </table>
                                    </Row>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'QC'} disabled={dataModaldt[0]?.sqC_ApprovedBit == "F" ? false : true} onChange={handleChangeCollapse('QC')}>
                            <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
                                <Typography>ส่วนที่ 6 QCD</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <Row className='styleRowText'>
                                        <Col xs={12} md={6}>
                                            <Form.Label>2.5 &nbsp;&nbsp; QCD : (total Judgement) :</Form.Label>
                                            <Form.Control as="textarea" rows={10} disabled={(position == "ISSUED" ? false : true)}
                                                type="text" variant="standard" style={{ width: '95%', backgroundColor: (position == "ISSUED" ? 'rgb(250 249 114)' : 'rgb(228 228 228)') }} value={decodeURIComponent(dataModaldt[0]?.qC_Remark1)}
                                                onChange={(event) => {
                                                    dataModaldt[0].qC_Remark1 = event.target.value;
                                                    setRemarkQC1([...dataModaldt])
                                                }} />
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Form.Label><ins>การเตรียมการควบคุมในสายการผลิต</ins></Form.Label>
                                            <div class="col-md-12" style={{ border: '1px solid black', marginLeft: '-11px' }}>
                                                <div class="row">
                                                    <div class="col-md-12" style={{ fontSize: '12px' }}>
                                                        {
                                                            dictQC.slice(0, 6).map((item, index) => {
                                                                var isChecked = dataModaldt[0]?.qC_Remark2.split(',').includes(item?.dict_Code);
                                                                return <div key={item?.dict_Code} style={{ display: 'flex' }} >
                                                                    <input checked={isChecked} type="checkbox" value={item} onChange={(event) => handleCheckBoxQCEdit(item?.dict_Code, event.target.checked, 'checkbox')} disabled={position == "ISSUED" ? false : true} />    <div style={{ display: 'none' }}> {item?.dict_Code} </div> <div style={{ marginLeft: '13px', fontSize: '12px' }}>{item?.dict_Desc}</div> <br></br></div>
                                                            })
                                                        }



                                                        {/* QCD71-QCD72 */}
                                                        <div style={{ display: 'flex' }} >
                                                            {
                                                                <><input checked={dataModaldt[0]?.qC_Remark2.split(',').includes(dictQC[11]?.dict_Code)} onChange={(event) => handleCheckBoxQCEdit(dictQC[11]?.dict_Code, event.target.checked, 'checkbox')} type="checkbox" disabled={position == "ISSUED" ? false : true} /><div style={{ marginLeft: '13px', fontSize: '12px' }}></div>
                                                                    {dictQC[11]?.dict_Desc}
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input onChange={(event) => handleCheckBoxQCEdit(dictQC[6]?.dict_Code, event.target.checked, 'radio')} checked={dataModaldt[0]?.qC_Remark2.split(',').includes(dictQC[6]?.dict_Code)} type="radio" name={'matrerial'} disabled={position == "ISSUED" ? false : true} />
                                                                    {dictQC[6]?.dict_Desc}
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input checked={dataModaldt[0]?.qC_Remark2.split(',').includes(dictQC[9]?.dict_Code)} type="radio" name={'matrerial'} onChange={(event) => handleCheckBoxQCEdit(dictQC[9]?.dict_Code, event.target.checked, 'radio')} disabled={position == "ISSUED" ? false : true} /> {dictQC[9]?.dict_Desc} </>
                                                            }
                                                        </div >
                                                        {/* END QCD71-QCD72 */}

                                                        {/* QCD73-QCD74 */}
                                                        <div key={dictQC[7]?.dict_Code} style={{ display: 'flex' }} >
                                                            {
                                                                <> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Customer :
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input onChange={(event) => handleCheckBoxQCEdit(dictQC[8]?.dict_Code, event.target.checked, 'radio')} checked={dataModaldt[0]?.qC_Remark2.split(',').includes(dictQC[8]?.dict_Code)} type="radio" name={'pallet'} disabled={position == "ISSUED" ? false : true} />
                                                                    {dictQC[8]?.dict_Desc}
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input onChange={(event) => handleCheckBoxQCEdit(dictQC[10]?.dict_Code, event.target.checked, 'radio')} checked={dataModaldt[0]?.qC_Remark2.split(',').includes(dictQC[10]?.dict_Code)} type="radio" name={'pallet'} disabled={position == "ISSUED" ? false : true} /> {dictQC[10]?.dict_Desc}
                                                                </>
                                                            }
                                                        </div >
                                                        {/*END QCD73-QCD74 */}

                                                        {
                                                            dictQC.slice(11).map((item, index) => {
                                                                var isChecked = dataModaldt[0]?.qC_Remark2.split(',').includes(dictQC[7]?.dict_Code);
                                                                return <div key={dictQC[7]?.dict_Code} style={{ display: 'flex' }} > <input checked={isChecked} type="checkbox" value={item} onChange={(event) => handleCheckBoxQCEdit(dictQC[7]?.dict_Code, event.target.checked, 'checkbox')} disabled={position == "ISSUED" ? false : true} />    <div style={{ display: 'none' }}> {dictQC[7]?.dict_Code} </div> <div style={{ marginLeft: '13px', fontSize: '12px' }}>{dictQC[7]?.dict_Desc}</div> <br></br></div>
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                        </Col>
                                    </Row>

                                    <hr></hr>

                                    <Row className='styleRowText'>
                                        <Col xs={12} md={12}>
                                            <h5 style={{ color: 'rgb(50 80 251)' }}>เหตุผลการรับเอกสาร (Receive)</h5>
                                            <Form.Control as="textarea" rows={5} disabled={(position == 'ISSUED' || position == 'CHECK' || position == 'APPROVED') ? true : false} style={{ color: 'rgb(216 96 8)', backgroundColor: (position == "RECEIVED" ? 'rgb(250 249 114)' : 'rgb(228 228 228)') }} value={dataModaldt[0]?.qC_Remark_Receive}
                                                onChange={(e) => {
                                                    dataModaldt[0].qC_Remark_Receive = e.target.value;
                                                    setQC_Receive([...dataModaldt]);
                                                }} />
                                        </Col>
                                    </Row>

                                    <br></br>
                                    <Row style={{ display: 'flex', alignItems: 'center' }} >
                                        <Col xs={12} md={4}>
                                            <FormControl fullWidth disabled={(position == 'ISSUED' || position == 'CHECK' || position == 'APPROVED') ? true : false}>
                                                <InputLabel id="demo-simple-select-label">EmpCode</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={employee}
                                                    label="EmpCode"
                                                    onChange={handleChangeEmployee}>
                                                    {
                                                        employeeArrayQC.map((item, index) =>
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
                                            <FormControl fullWidth disabled={(position == 'ISSUED' || position == 'CHECK' || position == 'APPROVED') ? true : false}>
                                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={step}
                                                    label="Status"
                                                    onChange={handleChangeStep}>
                                                    {
                                                        stepArray.map((item, index) =>
                                                            <MenuItem value={item}>{item}</MenuItem>
                                                        )
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Col>
                                        <Col xs={12} md={2}>
                                            {
                                                permission.filter((item) => {
                                                    return (permission[0]?.grpRoleSect == "QC" || permission[0]?.grpRoleSect == "QA") && permission[0]?.grpRole == 'RECEIVED' && dataModaldt[0]?.qC_IssuedBit != "F"
                                                }).length ? <>
                                                    <Button variant="success" onClick={() => postAddNotifyTo(dataModaldt[0]?.ecR_NO, posit, "QC")}>
                                                        + เพิ่มผู้ดำเนินการ
                                                    </Button>
                                                </> : ""
                                            }
                                        </Col>
                                    </Row>


                                    <br></br>
                                    <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                        <table className='notify'>
                                            <tr>
                                                <td style={{ border: '1px solid black', fontSize: '14px', width: '4pc' }}><center><b>Approved (AGM up)</b></center></td>
                                                <td style={{ border: '1px solid black', fontSize: '14px', width: '4pc' }}><center><b>Checked</b></center></td>
                                                <td style={{ border: '1px solid black', fontSize: '14px', width: '4pc' }}><center><b>Issued</b></center></td>
                                            </tr>
                                            <tr>
                                                <td style={{ border: '1px solid black', color: tableNotify[0]?.qc_approvedBit == "F" ? 'black' : 'gainsboro' }}>
                                                    <center>{tableNotify[0]?.qc_approved}<br></br> {tableNotify[0]?.qc_approvedBit == 'F' ? tableNotify[0]?.qc_approvedDate : ''}</center>
                                                    {
                                                        tableNotify[0]?.qc_approved != null ?
                                                            (typeof permission == 'object' && Object.keys(permission).length && ((permission[0]?.grpRoleSect == "QC" || permission[0]?.grpRoleSect == "QA") && permission[0]?.grpRole == 'RECEIVED' && dataModaldt[0]?.qC_IssuedBit != "F")) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.qc_approvedCode, tableNotify[0]?.qc_approved_step)}>
                                                                ลบ
                                                            </Button>
                                                            : ''
                                                    }
                                                </td>
                                                <td style={{ border: '1px solid black', color: tableNotify[0]?.qc_checkedBit == "F" ? 'black' : 'gainsboro' }}>
                                                    <center>{tableNotify[0]?.qc_checked}<br></br>{tableNotify[0]?.qc_checkedBit == 'F' ? tableNotify[0]?.qc_checkedDate : ''}</center>
                                                    {
                                                        tableNotify[0]?.qc_checked != null ?
                                                            (typeof permission == 'object' && Object.keys(permission).length && ((permission[0]?.grpRoleSect == "QC" || permission[0]?.grpRoleSect == "QA") && permission[0]?.grpRole == 'RECEIVED' && dataModaldt[0]?.qC_IssuedBit != "F")) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.qc_checkedCode, tableNotify[0]?.qc_checked_step)}>
                                                                ลบ
                                                            </Button>
                                                            : ''
                                                    }
                                                </td>
                                                <td style={{ border: '1px solid black', color: tableNotify[0]?.qc_issuedBit == "F" ? 'black' : 'gainsboro' }}>
                                                    <center>{tableNotify[0]?.qc_issued}<br></br> {tableNotify[0]?.qc_issuedBit == 'F' ? tableNotify[0]?.qc_issuedDate : ''}</center>
                                                    {
                                                        tableNotify[0]?.qc_issued != null ?
                                                            (typeof permission == 'object' && Object.keys(permission).length && ((permission[0]?.grpRoleSect == "QC" || permission[0]?.grpRoleSect == "QA") && permission[0]?.grpRole == 'RECEIVED' && dataModaldt[0]?.qC_IssuedBit != "F")) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.qc_issuedCode, tableNotify[0]?.qc_issued_step)}>
                                                                ลบ
                                                            </Button>
                                                            : ''
                                                    }
                                                </td>
                                            </tr>
                                        </table>
                                    </Row>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'DIL'} disabled={dataModaldt[0]?.qC_ApprovedBit == "F" ? false : true} onChange={handleChangeCollapse('DIL')}>
                            <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
                                <Typography>ส่วนที่ 7 DIL</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <Form.Label>3. JUDGEMENT ( DIL Design Section )</Form.Label>
                                    <Row className='styleRowText'>
                                        <Col xs={12} md={12}>
                                            <FormControl>
                                                <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                    name="controlled-radio-buttons-group"
                                                    value={radioDILDD}
                                                    onChange={handleChangeRadioDILDD}
                                                >
                                                    <FormControlLabel value="NEED" control={<Radio />} label="NEED" />
                                                    <FormControlLabel value="NO NEED" control={<Radio />} label="NO NEED" />
                                                </RadioGroup>
                                            </FormControl>


                                            {/* <Form.Control as="textarea" style={{ backgroundColor: 'rgb(250 249 114)' }} rows={2} value={dataModaldt[0]?.diL_DD_REMARK}
                                                onChange={(event) => {
                                                    dataModaldt[0].diL_DD_REMARK = event.target.value;
                                                    setRemarkDILDD([...dataModaldt])
                                                }}
                                            /> */}
                                        </Col>
                                    </Row>

                                    {/* <Row className='styleRowText'>
                                        <Col xs={12} md={4} style={{ display: 'flex' }}>
                                            <b>Issued </b> &nbsp; &nbsp; <Form.Control value={dataModaldt[0]?.diL_DD_IssuedBy} style={{ backgroundColor: 'rgb(250 249 114)' }}
                                                onChange={(event) => {
                                                    dataModaldt[0].diL_DD_IssuedBy = event.target.value;
                                                    setIssuedDILDD([...dataModaldt])
                                                }} />
                                        </Col>
                                        <Col xs={12} md={4} style={{ display: 'flex' }}>
                                            <b>Check </b> &nbsp; &nbsp; <Form.Control value={dataModaldt[0]?.diL_DD_CheckBy} style={{ backgroundColor: 'rgb(250 249 114)' }}
                                                onChange={(event) => {
                                                    dataModaldt[0].diL_DD_CheckBy = event.target.value;
                                                    setCheckDILDD([...dataModaldt])
                                                }} />
                                        </Col>
                                        <Col xs={12} md={4} style={{ display: 'flex' }}>
                                            <b>Approved </b> &nbsp; &nbsp; <Form.Control value={dataModaldt[0]?.diL_DD_ApproveBy} style={{ backgroundColor: 'rgb(250 249 114)' }}
                                                onChange={(event) => {
                                                    dataModaldt[0].diL_DD_ApproveBy = event.target.value;
                                                    setApprovedDILDD([...dataModaldt])
                                                }} />
                                        </Col>
                                    </Row> */}
                                    <hr></hr>
                                    <Form.Label>4. JUDGEMENT ( DIL Quality Control Section ) [Incase necessary]</Form.Label>
                                    <Row className='styleRowText'>
                                        <Col xs={12} md={12}>
                                            <FormControl>
                                                <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                    name="controlled-radio-buttons-group"
                                                    value={radioDILQC}
                                                    onChange={handleChangeRadioDILQC}
                                                >
                                                    <FormControlLabel value="NEED" control={<Radio />} label="NEED" />
                                                    <FormControlLabel value="NO NEED" control={<Radio />} label="NO NEED" />
                                                </RadioGroup>
                                            </FormControl>



                                            {/* <Form.Control as="textarea" rows={2} style={{ backgroundColor: 'rgb(250 249 114)' }} value={dataModaldt[0]?.diL_QC_REMARK}
                                                onChange={(event) => {
                                                    dataModaldt[0].diL_QC_REMARK = event.target.value;
                                                    setRemarkDILQC([...dataModaldt])
                                                }} /> */}
                                        </Col>
                                    </Row>

                                    {/* <Row className='styleRowText'>
                                        <Col xs={12} md={4} style={{ display: 'flex' }}>
                                            <b>Issued </b> &nbsp; &nbsp; <Form.Control value={dataModaldt[0]?.diL_QC_IssuedBy} style={{ backgroundColor: 'rgb(250 249 114)' }}
                                                onChange={(event) => {
                                                    dataModaldt[0].diL_QC_IssuedBy = event.target.value;
                                                    setIssuedDILQC([...dataModaldt])
                                                }} />
                                        </Col>
                                        <Col xs={12} md={4} style={{ display: 'flex' }}>
                                            <b>Check </b> &nbsp; &nbsp; <Form.Control value={dataModaldt[0]?.diL_QC_CheckBy} style={{ backgroundColor: 'rgb(250 249 114)' }}
                                                onChange={(event) => {
                                                    dataModaldt[0].diL_QC_CheckBy = event.target.value;
                                                    setCheckDILQC([...dataModaldt])
                                                }} />
                                        </Col>
                                        <Col xs={12} md={4} style={{ display: 'flex' }}>
                                            <b>Approved </b> &nbsp; &nbsp; <Form.Control value={dataModaldt[0]?.diL_QC_ApproveBy} style={{ backgroundColor: 'rgb(250 249 114)' }}
                                                onChange={(event) => {
                                                    dataModaldt[0].diL_QC_ApproveBy = event.target.value;
                                                    setApprovedDILQC([...dataModaldt])
                                                }} />
                                        </Col>
                                    </Row> */}

                                    <hr></hr>

                                    {/* <Row className='styleRowText'>
                                        <Col xs={12} md={12}>
                                            <h5 style={{ color: 'rgb(50 80 251)' }}>เหตุผลการรับเอกสาร (Receive)</h5>
                                            <Form.Control as="textarea" rows={5} disabled={(position == 'CHECK' || position == 'APPROVED') ? true : false} style={{ color: '#db7428', backgroundColor: 'rgb(250 249 114)' }} value={dataModaldt[0]?.diL_Remark_Receive}
                                                onChange={(e) => {
                                                    dataModaldt[0].diL_Remark_Receive = e.target.value;
                                                    setDIL_Receive([...dataModaldt]);
                                                }} />
                                        </Col>
                                    </Row> */}

                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'QA'} disabled={dataModaldt[0]?.diL_RECEIVEBIT == "F" ? false : true} onChange={handleChangeCollapse('QA')}>
                            <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
                                <Typography>ส่วนที่ 8 QA</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <p>5.CUSTOMER INFORMATION</p>
                                    <Row className='styleRowText'>
                                        <Col xs={12} md={12}>
                                            <div style={{ display: 'flex' }}>
                                                <span><b>1.การแจ้งลูกค้าข้อมูลการเปลี่ยนแปลง (QA/LG)</b></span>
                                                {
                                                    cbChchanges.map((item, index) => {
                                                        var isChecked = dataModaldt[0]?.chChangesQA.split(',').includes(item?.dict_Code);
                                                        return <div key={item?.dict_Code} style={{ display: 'flex', marginLeft: '2pc' }} > <input defaultChecked={isChecked} type="checkbox" value={item} onChange={(event) => handleChChangesCus(index, event.target.checked)} disabled={position == "ISSUED" ? false : true} />    <div style={{ display: 'none' }}> {item?.dict_Code} </div> <div style={{ marginLeft: '13px' }}>{item?.dict_Desc}</div> <br></br></div>
                                                    })
                                                }
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className='styleRowText'>
                                        <Col xs={12} md={2}>
                                            <p><ins>ชื่อลูกค้าที่แจ้ง :</ins></p>
                                        </Col>
                                        <Col xs={12} md={10}>
                                            <div className='styleCustomer'>
                                                {
                                                    cbCustomer.map((item, index) => {
                                                        var isChecked = dataModaldt[0]?.customerForQA.split(',').includes(item?.dict_Code);
                                                        return <div key={item?.dict_Code} style={{ display: 'flex', marginLeft: '0.5pc' }} > <input defaultChecked={isChecked} type="checkbox" value={item} onChange={(event) => handleCustomer(index, event.target.checked)} disabled={position == "ISSUED" ? false : true} />    <div style={{ display: 'none' }}> {item?.dict_Code} </div> <div style={{ marginLeft: '9px' }}>{item?.dict_Desc}</div> <br></br></div>
                                                    })
                                                }
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={12} md={12}>
                                            <TextField id="txtOtherDD" label="Other...." variant="standard" style={{ width: '95%' }} value={decodeURIComponent(dataModaldt[0]?.qA_OtherCustomer)} disabled={position == "ISSUED" ? false : true}
                                                onChange={(event) => {
                                                    dataModaldt[0].qA_OtherCustomer = event.target.value;
                                                    setOtherCus([...dataModaldt])
                                                }} />
                                        </Col>
                                    </Row>



                                    <br></br>
                                    <Row>
                                        <Col xs={12} md={3}>
                                            <p>วันที่แจ้ง</p>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    value={dayjs(dataModaldt[0]?.qA_InformationDate == "" ? moment() : moment(dataModaldt[0]?.qA_InformationDate).format('YYYY-MM-DD'))}
                                                    slotProps={{
                                                        textField: {
                                                            format: 'YYYY-MM-DD',
                                                        },
                                                    }}
                                                    onChange={(val) => {
                                                        dataModaldt[0].qA_InformationDate = val.format('YYYY-MM-DD');
                                                        setDataModaldt([...dataModaldt])
                                                    }}

                                                    disabled={position == "ISSUED" ? false : true}
                                                />
                                            </LocalizationProvider>
                                        </Col>
                                        <Col xs={12} md={9}>
                                            <p>Information by:</p>
                                            <Form.Control as="textarea" rows={2} id="txtOtherModel" label="Other..." variant="standard" style={{ width: '95%', height: '3.5pc', backgroundColor: 'rgb(250 249 114)' }} value={decodeURIComponent(dataModaldt[0]?.qA_InformatonBy)} disabled={position == "ISSUED" ? false : true}
                                                onChange={(event) => {
                                                    dataModaldt[0].qA_InformatonBy = event.target.value;
                                                    setInformationBy([...dataModaldt])
                                                }} />
                                        </Col>
                                    </Row>

                                    <br></br>
                                    <hr></hr>
                                    <p><ins>Set Meeting :</ins> กรณี ❶ : PU &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; กรณี ❷ : DD</p>
                                    <Row>
                                        <Col xs={12} md={2}>
                                            <span><ins>DISTRIBUTION</ins></span>
                                        </Col>
                                        <Col xs={12} md={10}>
                                            <div className='Distribution'>
                                                {
                                                    cbDistribution.map((item, index) => {
                                                        var isChecked = dataModaldt[0]?.distribution.split(',').includes(item?.dict_Code);
                                                        return <div key={item?.dict_Code} style={{ display: 'flex', marginLeft: '2pc' }} > <input defaultChecked={isChecked} type="checkbox" value={item} onChange={(event) => handleDistribution(index, event.target.checked)} disabled={position == "ISSUED" ? false : true} />    <div style={{ display: 'none' }}> {item?.dict_Code} </div> <div style={{ marginLeft: '13px' }}>{item?.dict_Desc}</div> <br></br></div>
                                                    })
                                                }
                                            </div>
                                        </Col>
                                    </Row>

                                    <hr></hr>

                                    <Row className='styleRowText'>
                                        <Col xs={12} md={12}>
                                            <h5 style={{ color: 'rgb(50 80 251)' }}>เหตุผลการรับเอกสาร (Receive)</h5>
                                            <Form.Control as="textarea" rows={5} disabled={(position == 'ISSUED' || position == 'CHECK' || position == 'APPROVED') ? true : false} style={{ color: '#db7428', backgroundColor: 'rgb(250 249 114)' }} value={dataModaldt[0]?.qA_Remark_Receive}
                                                onChange={(e) => {
                                                    dataModaldt[0].qA_Remark_Receive = e.target.value;
                                                    setQA_Receive([...dataModaldt]);
                                                }} />
                                        </Col>
                                    </Row>

                                    <br></br>
                                    <Row style={{ display: 'flex', alignItems: 'center' }} >
                                        <Col xs={12} md={4}>
                                            <FormControl fullWidth disabled={(position == 'ISSUED' || position == 'CHECK' || position == 'APPROVED') ? true : false}>
                                                <InputLabel id="demo-simple-select-label">EmpCode</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={employee}
                                                    label="EmpCode"
                                                    onChange={handleChangeEmployee}>
                                                    {
                                                        employeeArrayQC.map((item, index) =>
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
                                            <FormControl fullWidth disabled={(position == 'ISSUED' || position == 'CHECK' || position == 'APPROVED') ? true : false}>
                                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={step}
                                                    label="Status"
                                                    onChange={handleChangeStep}>
                                                    {
                                                        stepArray.map((item, index) =>
                                                            <MenuItem value={item}>{item}</MenuItem>
                                                        )
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Col>

                                        <Col xs={12} md={2}>
                                            {
                                                permission.filter((item) => {
                                                    return permission[0]?.grpRoleSect == "QA" && permission[0]?.grpRole == 'RECEIVED' && dataModaldt[0]?.qA_IssuedBit != "F"
                                                }).length ? <>
                                                    <Button variant="success" onClick={() => postAddNotifyTo(dataModaldt[0]?.ecR_NO, posit, "QA")}>
                                                        + เพิ่มผู้ดำเนินการ
                                                    </Button>
                                                </> : ""
                                            }
                                        </Col>
                                    </Row>

                                    <br></br>
                                    <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                        <table className='notify'>
                                            <tr>
                                                <td style={{ border: '1px solid black', fontSize: '14px', width: '4pc' }}><center><b>Approved (AGM up)</b></center></td>
                                                <td style={{ border: '1px solid black', fontSize: '14x', width: '4pc' }}><center><b>Checked</b></center></td>
                                                <td style={{ border: '1px solid black', fontSize: '14px', width: '4pc' }}><center><b>Issued</b></center></td>
                                            </tr>
                                            <tr>
                                                <td style={{ border: '1px solid black', color: tableNotify[0]?.qa_approvedBit == "F" ? 'black' : 'gainsboro' }}>
                                                    <center>{tableNotify[0]?.qa_approved}<br></br> {tableNotify[0]?.qa_approvedBit == 'F' ? tableNotify[0]?.qa_approvedDate : ''}</center>
                                                    {
                                                        tableNotify[0]?.qa_approved != null ?
                                                            (typeof permission == 'object' && Object.keys(permission).length && (permission[0]?.grpRoleSect == "QA" && permission[0]?.grpRole == 'RECEIVED' && dataModaldt[0]?.qA_IssuedBit != "F")) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.qa_approvedCode, tableNotify[0]?.qa_approved_step)}>
                                                                ลบ
                                                            </Button>
                                                            : ''
                                                    }
                                                </td>
                                                <td style={{ border: '1px solid black', color: tableNotify[0]?.qa_checkedBit == "F" ? 'black' : 'gainsboro' }}>
                                                    <center>{tableNotify[0]?.qa_checked}<br></br>{tableNotify[0]?.qa_checkedBit == 'F' ? tableNotify[0]?.qa_checkedDate : ''}</center>
                                                    {
                                                        tableNotify[0]?.qa_checked != null ?
                                                            (typeof permission == 'object' && Object.keys(permission).length && (permission[0]?.grpRoleSect == "QA" && permission[0]?.grpRole == 'RECEIVED' && dataModaldt[0]?.qA_IssuedBit != "F")) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.qa_checkedCode, tableNotify[0]?.qa_checked_step)}>
                                                                ลบ
                                                            </Button>
                                                            : ''
                                                    }
                                                </td>
                                                <td style={{ border: '1px solid black', color: tableNotify[0]?.qa_issuedBit == "F" ? 'black' : 'gainsboro' }}>
                                                    <center>{tableNotify[0]?.qa_issued}<br></br> {tableNotify[0]?.qa_issuedBit == 'F' ? tableNotify[0]?.qa_issuedDate : ''}</center>
                                                    {
                                                        tableNotify[0]?.qa_issued != null ?
                                                            (typeof permission == 'object' && Object.keys(permission).length && (permission[0]?.grpRoleSect == "QA" && permission[0]?.grpRole == 'RECEIVED' && dataModaldt[0]?.qA_IssuedBit != "F")) && <Button variant="danger" style={{ fontSize: '11px', padding: '0px 9px' }} onClick={() => getDeleteNotify(dataModaldt[0]?.ecR_NO, tableNotify[0]?.qa_issuedCode, tableNotify[0]?.qa_issued_step)}>
                                                                ลบ
                                                            </Button>
                                                            : ''
                                                    }
                                                </td>
                                            </tr>
                                        </table>
                                    </Row>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>



                        <hr></hr>
                        <Row className='styleRowText'>
                            <Col xs={12} md={10}>
                                <p style={{ fontSize: '20px', fontWeight: '600', color: 'red' }}>เหตุผลการตีกลับ (Return)</p>
                                <Form.Control as="textarea" id='txtCancel' style={{ color: 'red' }} rows={5}
                                    onChange={(event) => setRemarkCancel(event.target.value)} />
                            </Col>
                            <Col xs={12} md={2} style={{ marginTop: '6%' }}>
                            </Col>
                        </Row>
                    </DialogContent>
                    <DialogActions>
                    </DialogActions>
                    <div className='styleButton'>
                        <Stack direction={'row'} gap={3}>
                            <Button variant="secondary" onClick={() => close(false)}>
                                Close
                            </Button>
                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0004" && item.rolE_VIEW == "True" && creSec == roleSec
                                }).length ? <Button variant="info" onClick={() => {
                                    var idECR = dataModaldt[0]?.ecR_NO;
                                    var title = dataModaldt[0].title;
                                    var section = 'Create';
                                    setEcrnoSelected({
                                        ecrno: idECR, title: title, section: section
                                    })
                                    setOpenAttrFile(true);
                                }}> Add File</Button>
                                    :
                                    ""
                            }
                        </Stack>
                        <Stack direction={'row'} gap={3}>
                            {/* **********************************  BUTTON SECTION CREATE **************************************/}
                            {/* --------******* ISSUED********------- */}
                            {
                                permission.filter((item) => {
                                    return (item.menuCode == "BTN0005" && item.rolE_VIEW == "True" && creSec == roleSec && dataModaldt[0]?.createBy == item.code || item.grpRole == "ADMIN") ||
                                        (item.menuCode == "BTN0005" && item.rolE_VIEW == "True" && permission[0]?.grpRoleSect == "ADMIN" && dataModaldt[0]?.createBy == item.code)
                                }).length ? (dataModaldt[0]?.create_CheckBit == "U" || dataModaldt[0]?.create_CheckBit == "R") && <>
                                    <Button variant="danger" onClick={() => getDeleteDoc(dataModaldt[0]?.ecR_NO)}>
                                        ลบเอกสาร (Delete)
                                    </Button>
                                </> : ""
                            }

                            {
                                permission.filter((item) => {
                                    return (item.menuCode == "BTN0005" && item.rolE_VIEW == "True" && creSec == roleSec && (dataModaldt[0]?.createBy == item.code || item.grpRole == "ADMIN")) ||
                                        (item.menuCode == "BTN0005" && item.rolE_VIEW == "True" && permission[0]?.grpRoleSect == "ADMIN" && (dataModaldt[0]?.createBy == item.code || item.grpRole == "ADMIN"))
                                }).length ? (dataModaldt[0]?.create_CheckBit == "U" || dataModaldt[0]?.create_CheckBit == "R") && <><Button autoFocus variant="primary" onClick={() => upDateData(dataModaldt[0].ecR_NO)}>
                                    แก้ไขเอกสาร (Update)
                                </Button></>
                                    :
                                    ""
                            }
                            {/* --------*******END ISSUED********------- */}


                            {/* --------******* CHECK********------- */}
                            {
                                permission.filter((item) => {
                                    // return (item.menuCode == "BTN0057" && item.rolE_VIEW == "True" && (creSec == roleSec || item.grpRole == "ADMIN")) ||
                                    //     (item.menuCode == "BTN0057" && item.rolE_VIEW == "True" && (creSec != roleSec || item.grpRole == "ADMIN"))
                                    return (item.menuCode == "BTN0057" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.crE_CheckCode)
                                }).length ?// (
                                    // (dataModaldt[0]?.pU_IssuedBit == "F" && dataModaldt[0]?.create_ApproveBit != "F" && dataModaldt[0]?.create_CheckBit == "U") ||
                                    // (dataModaldt[0]?.pU_IssuedBit == "F" && dataModaldt[0]?.pU_ApprovedBit != "F") || permission.grpRole == 'ADMIN'
                                    //  permission.grpRole == 'ADMIN'
                                    // )
                                    //  &&
                                    <>
                                        <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO)}>
                                            ตีกลับ (Return) CREATE
                                        </Button>
                                    </> : ""
                            }



                            {
                                permission.filter((item) => {
                                    // return (item.menuCode == "BTN0057" && item.rolE_VIEW == "True" && (creSec == roleSec || item.grpRole == "ADMIN")) ||
                                    //     (item.menuCode == "BTN0057" && item.rolE_VIEW == "True" && (creSec == roleSec || item.grpRole == "ADMIN"))
                                    return (item.menuCode == "BTN0057" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.crE_CheckCode)
                                }).length ? //(
                                    //     (dataModaldt[0]?.pU_IssuedBit == "F" && dataModaldt[0]?.create_ApproveBit != "F" && dataModaldt[0]?.create_CheckBit == "U") ||
                                    //     dataModaldt[0]?.pU_IssuedBit == "F" && dataModaldt[0]?.pU_ApprovedBit != "F"
                                    // )
                                    // &&
                                    <Button autoFocus variant="success" onClick={() => getCheck(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                        อนุมัติ (MG Approved) CREATE
                                    </Button>
                                    :
                                    ""
                            }
                            {/* --------******* END CHECK********------- */}



                            {/* --------******* APPROVED ********------- */}
                            {
                                permission.filter((item) => {

                                    // return (item.menuCode == "BTN0058" && item.rolE_VIEW == "True" && (creSec == roleSec || item.grpRole == "ADMIN") && dataModaldt[0]?.create_ApprovedBit != "F") ||
                                    //     (item.menuCode == "BTN0058" && item.rolE_VIEW == "True" && (creSec == roleSec || item.grpRole == "ADMIN") && dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0]?.pU_CheckBit == "F") ||
                                    //     (item.menuCode == "BTN0058" && item.rolE_VIEW == "True" && creSec != roleSec && dataModaldt[0]?.create_ApprovedBit == "F")
                                    return item.menuCode == "BTN0058" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.crE_ApprovedCode
                                }).length ? //(
                                    //     dataModaldt[0]?.create_CheckBit == 'F' && (dataModaldt[0]?.pU_ReceiveBit != "F" || dataModaldt[0]?.dD_ReceiveBit != "F")
                                    // )
                                    // &&
                                    <>
                                        <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_ApprovedBit)}>
                                            ตีกลับ (Return) CREATE
                                        </Button>
                                    </> : ""
                            }

                            {
                                permission.filter((item) => {
                                    // return (item.menuCode == "BTN0058" && item.rolE_VIEW == "True" && (creSec == roleSec || item.grpRole == "ADMIN") && dataModaldt[0]?.create_ApprovedBit != "F") ||
                                    //     (item.menuCode == "BTN0058" && item.rolE_VIEW == "True" && (creSec == roleSec || item.grpRole == "ADMIN") && dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0]?.pU_CheckBit == "F") ||
                                    //     (item.menuCode == "BTN0058" && item.rolE_VIEW == "True" && creSec != roleSec && dataModaldt[0]?.create_ApprovedBit == "F")
                                    return item.menuCode == "BTN0058" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.crE_ApprovedCode
                                }).length ? //(
                                    //     dataModaldt[0]?.create_CheckBit == 'F' && (dataModaldt[0]?.pU_ReceiveBit != "F" || dataModaldt[0]?.dD_ReceiveBit != "F")
                                    // )
                                    // && 
                                    <Button autoFocus variant="success" onClick={() => getApproved(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_ApprovedBit)}>
                                        อนุมัติ (GM Approved) CREATE
                                    </Button>
                                    :
                                    ""
                            }
                            {/* --------*******END APPROVED ********------- */}
                            {/* **************************** END BUTTON SECTION CREATE ************************** */}



                            {/* **********************************  BUTTON SECTION PU **************************************/}
                            {/* --------*******RECEIVE********------- */}
                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0007" && item.rolE_VIEW == "True"
                                }).length ? (
                                    dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0]?.pU_IssuedBit != "F"
                                )
                                &&
                                <>
                                    <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                        ตีกลับ (Return)  PU
                                    </Button>
                                </> : ""
                            }


                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0011" && item.rolE_VIEW == "True"
                                }).length ? (
                                    dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0]?.pU_IssuedBit != "F"
                                )
                                && <Button autoFocus variant="success" onClick={() => getReceive(dataModaldt[0].ecR_NO)}>
                                    รับเอกสาร (Receive)  PU
                                </Button>
                                    :
                                    ""
                            }
                            {/* --------*******END RECEIVE********------- */}


                            {/* --------*******ISSUED********------- */}
                            {
                                permission.filter((item) => {
                                    return (item.menuCode == "BTN0008" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.pU_IssuedCode)
                                }).length ? (
                                    // (dataModaldt[0]?.pU_IssuedBit != "F" && dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0]?.pU_ReceiveBit == "F" && (dataModaldt[0]?.pU_CheckBit == "U" || dataModaldt[0]?.pU_CheckBit == "R")) ||
                                    // (dataModaldt[0]?.pU_IssuedBit != "F" && dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0]?.pU_ReceiveBit == "F" && dataModaldt[0]?.pU_CheckBit != "F")

                                    (dataModaldt[0]?.pU_ReceiveBit == "F" && dataModaldt[0]?.pU_CheckBit != "F")
                                    // ||
                                    // (dataModaldt[0]?.pU_ReceiveBit != "R" && dataModaldt[0]?.pU_IssuedBit != "F" && dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0]?.pU_ReceiveBit == "F" && dataModaldt[0]?.pU_CheckBit != "F")
                                )
                                &&
                                <>
                                    <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                        ตีกลับ (Return) PU
                                    </Button>
                                </> : ""
                            }

                            {
                                permission.filter((item) => {
                                    return (item.menuCode == "BTN0012" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.pU_IssuedCode)
                                }).length ? (
                                    // (dataModaldt[0]?.pU_IssuedBit != "F" && dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0]?.pU_ReceiveBit == "F" && (dataModaldt[0]?.pU_CheckBit == "U" || dataModaldt[0]?.pU_CheckBit == "R")) ||
                                    // (dataModaldt[0]?.pU_IssuedBit != "F" && dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0]?.pU_ReceiveBit == "F" && dataModaldt[0]?.pU_CheckBit != "F")
                                    (dataModaldt[0]?.pU_ReceiveBit == "F" && dataModaldt[0]?.pU_CheckBit != "F")
                                )
                                && <>
                                    <Button autoFocus variant="success" onClick={() => getIssued(dataModaldt[0].ecR_NO)}>
                                        ออกเอกสาร (Issued) PU
                                    </Button>
                                </>
                                    :
                                    ""
                            }
                            {/* --------*******END ISSUED********------- */}

                            {/* --------******* CHECK********------- */}
                            {
                                permission.filter((item) => {
                                    return (item.menuCode == "BTN0009" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.crE_CheckCode) ||
                                        (item.menuCode == "BTN0009" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.pU_CheckCode)
                                }).length ? (
                                    // (dataModaldt[0]?.create_ApproveBit != "F" && dataModaldt[0]?.create_CheckBit == "U") ||
                                    // (dataModaldt[0]?.pU_IssuedBit == "F" && dataModaldt[0]?.pU_ApprovedBit != "F") ||
                                    // dataModaldt[0]?.create_ApproveBit != "F"
                                    (dataModaldt[0]?.create_ApprovedBit != "F" && dataModaldt[0]?.createBy != "") ||
                                    (dataModaldt[0]?.pU_IssuedBit == "F" && dataModaldt[0]?.pU_ApprovedBit != "F")
                                )
                                &&
                                <>
                                    <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO)}>
                                        ตีกลับ (Return) PU
                                    </Button>
                                </> : ""
                            }


                            {
                                permission.filter((item) => {
                                    // return (item.menuCode == "BTN0013" && item.rolE_VIEW == "True" && creSec == roleSec && dataModaldt[0]?.create_ApprovedBit == "F")
                                    return (item.menuCode == "BTN0013" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.crE_CheckCode) ||
                                        (item.menuCode == "BTN0013" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.pU_CheckCode)
                                }).length ? (
                                    (dataModaldt[0]?.create_ApprovedBit != "F" && dataModaldt[0]?.createBy != "") ||
                                    (dataModaldt[0]?.pU_IssuedBit == "F" && dataModaldt[0]?.pU_ApprovedBit != "F")
                                )
                                &&
                                <Button autoFocus variant="success" onClick={() => getCheck(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                    อนุมัติ (MG Approved) PU
                                </Button>
                                    :
                                    ""
                            }
                            {/* --------******* END CHECK********------- */}



                            {/* --------******* APPROVED ********------- */}
                            {
                                permission.filter((item) => {
                                    // return (item.menuCode == "BTN0010" && item.rolE_VIEW == "True" && creSec == roleSec && dataModaldt[0]?.create_ApprovedBit != "F") ||
                                    //     (item.menuCode == "BTN0010" && item.rolE_VIEW == "True" && creSec == roleSec && dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0]?.pU_CheckBit == "F") ||
                                    //     (item.menuCode == "BTN0010" && item.rolE_VIEW == "True" && creSec != roleSec && dataModaldt[0]?.create_ApprovedBit == "F")
                                    return (item.menuCode == "BTN0010" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.crE_ApprovedCode) ||
                                        (item.menuCode == "BTN0010" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.pU_ApprovedCode)
                                }).length ? (
                                    // dataModaldt[0]?.create_CheckBit == 'F' && (dataModaldt[0]?.pU_ReceiveBit != "F" ||
                                    //     dataModaldt[0]?.dD_ReceiveBit != "F")
                                    (dataModaldt[0]?.pU_CheckBit == "F" && dataModaldt[0]?.dD_ReceiveBit != "F")
                                )
                                &&
                                <>
                                    <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_ApprovedBit)}>
                                        ตีกลับ (Return)  PU
                                    </Button>
                                </> : ""
                            }


                            {
                                permission.filter((item) => {
                                    // return (item.menuCode == "BTN0014" && item.rolE_VIEW == "True" && creSec == roleSec && dataModaldt[0]?.create_ApprovedBit != "F") ||
                                    //     (item.menuCode == "BTN0014" && item.rolE_VIEW == "True" && creSec == roleSec && dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0]?.pU_CheckBit == "F") ||
                                    //     (item.menuCode == "BTN0014" && item.rolE_VIEW == "True" && creSec != roleSec && dataModaldt[0]?.create_ApprovedBit == "F")
                                    return (item.menuCode == "BTN0014" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.crE_ApprovedCode) ||
                                        (item.menuCode == "BTN0014" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.pU_ApprovedCode)
                                }).length ? (
                                    // dataModaldt[0]?.create_CheckBit == 'F' && (dataModaldt[0]?.pU_ReceiveBit != "F" || dataModaldt[0]?.dD_ReceiveBit != "F") ||
                                    (dataModaldt[0]?.pU_CheckBit == "F" && dataModaldt[0]?.dD_ReceiveBit != "F")
                                )
                                && <Button autoFocus variant="success" onClick={() => getApproved(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_ApprovedBit)}>
                                    อนุมัติ (GM Approved) PU
                                </Button>
                                    :
                                    ""
                            }
                            {/* --------*******END APPROVED ********------- */}
                            {/* **************************** END BUTTON SECTION PU ************************** */}


                            {/* **************************** BUTTON SECTION DD **************************/}
                            {/* RECEIVE  */}
                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0015" && item.rolE_VIEW == "True"
                                    // return (item.menuCode == "BTN0015" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.pU_ApprovedCode)
                                }).length ? (
                                    (dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0]?.dD_IssuedBit != "F" && dataModaldt[0]?.dD_ReceiveBit != "F") ||
                                    (dataModaldt[0]?.pU_ApprovedBit == "F" && dataModaldt[0]?.dD_IssuedBit != "F")
                                )
                                &&
                                <>
                                    <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                        ตีกลับ (Return) DD
                                    </Button>
                                </> : ""
                            }


                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0019" && item.rolE_VIEW == "True"
                                }).length ? (
                                    (dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0]?.dD_IssuedBit != "F" && dataModaldt[0]?.dD_ReceiveBit != "F") ||
                                    (dataModaldt[0]?.pU_ApprovedBit == "F" && dataModaldt[0]?.dD_IssuedBit != "F")
                                )
                                && <Button autoFocus variant="success" onClick={() => getReceive(dataModaldt[0].ecR_NO)}>
                                    รับเอกสาร (Receive) DD
                                </Button>
                                    :
                                    ""
                            }
                            {/* END RECEIVE  */}



                            {/*  ISSUED  */}

                            {
                                permission.filter((item) => {
                                    // return item.menuCode == "BTN0016" && item.rolE_VIEW == "True"
                                    return (item.menuCode == "BTN0016" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.dD_IssuedCode)
                                }).length ? (
                                    // (dataModaldt[0]?.dD_ReceiveBit != "R" && dataModaldt[0]?.dD_IssuedBit != "F" && dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0]?.dD_ReceiveBit == "F" && (dataModaldt[0]?.dD_CheckBit == "U" || dataModaldt[0]?.dD_CheckBit == "R")) ||
                                    // (dataModaldt[0]?.dD_ReceiveBit != "R" && dataModaldt[0]?.dD_IssuedBit != "F" && dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0]?.dD_ReceiveBit == "F" && dataModaldt[0]?.dD_CheckBit != "F")

                                    // (dataModaldt[0]?.dD_ReceiveBit != "R" && dataModaldt[0]?.dD_IssuedBit != "F" && dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0]?.dD_ReceiveBit == "F" && (dataModaldt[0]?.dD_CheckBit == "U" || dataModaldt[0]?.dD_CheckBit == "R")) ||
                                    // (dataModaldt[0]?.dD_ReceiveBit != "R" && dataModaldt[0]?.dD_IssuedBit != "F" && dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0]?.dD_ReceiveBit == "F" && dataModaldt[0]?.dD_CheckBit != "F")

                                    (dataModaldt[0]?.dD_ReceiveBit == "F" && dataModaldt[0]?.dD_CheckBit != "F") ||
                                    dataModaldt[0]?.create_CheckBit != "F"
                                )
                                &&
                                <>
                                    <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                        ตีกลับ (Return) DD
                                    </Button>
                                </> : ""
                            }

                            {
                                permission.filter((item) => {
                                    // return item.menuCode == "BTN0020" && item.rolE_VIEW == "True"
                                    return (item.menuCode == "BTN0020" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.dD_IssuedCode)
                                }).length ? (
                                    // (dataModaldt[0]?.dD_ReceiveBit != "R" && dataModaldt[0]?.dD_IssuedBit != "F" && dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0]?.dD_ReceiveBit == "F" && (dataModaldt[0]?.dD_CheckBit == "U" || dataModaldt[0]?.dD_CheckBit == "R")) ||
                                    // (dataModaldt[0]?.dD_ReceiveBit != "R" && dataModaldt[0]?.dD_IssuedBit != "F" && dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0]?.dD_ReceiveBit == "F" && dataModaldt[0]?.dD_CheckBit != "F")

                                    (dataModaldt[0]?.dD_ReceiveBit == "F" && dataModaldt[0]?.dD_CheckBit != "F") ||
                                    dataModaldt[0]?.create_CheckBit != "F"
                                )
                                && <>
                                    <Button autoFocus variant="success" onClick={() => getIssued(dataModaldt[0].ecR_NO)}>
                                        ออกเอกสาร (Issued) DD
                                    </Button>
                                </>
                                    : ""

                            }
                            {/* END ISSUED  */}


                            {/* ******** CHECK **********/}

                            {
                                permission.filter((item) => {
                                    // return item.menuCode == "BTN0017" && item.rolE_VIEW == "True" && creSec == roleSec
                                    return (item.menuCode == "BTN0017" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.crE_CheckCode) ||
                                        (item.menuCode == "BTN0017" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.dD_CheckCode)
                                }).length ? (
                                    (dataModaldt[0]?.dD_CheckBit == "R") ||
                                    (dataModaldt[0]?.dD_CheckBit != "R" && dataModaldt[0]?.create_ApprovedBit != "F" && dataModaldt[0]?.dD_ApprovedBit != "F") ||
                                    (dataModaldt[0]?.dD_CheckBit != "R" && dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0]?.dD_ApprovedBit != "F" && dataModaldt[0]?.dD_IssuedBit == "F")
                                )
                                &&
                                <>
                                    <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                        ตีกลับ (Return) DD
                                    </Button>
                                </> : ""
                            }

                            {
                                permission.filter((item) => {
                                    // return item.menuCode == "BTN0021" && item.rolE_VIEW == "True" && creSec == roleSec
                                    return (item.menuCode == "BTN0021" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.crE_CheckCode) ||
                                        ((item.menuCode == "BTN0021" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.dD_CheckCode))
                                }).length ? (
                                    (dataModaldt[0]?.dD_CheckBit == "R") ||
                                    (dataModaldt[0]?.dD_CheckBit != "R" && dataModaldt[0]?.create_ApprovedBit != "F" && dataModaldt[0]?.dD_ApprovedBit != "F") ||
                                    (dataModaldt[0]?.dD_CheckBit != "R" && dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0]?.dD_ApprovedBit != "F" && dataModaldt[0]?.dD_IssuedBit == "F")
                                )
                                &&
                                <Button autoFocus variant="success" onClick={() => getCheck(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                    อนุมัติ (MG Approved) DD
                                </Button>
                                    :
                                    ""
                            }
                            {/* ********END CHECK **********/}


                            {/* APPROVED */}
                            {
                                permission.filter((item) => {
                                    // return (item.menuCode == "BTN0018" && item.rolE_VIEW == "True" && creSec == roleSec && dataModaldt[0]?.create_ApprovedBit != "F" && dataModaldt[0].create_CheckBit == "F") ||
                                    //     (item.menuCode == "BTN0018" && item.rolE_VIEW == "True" && creSec == roleSec && dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0].create_CheckBit == "F") ||
                                    //     (item.menuCode == "BTN0018" && item.rolE_VIEW == "True" && creSec != roleSec && dataModaldt[0]?.create_ApprovedBit == "F")
                                    return (item.menuCode == "BTN0018" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.crE_ApprovedCode) ||
                                        (item.menuCode == "BTN0018" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.dD_ApprovedCode)
                                }).length ? (
                                    // (dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0]?.dD_CheckBit == "F" && dataModaldt[0]?.eN_ReceiveBit == "U") ||
                                    // dataModaldt[0]?.pU_ReceiveBit == "U" ||
                                    // dataModaldt[0]?.pU_ReceiveBit == "R"
                                    (dataModaldt[0]?.create_CheckBit == "F" && dataModaldt[0]?.pU_ReceiveBit != "F") ||
                                    (dataModaldt[0]?.dD_CheckBit == "F" && dataModaldt[0]?.eN_ReceiveBit == "U")
                                )
                                &&
                                <>
                                    <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                        ตีกลับ (Return) DD
                                    </Button>
                                </> : ""
                            }

                            {
                                permission.filter((item) => {
                                    // return (item.menuCode == "BTN0022" && item.rolE_VIEW == "True" && creSec == roleSec && dataModaldt[0]?.create_ApprovedBit != "F" && dataModaldt[0]?.create_CheckBit == "F") ||
                                    //     (item.menuCode == "BTN0022" && item.rolE_VIEW == "True" && creSec == roleSec && dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0]?.create_CheckBit == "F") ||
                                    //     (item.menuCode == "BTN0022" && item.rolE_VIEW == "True" && creSec != roleSec && dataModaldt[0]?.create_ApprovedBit == "F")
                                    return (item.menuCode == "BTN0022" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.crE_ApprovedCode) ||
                                        (item.menuCode == "BTN0022" && item.rolE_VIEW == "True" && empCode == dataModaldt[0]?.dD_ApprovedCode)
                                }).length ? (
                                    // (dataModaldt[0]?.create_ApprovedBit == "F" && dataModaldt[0]?.dD_CheckBit == "F" && dataModaldt[0]?.eN_ReceiveBit == "U") ||
                                    // dataModaldt[0]?.pU_ReceiveBit == "U" ||
                                    // dataModaldt[0]?.pU_ReceiveBit == "R" ||
                                    (dataModaldt[0]?.create_CheckBit == "F" && dataModaldt[0]?.pU_ReceiveBit != "F") ||
                                    (dataModaldt[0]?.dD_CheckBit == "F" && dataModaldt[0]?.eN_ReceiveBit == "U")
                                )
                                && <Button autoFocus variant="success" onClick={() => getApproved(dataModaldt[0]?.ecR_NO, dataModaldt[0]?.section, dataModaldt[0]?.create_ApprovedBit)}>
                                    อนุมัติ (GM Approved) DD
                                </Button>
                                    :
                                    ""
                            }
                            {/* END APPROVED */}
                            {/* ****************************END BUTTON SECTION DD **************************/}


                            {/* **************************** BUTTON SECTION EN **************************/}
                            {/* RECEIVE  */}
                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0023" && item.rolE_VIEW == "True" && dataModaldt[0]?.dD_ApprovedBit == "F" && dataModaldt[0]?.eN_IssuedBit != "F"
                                }).length ?
                                    <>
                                        <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                            ตีกลับ (Return) EN
                                        </Button>
                                    </> : ""
                            }


                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0027" && item.rolE_VIEW == "True" && dataModaldt[0]?.dD_ApprovedBit == "F" && dataModaldt[0]?.eN_IssuedBit != "F"
                                }).length ? <Button autoFocus variant="success" onClick={() => getReceive(dataModaldt[0].ecR_NO)}>
                                    รับเอกสาร (Receive) EN
                                </Button>
                                    :
                                    ""
                            }
                            {/* END RECEIVE  */}


                            {/*  ISSUED  */}
                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0024" && item.rolE_VIEW == "True" && dataModaldt[0]?.eN_ReceiveBit == "F" && empCode == dataModaldt[0]?.eN_IssuedCode
                                }).length ? dataModaldt[0]?.eN_CheckBit != "F" &&
                                <>
                                    <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                        ตีกลับ (Return) EN
                                    </Button>
                                </> : ""
                            }

                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0028" && item.rolE_VIEW == "True" && dataModaldt[0]?.eN_ReceiveBit == "F" && empCode == dataModaldt[0]?.eN_IssuedCode
                                }).length ? dataModaldt[0]?.eN_CheckBit != "F" &&
                                <>
                                    <Button autoFocus variant="success" onClick={() => getIssued(dataModaldt[0].ecR_NO)}>
                                        ออกเอกสาร (Issued) EN
                                    </Button>
                                </>
                                    : ""

                            }
                            {/* END ISSUED  */}


                            {/* ******** CHECK **********/}
                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0025" && item.rolE_VIEW == "True" && dataModaldt[0]?.eN_IssuedBit == "F" && empCode == dataModaldt[0]?.eN_CheckCode
                                }).length ? dataModaldt[0]?.eN_ApprovedBit != "F" &&
                                <>
                                    <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                        ตีกลับ (Return) EN
                                    </Button>
                                </> : ""
                            }

                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0029" && item.rolE_VIEW == "True" && dataModaldt[0]?.eN_IssuedBit == "F" && empCode == dataModaldt[0]?.eN_CheckCode
                                }).length ? dataModaldt[0]?.eN_ApprovedBit != "F" &&
                                <Button autoFocus variant="success" onClick={() => getCheck(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                    อนุมัติ (MG Approved) EN
                                </Button>
                                    :
                                    ""
                            }
                            {/* ********END CHECK **********/}


                            {/* APPROVED */}
                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0026" && item.rolE_VIEW == "True" && dataModaldt[0]?.eN_CheckBit == "F" && empCode == dataModaldt[0]?.eN_ApprovedCode
                                }).length ? dataModaldt[0]?.sqC_ReceiveBit != "F" &&
                                <>
                                    <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                        ตีกลับ (Return) EN
                                    </Button>
                                </> : ""
                            }

                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0030" && item.rolE_VIEW == "True" && dataModaldt[0]?.eN_CheckBit == "F" && empCode == dataModaldt[0]?.eN_ApprovedCode
                                }).length ? dataModaldt[0]?.sqC_ReceiveBit != "F" &&
                                <Button autoFocus variant="success" onClick={() => getApproved(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_ApprovedBit)}>
                                    อนุมัติ (GM Approved) EN
                                </Button>
                                    :
                                    ""
                            }
                            {/* END APPROVED */}
                            {/* ****************************END BUTTON SECTION EN **************************/}



                            {/* **************************** BUTTON SECTION SQC **************************/}
                            {/* RECEIVE  */}
                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0031" && item.rolE_VIEW == "True" && dataModaldt[0]?.eN_ApprovedBit == "F"
                                }).length ? dataModaldt[0]?.sqC_IssuedBit != "F" &&
                                <>
                                    <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                        ตีกลับ (Return) SQC
                                    </Button>
                                </> : ""
                            }


                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0035" && item.rolE_VIEW == "True" && dataModaldt[0]?.eN_ApprovedBit == "F"
                                }).length ? dataModaldt[0]?.sqC_IssuedBit != "F" &&
                                <Button autoFocus variant="success" onClick={() => getReceive(dataModaldt[0].ecR_NO)}>
                                    รับเอกสาร (Receive) SQC
                                </Button>
                                    :
                                    ""
                            }
                            {/* END RECEIVE  */}

                            {/*  ISSUED  */}
                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0032" && item.rolE_VIEW == "True" && dataModaldt[0]?.sqC_ReceiveBit == "F" && empCode == dataModaldt[0]?.sqC_IssuedCode
                                }).length ? dataModaldt[0]?.sqC_CheckBit != "F" &&
                                <>
                                    <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                        ตีกลับ (Return) SQC
                                    </Button>
                                </> : ""
                            }

                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0036" && item.rolE_VIEW == "True" && dataModaldt[0]?.sqC_ReceiveBit == "F" && empCode == dataModaldt[0]?.sqC_IssuedCode
                                }).length ? dataModaldt[0]?.sqC_CheckBit != "F" &&
                                <>
                                    <Button autoFocus variant="success" onClick={() => getIssued(dataModaldt[0].ecR_NO)}>
                                        ออกเอกสาร (Issued) SQC
                                    </Button>
                                </>
                                    : ""

                            }
                            {/* END ISSUED  */}


                            {/* ******** CHECK **********/}
                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0033" && item.rolE_VIEW == "True" && dataModaldt[0]?.sqC_IssuedBit == "F" && empCode == dataModaldt[0]?.sqC_CheckCode
                                }).length ? dataModaldt[0]?.sqC_ApprovedBit != "F" &&
                                <>
                                    <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                        ตีกลับ (Return) SQC
                                    </Button>
                                </> : ""
                            }

                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0037" && item.rolE_VIEW == "True" && dataModaldt[0]?.sqC_IssuedBit == "F" && empCode == dataModaldt[0]?.sqC_CheckCode
                                }).length ? dataModaldt[0]?.sqC_ApprovedBit != "F" &&
                                <Button autoFocus variant="success" onClick={() => getCheck(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                    อนุมัติ (MG Approved) SQC
                                </Button>
                                    :
                                    ""
                            }
                            {/* ********END CHECK **********/}


                            {/* APPROVED */}
                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0034" && item.rolE_VIEW == "True" && dataModaldt[0]?.sqC_CheckBit == "F" && empCode == dataModaldt[0]?.sqC_ApprovedCode
                                }).length ? dataModaldt[0]?.qC_ReceiveBit != "F" &&
                                <>
                                    <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                        ตีกลับ (Return) SQC
                                    </Button>
                                </> : ""
                            }

                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0038" && item.rolE_VIEW == "True" && dataModaldt[0]?.sqC_CheckBit == "F" && empCode == dataModaldt[0]?.sqC_ApprovedCode
                                }).length ? dataModaldt[0]?.qC_ReceiveBit != "F" &&
                                <Button autoFocus variant="success" onClick={() => getApproved(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_ApprovedBit)}>
                                    อนุมัติ (GM Approved) SQC
                                </Button>
                                    :
                                    ""
                            }
                            {/* END APPROVED */}
                            {/* ****************************END BUTTON SECTION SQC **************************/}



                            {/* **************************** BUTTON SECTION QC **************************/}
                            {/* RECEIVE  */}
                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0039" && item.rolE_VIEW == "True" && dataModaldt[0]?.sqC_ApprovedBit == "F"
                                }).length ? dataModaldt[0]?.qC_IssuedBit != "F" &&
                                <>
                                    <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                        ตีกลับ (Return) QC
                                    </Button>
                                </> : ""
                            }


                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0043" && item.rolE_VIEW == "True" && dataModaldt[0]?.sqC_ApprovedBit == "F"
                                }).length ? dataModaldt[0]?.qC_IssuedBit != "F" &&
                                <Button autoFocus variant="success" onClick={() => getReceive(dataModaldt[0].ecR_NO)}>
                                    รับเอกสาร (Receive) QC
                                </Button>
                                    :
                                    ""
                            }
                            {/* END RECEIVE  */}

                            {/*  ISSUED  */}
                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0040" && item.rolE_VIEW == "True" && dataModaldt[0]?.qC_ReceiveBit == "F" && empCode == dataModaldt[0]?.qC_IssuedCode
                                }).length ? dataModaldt[0]?.qC_CheckBit != "F" &&
                                <>
                                    <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                        ตีกลับ (Return) QC
                                    </Button>
                                </> : ""
                            }

                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0044" && item.rolE_VIEW == "True" && dataModaldt[0]?.qC_ReceiveBit == "F" && empCode == dataModaldt[0]?.qC_IssuedCode
                                }).length ? dataModaldt[0]?.qC_CheckBit != "F" &&
                                <>
                                    <Button autoFocus variant="success" onClick={() => getIssued(dataModaldt[0].ecR_NO)}>
                                        ออกเอกสาร (Issued) QC
                                    </Button>
                                </>
                                    : ""

                            }
                            {/* END ISSUED  */}


                            {/* ******** CHECK **********/}
                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0041" && item.rolE_VIEW == "True" && dataModaldt[0]?.qC_IssuedBit == "F" && empCode == dataModaldt[0]?.qC_CheckCode
                                }).length ? dataModaldt[0]?.qC_ApprovedBit != "F" &&
                                <>
                                    <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                        ตีกลับ (Return) QC
                                    </Button>
                                </> : ""
                            }

                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0045" && item.rolE_VIEW == "True" && dataModaldt[0]?.qC_IssuedBit == "F" && empCode == dataModaldt[0]?.qC_CheckCode
                                }).length ? dataModaldt[0]?.qC_ApprovedBit != "F" &&
                                <Button autoFocus variant="success" onClick={() => getCheck(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                    อนุมัติ (MG Approved) QC
                                </Button>
                                    :
                                    ""
                            }
                            {/* ********END CHECK **********/}


                            {/* APPROVED */}
                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0042" && item.rolE_VIEW == "True" && dataModaldt[0]?.qC_CheckBit == "F" && empCode == dataModaldt[0]?.qC_ApprovedCode
                                }).length ? dataModaldt[0]?.diL_RECEIVEBIT != "F" &&
                                <>
                                    <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                        ตีกลับ (Return) QC
                                    </Button>
                                </> : ""
                            }

                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0046" && item.rolE_VIEW == "True" && dataModaldt[0]?.qC_CheckBit == "F" && empCode == dataModaldt[0]?.qC_ApprovedCode
                                }).length ? dataModaldt[0]?.diL_RECEIVEBIT != "F" &&
                                <Button autoFocus variant="success" onClick={() => getApproved(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_ApprovedBit)}>
                                    อนุมัติ (GM Approved) QC
                                </Button>
                                    :
                                    ""
                            }
                            {/* END APPROVED */}
                            {/* ****************************END BUTTON SECTION QC **************************/}



                            {/* **************************** BUTTON SECTION DIL **************************/}
                            {/* RECEIVE  */}
                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0047" && item.rolE_VIEW == "True" && dataModaldt[0]?.qC_ApprovedBit == "F"
                                }).length ? dataModaldt[0]?.qA_IssuedBit != "F" &&
                                <>
                                    <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                        ตีกลับ (Return) DIL
                                    </Button>
                                </> : ""
                            }


                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0048" && item.rolE_VIEW == "True" && dataModaldt[0]?.qC_ApprovedBit == "F"
                                }).length ? dataModaldt[0]?.qA_IssuedBit != "F" &&
                                <Button autoFocus variant="success" onClick={() => ApprovedDIL(dataModaldt[0].ecR_NO)}>
                                    อนุมัติ (GM Approved) DIL
                                </Button>
                                    :
                                    ""
                            }
                            {/* END RECEIVE  */}
                            {/* **************************** BUTTON SECTION DIL **************************/}




                            {/* **************************** BUTTON SECTION QA **************************/}
                            {/* RECEIVE  */}
                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0049" && item.rolE_VIEW == "True" && dataModaldt[0]?.diL_RECEIVEBIT == "F"
                                }).length ? dataModaldt[0]?.qA_IssuedBit != "F" &&
                                <>
                                    <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                        ตีกลับ (Return) QA
                                    </Button>
                                </> : ""
                            }


                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0053" && item.rolE_VIEW == "True" && dataModaldt[0]?.diL_RECEIVEBIT == "F"
                                }).length ? dataModaldt[0]?.qA_IssuedBit != "F" &&
                                <Button autoFocus variant="success" onClick={() => getReceive(dataModaldt[0].ecR_NO)}>
                                    รับเอกสาร (Receive) QA
                                </Button>
                                    :
                                    ""
                            }
                            {/* END RECEIVE  */}

                            {/*  ISSUED  */}
                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0050" && item.rolE_VIEW == "True" && dataModaldt[0]?.qA_ReceiveBit == "F" && empCode == dataModaldt[0]?.qA_IssuedCode
                                }).length ? dataModaldt[0]?.qA_CheckBit != "F" &&
                                <>
                                    <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                        ตีกลับ (Return) QA
                                    </Button>
                                </> : ""
                            }

                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0054" && item.rolE_VIEW == "True" && dataModaldt[0]?.qA_ReceiveBit == "F" && empCode == dataModaldt[0]?.qA_IssuedCode
                                }).length ? dataModaldt[0]?.qA_CheckBit != "F" &&
                                <>
                                    <Button autoFocus variant="success" onClick={() => getIssued(dataModaldt[0].ecR_NO)}>
                                        ออกเอกสาร (Issued) QA
                                    </Button>
                                </>
                                    : ""
                            }
                            {/* END ISSUED  */}


                            {/* ******** CHECK **********/}
                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0051" && item.rolE_VIEW == "True" && dataModaldt[0]?.qA_IssuedBit == "F" && empCode == dataModaldt[0]?.qA_CheckCode
                                }).length ? dataModaldt[0]?.qA_ApprovedBit != "F" &&
                                <>
                                    <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                        ตีกลับ (Return) QA
                                    </Button>
                                </> : ""
                            }

                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0055" && item.rolE_VIEW == "True" && dataModaldt[0]?.qA_IssuedBit == "F" && empCode == dataModaldt[0]?.qA_CheckCode
                                }).length ? dataModaldt[0]?.qA_ApprovedBit != "F" &&
                                <Button autoFocus variant="success" onClick={() => getCheck(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                    อนุมัติ (MG Approved) QA
                                </Button>
                                    :
                                    ""
                            }
                            {/* ********END CHECK **********/}



                            {/* APPROVED */}
                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0052" && item.rolE_VIEW == "True" && dataModaldt[0]?.qA_CheckBit == "F" && empCode == dataModaldt[0]?.qA_ApprovedCode
                                }).length ?
                                    <>
                                        <Button autoFocus variant="danger" onClick={() => getReturn(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_CheckBit)}>
                                            ตีกลับ (Return) QA
                                        </Button>
                                    </> : ""
                            }

                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0056" && item.rolE_VIEW == "True" && dataModaldt[0]?.qA_CheckBit == "F" && empCode == dataModaldt[0]?.qA_ApprovedCode
                                }).length ?
                                    <Button autoFocus variant="success" onClick={() => getApproved(dataModaldt[0].ecR_NO, dataModaldt[0].section, dataModaldt[0].create_ApprovedBit)}>
                                        อนุมัติ (GM Approved) QA
                                    </Button>
                                    :
                                    ""
                            }
                            {/* END APPROVED */}
                            {/* ****************************END BUTTON SECTION QA **************************/}

                        </Stack>
                    </div>
                </Dialog>
            </BootstrapDialog >


            <ModelAttachFile
                show={openAttrFile}
                // onHide={setOpenAttrFile}
                close={setOpenAttrFile}
                item={ecrnoSelected}
            />
        </div >
    )
}

export default FormDetail