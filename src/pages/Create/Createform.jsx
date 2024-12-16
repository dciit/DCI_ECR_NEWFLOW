import React, { useEffect, useRef, useState } from 'react'
import getDataSrvHD from '../../service/getServiceHeader.js'
import SrvPermissiom from '../../service/getPermisson.js'
import './Createform.css'
import Button from 'react-bootstrap/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { IoShieldCheckmark, IoHourglassOutline, IoArrowBackCircleSharp, IoArrowDown, IoArrowForward } from "react-icons/io5";
import ModelAttachFile from '../FileAttached/ModelAttachFile.jsx';
import Chat from '../Chat/Chat.jsx'
import FormModalDetail from './FormDetail.jsx';
import FormCreate from './FormCreate.jsx';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import moment from 'moment';
import { yellow } from '@mui/material/colors';
import Filee from '../../../public/asset/Image/File.png'
import Print from '../../../public/asset/Image/Print2.png'
import Chatt from '../../../public/asset/Image/Chat60.png'
import { Link, useNavigate } from 'react-router-dom';
import { useHref } from 'react-router';
import { FcFinePrint, FcPrint, FcSms, FcDocument, FcOk, FcKindle, FcLink, FcSearch, FcAssistant } from "react-icons/fc";
import { LegendToggleOutlined } from '@mui/icons-material';
import { faFile, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { CircularProgress } from '@mui/material';
import pinkImg from '../../../public/asset/Image/pink.jpg'
import yellowImg from '../../../public/asset/Image/yellow.png'
import greenImg from '../../../public/asset/Image/green.png'
import redImg from '../../../public/asset/Image/red.png'
import blueImg from '../../../public/asset/Image/blue.png'
import orangeImg from '../../../public/asset/Image/orange.jpg';
import FullTitle from '../../FullTitle/FullTitle.jsx';
import { display, fontSize, width } from '@mui/system';
import { Badge, Card, Spin } from 'antd';
import MGR_Assigned from '../Assigned/MGR_Assigned.jsx';
import { Empty } from 'antd';



function Createform() {
    const navigate = useNavigate();
    const tableRef = useRef(null);
    //const section = localStorage.getItem("section");
    // const section = Cookies.get('section')
    const section = Cookies.get('section')
    const [openAttrFile, setOpenAttrFile] = useState(false);
    const [openModalChat, setOpenModalChat] = useState(false);
    const [openModalTitle, setOpenModalTitle] = useState(false);
    const [openModelAssigned, setOpenModalAssigned] = useState(false);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [ecrnoSelected, setEcrnoSelected] = useState('');
    const [statusCreateAppBit, setStatusCreateAppBit] = useState('');
    const permission = useSelector((state) => state.reducer.permission);
    const permissionActive = useSelector((state) => state.reducer.permissionActive);
    const [selectStatus, setselectStatus] = useState("0");
    const [selectDuedate, setSelectDuedate] = useState("2");
    const [strClass, setStrClass] = useState('ALL');
    const [ECRNo, setECRNO] = useState('');
    const [Title, setTitle] = useState('');
    const [Model, setModel] = useState('');
    const [PartName, setPartName] = useState('');
    const [DrawingNo, setDrawingNo] = useState('');
    const [BRNo, setBRNO] = useState('');
    const [load, setLoad] = useState(true);
    const [DefaultLoad, setDefaultLoad] = useState(true);



    const PrintECR = (ecrno) => {
        // navigate(`/ECR/PrintPage/${ecrno}`,
        // );
        window.open(`/ECR/PrintPage/${ecrno}`, '_blank', 'noopener,noreferrer');
    }

    const handleShow = () => {
        setOpenModalCreate(true)
    };
    // **************************************************


    const [getdata, setGetdata] = useState([])
    useEffect(() => {
        loadPage();
        setLoad(true);
        setDefaultLoad(true);
    }, [])


    useEffect(() => {
        if (openModalChat == false) {
            loadPage();
        }
    }, [openModalChat])


    useEffect(() => {
        if (openModalTitle == false) {
            loadPage();
        }
    }, [openModalTitle])


    useEffect(() => {
        if (openModelAssigned == false) {
            loadPage();
        }
    }, [openModelAssigned])


    useEffect(() => {
        if (openModalCreate == false) {
            getSearch();
        }
    }, [openModalCreate])


    useEffect(() => {
        if (openModelAssigned == false) {
            getSearch();
        }
    }, [openModelAssigned])




    function loadPage() {
        getDataSrvHD.getECRListLoad(selectSection, selectStatus).then((res) => {
            try {
                setGetdata(res.data)
                setLoad(false);
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }


    //// **************DAILOG DETAIL  *************************

    const [loadStatusCreate, setLoadStatusCreate] = useState(false);

    useEffect(() => {
        if (loadStatusCreate == true) {
            setOpenModalDetail(true);
        }
    }, [loadStatusCreate])


    const handleShowDetail = (ecrno) => {
        setLoadStatusCreate(false);
        getDataSrvHD.getStatusCreate(ecrno).then((res) => {
            try {
                setStatusCreateAppBit(res.data)
                setEcrnoSelected(ecrno);
                setLoadStatusCreate(true);
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    };
    /// ****************** END DAILOG DETAIL   *****************


    //**************************** ddl Status ************ */

    const showSection = (val) => {
        var varShowSection = '';

        if (val == 'Design') {
            varShowSection = "DD"
        }
        else {
            varShowSection = "PU"
        }
        return varShowSection;
    }




    const grp = (val) => {
        var varGrp = '';

        if (val == 'ADMIN') {
            varGrp = "ALL"
        }
        else {
            varGrp = permission[0]?.grpRoleSect
        }
        return varGrp;
    }


    const [SectionDefaultLoad, setSectionDefaultLoad] = useState(grp(permission[0]?.grpRoleSect));
    const [selectSection, setSelectSection] = useState("ALL");

    const handleChange = (event) => {
        setSelectSection(event.target.value);
    };


    const handleChangeStatus = (event) => {
        setselectStatus(event.target.value);
    };

    const handleChangeDuedate = (event) => {
        setSelectDuedate(event.target.value);
    };


    const handleChangeClass = (event) => {
        setStrClass(event.target.value);
    };

    //****************************END ddl Status ************ */



    //**************************** BUTTON SEARCH ************ */
    // ส่ง DocNo กับ Status ไป API
    const [DocNo, setDocNo] = useState(('%'));
    const getSearch = (event) => {
        setLoad(true);
        setDefaultLoad(false);
        getDataSrvHD.postECRList({ section: selectSection, ecrno: ECRNo, title: Title, model: Model, partName: PartName, drawingNo: DrawingNo, brno: BRNo, status: selectStatus, strclass: strClass, statusDuedate: selectDuedate }).then((res) => {
            try {
                setGetdata(res.data)
                setLoad(false);
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    };


    function handleChangeSearch(value) {
        if (value == "") {
            var doc = "%"
            setDocNo(doc);
        }
        else {
            setDocNo(value);
        }
    }
    //****************************END BUTTON SEARCH ************ *
    // const sectionArray = ['CREATE', 'PU', 'DD', 'EN', 'SQC', 'QC', 'DIL', 'QA']
    // const sectionArrayAll = ['ALL', 'CREATE', 'PU', 'DD', 'EN', 'SQC', 'QC', 'DIL_DD', 'DIL_QC', 'QA']
    const sectionArray = ['CREATE', 'PU', 'DD', 'EN', 'SQC', 'QC', 'DIL_DD', 'DIL_QC', 'QA']
    const sectionArrayAll = ['ALL', 'CREATE', 'PU', 'DD', 'EN', 'SQC', 'QC', 'DIL', 'QA']
    const classArray = ['ALL', 'CLASS A', 'CLASS B', 'CLASS C', 'CLASS D', 'CLASS E']


    const content = <div className='Loading' />;

    return (<>
        <div className='stylePagee'>
            <div class="card ">
                <h5 class="card-header bg-info text-white border-0">ค้นหาเอกสาร ECR</h5>  {/* 😉🤣😍😒😁🤞👏💋🌹🎂✔🤳💖😢😎🎶🤳💕 */}
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-auto">
                            <label for="colFormLabelSm" >Process in Section :</label>
                        </div>

                        <div class="col-md-auto">
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small-label">Section</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={selectSection}
                                    label="Section"
                                    onChange={handleChange}>
                                    {
                                        sectionArrayAll.map((item, index) =>
                                            <MenuItem value={item}>{item}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </div>

                        <div class="col-md-auto">
                            <label for="colFormLabelSm" >Status :</label>
                        </div>
                        <div class="col-md-auto">
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small-label">Status</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={selectStatus}
                                    label="Status"
                                    onChange={handleChangeStatus}>
                                    <MenuItem value='0'>On Process</MenuItem>
                                    <MenuItem value='1'>Finish</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div class="col-md-auto">
                            <label for="colFormLabelSm" >DueDate :</label>
                        </div>
                        <div class="col-md-auto">
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small-label">DueDate</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={selectDuedate}
                                    label="DueDate"
                                    onChange={handleChangeDuedate}>
                                    <MenuItem value='0'>OVER</MenuItem>
                                    <MenuItem value='1'>REMAIN</MenuItem>
                                    <MenuItem value='2'>ALL</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-auto">
                            <label for="colFormLabelSm" >CLASS :</label>
                        </div>
                        <div class="col-md-auto">
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small-label">Class</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={strClass}
                                    label="Class"
                                    onChange={handleChangeClass}>
                                    {
                                        classArray.map((item, index) =>
                                            <MenuItem value={item}>{item}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </div>
                    </div>



                    <div class="row mb-3">
                        <div class="col-md-auto">
                            <label for="colFormLabelSm">ECR No :</label>
                        </div>
                        <div class="col-sm-2">
                            <input type="text" class="form-control form-control-sm" id="colFormLabelSm" onChange={(event) => setECRNO(event.target.value)} />
                        </div>


                        <div class="col-md-auto">
                            <label for="colFormLabelSm">BR No :</label>
                        </div>
                        <div class="col-sm-2">
                            <input type="text" class="form-control form-control-sm" id="colFormLabelSm" onChange={(event) => setBRNO(event.target.value)} />
                        </div>

                        <div class="col-md-auto">
                            <label for="colFormLabelSm">Drawing No :</label>
                        </div>
                        <div class="col-sm-2">
                            <input type="text" class="form-control form-control-sm" id="colFormLabelSm" onChange={(event) => setDrawingNo(event.target.value)} />
                        </div>

                        <div class="col-sm-6"></div>
                    </div>


                    <div class="row mb-3">
                        <div class="col-md-auto">
                            <label for="colFormLabelSm">Title :</label>
                        </div>
                        <div class="col-sm-2">
                            <input type="text" class="form-control form-control-sm" id="colFormLabelSm" onChange={(event) => setTitle(event.target.value)} />
                        </div>

                        <div class="col-md-auto">
                            <label for="colFormLabelSm">Model :</label>
                        </div>
                        <div class="col-sm-2">
                            <input type="text" class="form-control form-control-sm" id="colFormLabelSm" onChange={(event) => setModel(event.target.value)} />
                        </div>

                        <div class="col-md-auto">
                            <label for="colFormLabelSm">Part Name :</label>
                        </div>
                        <div class="col-sm-2">
                            <input type="text" class="form-control form-control-sm" id="colFormLabelSm" onChange={(event) => setPartName(event.target.value)} />
                        </div>

                        <div class="col-sm-6"></div>
                    </div>


                    <div class="row" >
                        <div class="col-md-auto">
                            <button type="submit" class="btn btn-primary" onClick={getSearch}><FontAwesomeIcon icon={faMagnifyingGlass} /> Search</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0001" && item.rolE_VIEW == "True"
                                }).length ? <Button variant="success" onClick={handleShow}> <FontAwesomeIcon icon={faFile} /> สร้างเอกสาร ECR ใหม่</Button>
                                    :
                                    ""
                            }
                        </div>
                        <div class="col col-lg-2">
                            <DownloadTableExcel
                                filename="ECR Pending"
                                sheet="Detail"
                                currentTableRef={tableRef.current}
                            >
                                <button type="submit" class="btn btn-warning"> Export excel </button>
                            </DownloadTableExcel>
                        </div>
                        <div class="col col-lg-1">
                            <p><span><img src={greenImg} alt="logo" style={{ width: '20px', height: '20px' }} /></span> FINISHED</p>
                        </div>
                        <div class="col col-lg-1">
                            <p><span><img src={yellowImg} alt="logo" style={{ width: '21px', border: 'solid 1px #ede587' }} /></span> HOLD</p>
                        </div>
                        {/* <div class="col col-lg-1">
                            <p><span><img src={pinkImg} alt="logo" style={{ width: '20px', height: '20px' }} /></span> RETURNED</p>
                        </div> */}
                        <div class="col col-lg-1">
                            <p><span><img src={orangeImg} alt="logo" style={{ width: '20px', height: '20px' }} className='hithere waiting' /></span> WAITING</p>
                        </div>
                        <div class="col col-lg-1">
                            <p><span><img src={redImg} alt="logo" style={{ width: '20px', height: '20px' }} className='hithere content' /></span> ACTION</p>
                        </div>
                    </div>

                    {
                        DefaultLoad ? <div class="row" style={{ marginTop: '10px' }}>
                            <div class="col col-lg-6" style={{ color: '#aaacad' }}>
                                <p>หมายเหตุ : 1.เมื่อ Login เข้าสู่ระบบ เอกสาร ECR ที่โชว์จะเป็นเอกสารที่ยังคงค้างในแผนกของคุณตามสิทธิ์ Login <br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    2.เมื่อต้องการเห็นเอกสาร ECR ที่ยังคงค้างในระบบทั้งหมดให้เลือก Process in Section เป็น ALL แล้วกดปุ่ม Search
                                </p>
                            </div>
                        </div> : ""
                    }

                </div>
            </div>
            <br></br>



            {
                load == true ? <div class="text-center">
                    <Spin tip="Loading" size="large">
                        {content}
                    </Spin>
                </div> : <>
                    {
                        getdata.length > 0 ? <>{
                            <div className='tableCreateform'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th colSpan={15} style={{ fontSize: '25px' }}>Detail</th>
                                            <th colSpan={37} style={{ fontSize: '25px' }}>Actual Process</th>
                                        </tr>
                                        <tr>
                                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', width: '6%', fontSize: '14px' }}>TARGET</th>
                                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', width: '6%', fontSize: '14px' }}>STATUS</th>
                                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', width: '6%', fontSize: '14px' }}>RESPONSE SECTION</th>
                                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', fontSize: '14px', padding: '8px' }}>CHECK DETAIL</th>
                                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', fontSize: '14px' }}>DCS NO</th>
                                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', fontSize: '14px' }}>DRAWING</th>
                                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', fontSize: '14px', padding: '8px' }}>CLASS</th>
                                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', fontSize: '14px' }}>ECR NO</th>
                                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', width: '400px', fontSize: '14px' }}>TITLE</th>
                                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', width: '400px', fontSize: '14px' }}>FULL TITLE</th>
                                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', fontSize: '14px', padding: '8px' }}>SECTION</th>
                                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', fontSize: '14px', padding: '8px' }}>ATTACHED FILE</th>
                                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', width: '200px', fontSize: '14px', padding: '8px' }}>COMMENT</th>
                                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', fontSize: '14px' }}>PRINT</th>
                                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', fontSize: '14px' }}>MGR Assigned</th>
                                            <th colSpan={3} rowSpan={2} style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', fontSize: '14px' }}>CREATE</th>
                                            <th colSpan={3} rowSpan={2} style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', fontSize: '14px' }}>PU</th>
                                            <th colSpan={3} rowSpan={2} style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', fontSize: '14px' }}>DD</th>
                                            <th colSpan={3} rowSpan={2} style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', fontSize: '14px' }}>EN</th>
                                            <th colSpan={2} rowSpan={2} style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', fontSize: '14px' }}>SQC</th>
                                            <th colSpan={2} rowSpan={2} style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', fontSize: '14px' }}>QC</th>
                                            <th colSpan={2} style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', fontSize: '14px' }}>SENT TO DIL</th>
                                            <th colSpan={3} rowSpan={2} style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', fontSize: '14px' }}>QA</th>
                                        </tr>

                                        <tr colSpan={10} style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', fontSize: '14px' }}>
                                            <th colSpan={1}>(DIL DD Section)</th>
                                            <th colSpan={1}>(DIL QC Section)</th>
                                        </tr>


                                        <tr style={{ color: 'white', backgroundColor: 'rgb(40 136 231)', fontSize: '14px' }}>

                                            <th>Issued</th>
                                            <th>Checked</th>
                                            <th>Approved</th>


                                            <th>Issued</th>
                                            <th>Checked</th>
                                            <th>Approved</th>


                                            <th>Issued</th>
                                            <th>Checked</th>
                                            <th>Approved</th>


                                            <th>Issued</th>
                                            <th>Checked</th>
                                            <th>Approved</th>


                                            <th>Issued</th>
                                            <th>Checked</th>



                                            <th>Issued</th>
                                            <th>Checked</th>





                                            <th colSpan={1}>Approved</th>


                                            <th colSpan={1}>Approved</th>



                                            <th>Checked</th>
                                            <th>Approved</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            getdata?.map((item, index) => {  // ข้อมูลใหญ่
                                                //let oCols = ['cre', 'pu', 'dd', 'en', 'sqc', 'qc', 'dil_dd', 'dil_qc', 'qa'];
                                                let oCols = ['cre', 'pu', 'dd', 'en'];
                                                let oCols1 = ['sqc', 'qc'];
                                                let oCols2 = ['dil_dd', 'dil_qc'];
                                                let oCols3 = ['qa'];
                                                let oApps = ['issued', 'check', 'approved'];
                                                let oAppa1 = ['issued', 'check'];
                                                let oApps2 = ['approved'];
                                                let oApps3 = ['check', 'approved'];
                                                let oEcr = [];
                                                let returnSec = '';
                                                let returnStep = 'issued';
                                                let holdSec = '';
                                                let holdStep = 'issued';



                                                if (typeof item.returnDoc != 'undefined' && item.returnDoc.length) {
                                                    if (item.returnDoc[0].empSection == "CREATE") {
                                                        returnSec = 'cre'
                                                    }
                                                    else if (item.returnDoc[0].empSection != "CREATE") {
                                                        returnSec = item.returnDoc[0].empSection;
                                                    }
                                                }

                                                if (typeof item.holdDoc != 'undefined' && item.holdDoc.length) {
                                                    if (item.holdDoc[0].empSection == "CREATE") {
                                                        holdSec = 'cre'
                                                    }
                                                    else if (item.holdDoc[0].empSection != "CREATE") {
                                                        holdSec = item.holdDoc[0].empSection;
                                                    }
                                                }

                                                oCols.map((items, idx) => { // Section
                                                    let iECR = {
                                                        key: items, app: []
                                                    }

                                                    oApps.map((iApp, idxx) => { // Step
                                                        let name = item[`${items}${iApp}by`]; // by
                                                        let date = item[`${items}${iApp}date`]; // date
                                                        let status = item[`${items}${iApp}bit`]; //bit
                                                        let pending = item[`${items}${iApp}SumDate`];
                                                        let pendingDay = item[`${items}${iApp}SumDate`]; //sumdate
                                                        let namePending = item[`${items}${iApp}namepending`];
                                                        let holdDay = item[`${items}${iApp}HoldDate`];


                                                        if (pendingDay > 0) {
                                                            pendingDay = 'Pending' + '  ' + item[`${items}${iApp}SumDate`] + '  ' + 'Day'; //sumdate
                                                        }
                                                        else {
                                                            pendingDay = ""
                                                        }

                                                        if (holdDay > 0) {
                                                            holdDay = <p style={{ fontSize: '10px', color: 'blue' }}>{item[`${items}${iApp}HoldDate`] + '  ' + 'Day'}</p>
                                                        }
                                                        else {
                                                            if (status == "F") {
                                                                holdDay = <p style={{ fontSize: '10px', color: '#7e8af5f0' }}>{"Less than 1 day"}</p>
                                                            }
                                                            else {
                                                                holdDay = "";
                                                            }
                                                        }


                                                        let alertHold = "";
                                                        let color = 'rgb(254 253 239)';
                                                        if (status == 'F') {
                                                            if (['cre', 'pu', 'dd', 'en'].includes(items)) {
                                                                color = 'rgb(44 255 171)';
                                                            }
                                                        }

                                                        else {
                                                            color = 'rgb(254 253 239)'
                                                        }

                                                        let icon = '';
                                                        if (status == "F" || status == "R") {
                                                            if (iApp == "received" || iApp == "issued" || iApp == "check") {
                                                                icon = <IoArrowForward style={{ color: "rgb(28 3 217)" }} />
                                                            }
                                                            else {
                                                                icon = <IoArrowForward style={{ color: "rgb(147 12 158)" }} />
                                                            }
                                                        }

                                                        let colorPendingDate = 'rgb(54 145 245)'

                                                        if (pending >= 3) {
                                                            colorPendingDate = 'red'
                                                        }
                                                        else {
                                                            colorPendingDate = 'rgb(54 145 245)'
                                                        }


                                                        iECR.app.push({
                                                            ecrno: item.ecrno,
                                                            name: name,
                                                            date: date,
                                                            status: status,
                                                            color: color,
                                                            title: iApp,
                                                            icon: icon,
                                                            pendingDay: pendingDay,
                                                            colorPendingDate: colorPendingDate,
                                                            namePedning: namePending,
                                                            holdDay: holdDay,
                                                            alertHold: alertHold,
                                                            returnSec: (returnSec.toUpperCase() == items.toUpperCase() && iApp == 'issued') ? 1 : 0,
                                                            holdSec: (holdSec.toUpperCase() == items.toUpperCase() && iApp == 'issued') ? 1 : 0,
                                                            sendDIL: item.sendDIL,
                                                        });
                                                    });


                                                    oEcr.push(iECR);

                                                });

                                                oCols1.map((items, idx) => { // Section
                                                    let iECR = {
                                                        key: items, app: []
                                                    }

                                                    oAppa1.map((iApp, idxx) => { // Step
                                                        let name = item[`${items}${iApp}by`]; // by
                                                        let date = item[`${items}${iApp}date`]; // date
                                                        let status = item[`${items}${iApp}bit`]; //bit
                                                        let pending = item[`${items}${iApp}SumDate`];
                                                        let pendingDay = item[`${items}${iApp}SumDate`]; //sumdate
                                                        let namePending = item[`${items}${iApp}namepending`];
                                                        let holdDay = item[`${items}${iApp}HoldDate`];


                                                        if (pendingDay > 0) {
                                                            pendingDay = 'Pending' + '  ' + item[`${items}${iApp}SumDate`] + '  ' + 'Day'; //sumdate
                                                        }
                                                        else {
                                                            pendingDay = ""
                                                        }

                                                        if (holdDay > 0) {
                                                            holdDay = <p style={{ fontSize: '10px', color: 'blue' }}>{item[`${items}${iApp}HoldDate`] + '  ' + 'Day'}</p>
                                                        }
                                                        else {
                                                            if (status == "F") {
                                                                holdDay = <p style={{ fontSize: '10px', color: '#7e8af5f0' }}>{"Less than 1 day"}</p>
                                                            }
                                                            else {
                                                                holdDay = "";
                                                            }
                                                        }


                                                        let alertHold = "";
                                                        let color = 'rgb(254 253 239)';
                                                        if (status == 'F') {
                                                            if (['sqc', 'qc'].includes(items)) {
                                                                color = 'rgb(44 255 171)';
                                                            }
                                                        }

                                                        else {
                                                            color = 'rgb(254 253 239)'
                                                        }

                                                        let icon = '';
                                                        if (status == "F" || status == "R") {
                                                            if (iApp == "received" || iApp == "issued" || iApp == "check") {
                                                                icon = <IoArrowForward style={{ color: "rgb(28 3 217)" }} />
                                                            }
                                                            else {
                                                                icon = <IoArrowForward style={{ color: "rgb(147 12 158)" }} />
                                                            }
                                                        }

                                                        let colorPendingDate = 'rgb(54 145 245)'

                                                        if (pending >= 3) {
                                                            colorPendingDate = 'red'
                                                        }
                                                        else {
                                                            colorPendingDate = 'rgb(54 145 245)'
                                                        }


                                                        iECR.app.push({
                                                            ecrno: item.ecrno,
                                                            name: name,
                                                            date: date,
                                                            status: status,
                                                            color: color,
                                                            title: iApp,
                                                            icon: icon,
                                                            pendingDay: pendingDay,
                                                            colorPendingDate: colorPendingDate,
                                                            namePedning: namePending,
                                                            holdDay: holdDay,
                                                            alertHold: alertHold,
                                                            returnSec: (returnSec.toUpperCase() == items.toUpperCase() && iApp == 'issued') ? 1 : 0,
                                                            holdSec: (holdSec.toUpperCase() == items.toUpperCase() && iApp == 'issued') ? 1 : 0,
                                                            sendDIL: item.sendDIL,
                                                        });
                                                    });


                                                    oEcr.push(iECR);

                                                });


                                                oCols2.map((items, idx) => { // Section
                                                    let iECR = {
                                                        key: items, app: []
                                                    }

                                                    oApps2.map((iApp, idxx) => { // Step
                                                        let name = item[`${items}${iApp}by`]; // by
                                                        let date = item[`${items}${iApp}date`]; // date
                                                        let status = item[`${items}${iApp}bit`]; //bit
                                                        let pending = item[`${items}${iApp}SumDate`];
                                                        let pendingDay = item[`${items}${iApp}SumDate`]; //sumdate
                                                        let namePending = item[`${items}${iApp}namepending`];
                                                        let holdDay = item[`${items}${iApp}HoldDate`];


                                                        if (pendingDay > 0) {
                                                            pendingDay = 'Pending' + '  ' + item[`${items}${iApp}SumDate`] + '  ' + 'Day'; //sumdate
                                                        }
                                                        else {
                                                            pendingDay = ""
                                                        }

                                                        if (holdDay > 0) {
                                                            holdDay = <p style={{ fontSize: '10px', color: 'blue' }}>{item[`${items}${iApp}HoldDate`] + '  ' + 'Day'}</p>
                                                        }
                                                        else {
                                                            if (status == "F") {
                                                                holdDay = <p style={{ fontSize: '10px', color: '#7e8af5f0' }}>{"Less than 1 day"}</p>
                                                            }
                                                            else {
                                                                holdDay = "";
                                                            }
                                                        }


                                                        let alertHold = "";
                                                        let color = 'rgb(254 253 239)';

                                                        if (status == 'F') {
                                                            if (['dil_dd', 'dil_qc'].includes(items)) {
                                                                color = 'rgb(44 255 171)';
                                                            }
                                                        }
                                                        else {
                                                            color = 'rgb(254 253 239)'
                                                        }




                                                        let icon = '';
                                                        if (status == "F" || status == "R") {
                                                            if (iApp == "received" || iApp == "issued" || iApp == "check") {
                                                                icon = <IoArrowForward style={{ color: "rgb(28 3 217)" }} />
                                                            }
                                                            else {
                                                                icon = <IoArrowForward style={{ color: "rgb(147 12 158)" }} />
                                                            }
                                                        }

                                                        let colorPendingDate = 'rgb(54 145 245)'

                                                        if (pending >= 3) {
                                                            colorPendingDate = 'red'
                                                        }
                                                        else {
                                                            colorPendingDate = 'rgb(54 145 245)'
                                                        }


                                                        iECR.app.push({
                                                            ecrno: item.ecrno,
                                                            name: name,
                                                            date: date,
                                                            status: status,
                                                            color: color,
                                                            title: iApp,
                                                            icon: icon,
                                                            pendingDay: pendingDay,
                                                            colorPendingDate: colorPendingDate,
                                                            namePedning: namePending,
                                                            holdDay: holdDay,
                                                            alertHold: alertHold,
                                                            returnSec: (returnSec.toUpperCase() == items.toUpperCase() && iApp == 'issued') ? 1 : 0,
                                                            holdSec: (holdSec.toUpperCase() == items.toUpperCase() && iApp == 'issued') ? 1 : 0,
                                                            sendDIL: item.sendDIL,
                                                        });
                                                    });


                                                    oEcr.push(iECR);

                                                });


                                                oCols3.map((items, idx) => { // Section
                                                    let iECR = {
                                                        key: items, app: []
                                                    }

                                                    oApps3.map((iApp, idxx) => { // Step
                                                        let name = item[`${items}${iApp}by`]; // by
                                                        let date = item[`${items}${iApp}date`]; // date
                                                        let status = item[`${items}${iApp}bit`]; //bit
                                                        let pending = item[`${items}${iApp}SumDate`];
                                                        let pendingDay = item[`${items}${iApp}SumDate`]; //sumdate
                                                        let namePending = item[`${items}${iApp}namepending`];
                                                        let holdDay = item[`${items}${iApp}HoldDate`];


                                                        if (pendingDay > 0) {
                                                            pendingDay = 'Pending' + '  ' + item[`${items}${iApp}SumDate`] + '  ' + 'Day'; //sumdate
                                                        }
                                                        else {
                                                            pendingDay = ""
                                                        }

                                                        if (holdDay > 0) {
                                                            holdDay = <p style={{ fontSize: '10px', color: 'blue' }}>{item[`${items}${iApp}HoldDate`] + '  ' + 'Day'}</p>
                                                        }
                                                        else {
                                                            if (status == "F") {
                                                                holdDay = <p style={{ fontSize: '10px', color: '#7e8af5f0' }}>{"Less than 1 day"}</p>
                                                            }
                                                            else {
                                                                holdDay = "";
                                                            }
                                                        }


                                                        let alertHold = "";
                                                        let color = 'rgb(254 253 239)';
                                                        if (status == 'F') {
                                                            if (['qa'].includes(items)) {
                                                                color = 'rgb(44 255 171)';
                                                            }
                                                        }

                                                        else {
                                                            color = 'rgb(254 253 239)'
                                                        }

                                                        let icon = '';
                                                        if (status == "F" || status == "R") {
                                                            if (iApp == "received" || iApp == "issued" || iApp == "check") {
                                                                icon = <IoArrowForward style={{ color: "rgb(28 3 217)" }} />
                                                            }
                                                            else {
                                                                icon = <IoArrowForward style={{ color: "rgb(147 12 158)" }} />
                                                            }
                                                        }

                                                        let colorPendingDate = 'rgb(54 145 245)'

                                                        if (pending >= 3) {
                                                            colorPendingDate = 'red'
                                                        }
                                                        else {
                                                            colorPendingDate = 'rgb(54 145 245)'
                                                        }


                                                        iECR.app.push({
                                                            ecrno: item.ecrno,
                                                            name: name,
                                                            date: date,
                                                            status: status,
                                                            color: color,
                                                            title: iApp,
                                                            icon: icon,
                                                            pendingDay: pendingDay,
                                                            colorPendingDate: colorPendingDate,
                                                            namePedning: namePending,
                                                            holdDay: holdDay,
                                                            alertHold: alertHold,
                                                            returnSec: (returnSec.toUpperCase() == items.toUpperCase() && iApp == 'issued') ? 1 : 0,
                                                            holdSec: (holdSec.toUpperCase() == items.toUpperCase() && iApp == 'issued') ? 1 : 0,
                                                            sendDIL: item.sendDIL,
                                                        });
                                                    });


                                                    oEcr.push(iECR);

                                                });




                                                var status = ''
                                                let lSec = '';
                                                sectionArray.filter((vSec, iSec) => {
                                                    if (vSec == "DIL_DD") {
                                                        lSec = "DIL";
                                                    }
                                                    else if (vSec == "DIL_QC") {
                                                        lSec = "DIL";
                                                    }
                                                    else {
                                                        lSec = vSec;
                                                    }

                                                    status = item[`${lSec.toLowerCase()}_status`] == 'U' ? (status == '' ? lSec : status) : status;
                                                });


                                                let targetDate = item.targetDate;

                                                let colorTargetDate = 'ghostwhite'
                                                if (targetDate >= 0 && targetDate <= 14) {
                                                    colorTargetDate = 'red'
                                                }
                                                else if (targetDate >= 15 && targetDate <= 21) {
                                                    colorTargetDate = 'yellow'
                                                }
                                                else {
                                                    colorTargetDate = 'ghostwhite'
                                                }


                                                let AlertDuedate = item.targetDate;
                                                let datealertDuedate = "";
                                                if (AlertDuedate >= 1) {
                                                    datealertDuedate = <p className='pulse' style={{ color: 'red', fontWeight: '500', fontSize: '16px' }}>OVER {AlertDuedate} วัน</p>;
                                                }
                                                else if (AlertDuedate == 0 && item.strClass != "D") {
                                                    datealertDuedate = <p style={{ color: 'yellow' }}>DUEDATE {AlertDuedate} วัน</p>;
                                                }
                                                else if (AlertDuedate == 0 && item.strClass == "D") {
                                                    datealertDuedate = <p style={{ color: 'yellow' }}>Waiting Due Date</p>;
                                                }
                                                else if (AlertDuedate < -0) {
                                                    datealertDuedate = <p>REMAIN {AlertDuedate * -1} วัน</p>;
                                                }


                                                let lcount = "";

                                                if (item.count > 0) {
                                                    lcount = <span className='hithere content' >{item.count}</span>;
                                                }
                                                else {
                                                    lcount = "";
                                                }

                                                // if (item.counthold > 0) {
                                                //     lcount = <span className='hithere content' >{item.counthold}</span>;
                                                // }
                                                // else {
                                                //     lcount = "";
                                                // }

                                                let HoldTotal = item.hOLDDATETOTAL;


                                                return <tr style={{ backgroundColor: (item.counthold > 0 ? 'yellow' : '') }}>
                                                    <td className='headcol' style={{ fontSize: '16px', padding: '8px' }}><nobr>{item.dueDate}<br></br><p style={{ fontSize: '14px', color: 'rgb(94 66 201)', marginBottom: '1px' }}>{datealertDuedate}</p></nobr></td>
                                                    <td>
                                                        <p style={{ padding: '8px', marginBottom: '-1px', fontSize: '14px' }}>{(status != '' ? status : 'FINISH')}</p>
                                                        <p className='pulse' style={{ color: '#f1720de6' }}>{(item.counthold > 0 ? 'HOLD' : '')}</p>
                                                    </td>
                                                    <td>
                                                        <p style={{ padding: '8px', marginBottom: '-1px', fontSize: '14px' }}>{item.hOLDTOSECTION}</p>
                                                        <p style={{ fontSize: '12px' }}>{(HoldTotal != 0 ? "(" + HoldTotal + " " + "Day" + ")" : "")}</p>
                                                    </td>
                                                    <td>
                                                        <Link underline="hover">
                                                            <center><FcFinePrint style={{ width: '35px', height: '28px' }} onClick={() => handleShowDetail(item.ecrno)} /></center>
                                                        </Link>
                                                        {/* <Link underline="hover">
                                            <center><FcOk style={{ width: '35px', height: '45px' }} onClick={() => handleShowDetail(item.ecrno)} /></center>
                                        </Link> */}
                                                    </td>
                                                    <td style={{ fontSize: '13px', padding: '8px' }}>{item.notificationNo}</td>
                                                    <td style={{ fontSize: '13px', padding: '8px' }}><nobr>{item.partNo.substring(0, 25)}</nobr></td>
                                                    <td style={{ fontSize: '13px', padding: '8px' }}>{item.strClass}</td>
                                                    <td style={{ fontSize: '13px', padding: '8px' }}>{item.ecrno}</td>
                                                    <td style={{ fontSize: '13px', padding: '8px' }}><nobr>{item.title.substring(0, 30)}</nobr></td>
                                                    <td>
                                                        <FcSearch style={{
                                                            width: '28px', height: '25px'
                                                        }} onClick={() => {
                                                            setEcrnoSelected(item)
                                                            setOpenModalTitle(true);
                                                        }} />
                                                    </td>
                                                    <td style={{ fontSize: '14px', padding: '8px' }}>
                                                        {
                                                            showSection(item.section)
                                                        }
                                                    </td>
                                                    <td>
                                                        <FcLink style={{
                                                            width: '30px', height: '25px'
                                                        }} onClick={() => {
                                                            setEcrnoSelected(item)
                                                            setOpenAttrFile(true);
                                                        }} />
                                                    </td>
                                                    <td>
                                                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row-reverse' }}>
                                                            {lcount}
                                                            <center>
                                                                <FcSms style={{
                                                                    width: '28px', height: '25px'
                                                                }} onClick={() => {
                                                                    setEcrnoSelected(item)
                                                                    setOpenModalChat(true);
                                                                }} />
                                                            </center>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <Button style={{ backgroundColor: 'white', borderColor: 'white' }} onClick={() => PrintECR(item.ecrno)}> <FcPrint style={{
                                                            width: '26px', height: '26px'
                                                        }} />
                                                        </Button>
                                                        <Link id='linkprint' to={`/ECR/PrintPage/${item.ecrno}`} target="_blank">
                                                        </Link>
                                                    </td>



                                                    <td>
                                                        <Badge.Ribbon text={item.sectionAssigned} color="volcano" >
                                                        </Badge.Ribbon>
                                                        <nobr style={{ color: 'white' }} > {item.sectionAssigned}</nobr>
                                                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row-reverse' }}>
                                                            <center>
                                                                <FcAssistant style={{
                                                                    width: '30px', height: '44px'
                                                                }} onClick={() => {
                                                                    setEcrnoSelected(item)
                                                                    setOpenModalAssigned(true);
                                                                }}
                                                                />
                                                            </center>
                                                        </div>
                                                    </td>


                                                    {
                                                        oEcr.map((vSec, iSec) => {
                                                            return <>
                                                                {
                                                                    (vSec.key == "dil_dd" || vSec.key == "dil_qc") ? <>
                                                                        {
                                                                            vSec.app.map((vApp, iApp) => {
                                                                                return vApp.sendDIL == "NO NEED" ? <td style={{ backgroundColor: vApp.color, width: '30px' }}><p style={{
                                                                                    color: '#5e1fdf', fontWeight: '700'
                                                                                }}>NO NEED</p></td>
                                                                                    :
                                                                                    <td style={{ backgroundColor: vApp.returnSec == 1 ? 'yellow' : vApp.holdSec == 1 ? 'yellow' : vApp.color, width: '30px' }}>
                                                                                        <div style={{ fontSize: '11px ', height: '50px', justifyContent: 'center', alignItems: 'center', width: '90px', marginTop: '10px' }}>
                                                                                            <div>
                                                                                                {vApp.name}  <span>{(vApp.status == "R") && <span className='Waiting gelatine'></span>}</span>
                                                                                            </div>
                                                                                            <div style={{ fontSize: '10px' }}>
                                                                                                {vApp.date}
                                                                                            </div>
                                                                                            <div>
                                                                                                {vApp.holdDay}
                                                                                            </div>
                                                                                            <div style={{ color: vApp.colorPendingDate, fontSize: '11px', fontWeight: '700' }}>  {vApp.pendingDay}
                                                                                            </div>
                                                                                            <div style={{ color: 'rgb(101 93 192)' }}>  {vApp.namePedning}</div>
                                                                                        </div>
                                                                                    </td>
                                                                            })
                                                                        }
                                                                    </>
                                                                        :
                                                                        <>
                                                                            {
                                                                                vSec.app.map((vApp, iApp) => {
                                                                                    return <td style={{ backgroundColor: vApp.returnSec == 1 ? 'yellow' : vApp.holdSec == 1 ? 'yellow' : vApp.color, width: '30px' }}>
                                                                                        <div style={{ fontSize: '11px ', height: '50px', justifyContent: 'center', alignItems: 'center', width: '90px', marginTop: '10px' }}>
                                                                                            <div>
                                                                                                {vApp.name}  <span>{(vApp.status == "R") && <span className='Waiting gelatine'></span>}</span>
                                                                                            </div>
                                                                                            <div style={{ fontSize: '10px' }}>
                                                                                                {vApp.date}
                                                                                            </div>
                                                                                            <div>
                                                                                                {vApp.holdDay}
                                                                                            </div>
                                                                                            <div style={{ color: vApp.colorPendingDate, fontSize: '11px', fontWeight: '700' }}>  {vApp.pendingDay}
                                                                                            </div>
                                                                                            <div style={{ color: 'rgb(101 93 192)' }}>  {vApp.namePedning}</div>
                                                                                        </div>
                                                                                    </td>
                                                                                })
                                                                            }
                                                                        </>
                                                                }
                                                            </>
                                                        })
                                                    }
                                                </tr >
                                            })
                                        }
                                    </tbody >
                                </table>
                            </div>
                        }
                        </> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    }
                </>
            }




            <div style={{ display: 'none' }}>
                {/* <div> */}
                <table className='tbExportExcel' ref={tableRef}>
                    <tbody>
                        <tr>
                            <th>TARGET</th>
                            <th>DCS NO</th>
                            <th>DRAWING</th>
                            <th>CLASS</th>
                            <th>ECR NO</th>
                            <th>TITLE</th>
                            <th>SECTION CREATE</th>
                            <th>PENDING DAY</th>
                        </tr>
                        {
                            getdata?.map((iData, oData) => {
                                let oCols = ['cre', 'pu', 'dd', 'en', 'sqc', 'qc', 'dil_dd', 'dil_qc', 'qa'];
                                let oApps = ['received', 'issued', 'check', 'approved'];
                                let pendingDayToExcel = '';
                                oCols.map((items, idx) => { // Section
                                    oApps.map((iApp, idxx) => { // Step
                                        let status = iData[`${items}${iApp}bit`]; //bit
                                        pendingDayToExcel = iData[`${items}${iApp}SumDate`]; //sumdate
                                        // let namePending = iData[`${items}${iApp}namepending`];


                                        if (pendingDayToExcel > 0) {
                                            pendingDayToExcel = iData[`${items}${iApp}SumDate`]; //sumdate
                                        }
                                        else {
                                            pendingDayToExcel = 0;
                                        }
                                    });
                                });
                                return <tr>
                                    <td>{iData.dueDate != "" ? iData.dueDate : "Waiting Due Date"}</td>
                                    <td>{iData.notificationNo}</td>
                                    <td>{iData.partNo}</td>
                                    <td>{iData.strClass}</td>
                                    <td>{iData.ecrno}</td>
                                    <td>{iData.title}</td>
                                    <td>{iData.section}</td>
                                    <td></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>

            </div>

        </div >

        <ModelAttachFile
            show={openAttrFile}
            close={setOpenAttrFile}
            item={ecrnoSelected}
            section={section}
        />

        <FormCreate
            show={openModalCreate}
            close={setOpenModalCreate}
            refresh={getSearch}
            section={permission[0]?.grpRoleSect}
        />


        <FormModalDetail
            ecrno={ecrnoSelected}
            show={openModalDetail}
            close={setOpenModalDetail}
            refresh={getSearch}
            statusCreateAppBit={statusCreateAppBit[0]?.createapproved}
        />


        <Chat
            show={openModalChat}
            close={setOpenModalChat}
            item={ecrnoSelected}
        />


        <FullTitle
            show={openModalTitle}
            close={setOpenModalTitle}
            item={ecrnoSelected}
        />

        <MGR_Assigned
            show={openModelAssigned}
            close={setOpenModalAssigned}
            item={ecrnoSelected}
        />
    </>
    )
}


export default Createform