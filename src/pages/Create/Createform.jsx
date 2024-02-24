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
import { FcFinePrint, FcPrint, FcSms, FcDocument } from "react-icons/fc";
import { LegendToggleOutlined } from '@mui/icons-material';


function Createform() {
    const navigate = useNavigate();

    //const section = localStorage.getItem("section");
    // const section = Cookies.get('section')
    const section = Cookies.get('section')
    const [openAttrFile, setOpenAttrFile] = useState(false);
    const [openModalChat, setOpenModalChat] = useState(false);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [ecrnoSelected, setEcrnoSelected] = useState('');
    const [statusCreateAppBit, setStatusCreateAppBit] = useState('');
    const permission = useSelector((state) => state.reducer.permission);
    const permissionActive = useSelector((state) => state.reducer.permissionActive);
    const [selectStatus, setselectStatus] = useState("0");
    const [strClass, setStrClass] = useState('ALL');
    const [ECRNo, setECRNO] = useState('');
    const [Title, setTitle] = useState('');
    const [Model, setModel] = useState('');
    const [PartName, setPartName] = useState('');
    const [DrawingNo, setDrawingNo] = useState('');
    const [BRNo, setBRNO] = useState('');





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
    }, [])


    function loadPage() {
        getDataSrvHD.getECRListLoad(selectSection, selectStatus).then((res) => {
            try {
                setGetdata(res.data)
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

    const [selectSection, setSelectSection] = useState(grp(permission[0]?.grpRoleSect));


    const handleChange = (event) => {
        setSelectSection(event.target.value);
    };


    const handleChangeStatus = (event) => {
        setselectStatus(event.target.value);
    };


    const handleChangeClass = (event) => {
        setStrClass(event.target.value);
    };

    //****************************END ddl Status ************ */



    //**************************** BUTTON SEARCH ************ */
    // ส่ง DocNo กับ Status ไป API
    const [DocNo, setDocNo] = useState(('%'));
    const getSearch = (event) => {
        getDataSrvHD.postECRList({ section: selectSection, ecrno: ECRNo, title: Title, model: Model, partName: PartName, drawingNo: DrawingNo, brno: BRNo, status: selectStatus, strclass: strClass }).then((res) => {
            try {
                setGetdata(res.data)
                // console.log(res.data)
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
    const sectionArray = ['CREATE', 'PU', 'DD', 'EN', 'SQC', 'QC', 'DIL', 'QA']
    const sectionArrayAll = ['ALL', 'CREATE', 'PU', 'DD', 'EN', 'SQC', 'QC', 'DIL', 'QA']
    const classArray = ['ALL', 'CLASS A', 'CLASS B', 'CLASS C', 'CLASS D', 'CLASS E']


    return (<>
        <div className='stylePagee'>
            <div class="card ">
                <h5 class="card-header bg-info text-white border-0">ค้นหา เอกสาร ECR</h5>  {/* 😉🤣😍😒😁🤞👏💋🌹🎂✔🤳💖😢😎🎶🤳💕 */}
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-auto">
                            <label for="colFormLabelSm" >Section :</label>
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
                        <div class="row justify-content-md-center">
                            <div class="col col-lg-2">
                            </div>
                            <div class="col-md-auto">
                                <button type="submit" class="btn btn-primary" onClick={getSearch}>Search</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {
                                    permission.filter((item) => {
                                        return item.menuCode == "BTN0001" && item.rolE_VIEW == "True"
                                    }).length ? <Button variant="success" onClick={handleShow}>สร้างเอกสาร ECR ใหม่</Button>
                                        :
                                        ""
                                }
                            </div>
                            <div class="col col-lg-2">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>

            <div class="row">
                <div class="col-md-8">
                </div>
                <div class="col-md-4">
                    {/* <span><b>R</b> = Receive</span> &nbsp;&nbsp;&nbsp;
                    <span><b>I</b> = Issued</span> &nbsp;&nbsp;&nbsp;
                    <span><b>C</b> = Checked</span> &nbsp;&nbsp;&nbsp;
                    <span><b>A</b> = Approved</span> */}
                </div>
            </div>
            <br></br>
            <div style={{ overflowX: 'auto' }}>
                <table className='tableCreateform'>
                    <thead>
                        <tr>
                            <th colSpan={12} style={{ fontSize: '25px' }}>Detail</th>
                            <th colSpan={36} style={{ fontSize: '25px' }}>Actual Process</th>
                        </tr>
                        <tr>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(7 107 173)', width: '6%', fontSize: '14px' }}>TARGET</th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(7 107 173)', width: '6%', fontSize: '14px' }}>STATUS</th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(7 107 173)', fontSize: '14px', padding: '8px' }}>REVISE ECR<br></br><nobr>(For Issuer only)</nobr></th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(7 107 173)', fontSize: '14px' }}>DCS NO</th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(7 107 173)', fontSize: '14px' }}>DRAWING</th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(7 107 173)', fontSize: '14px', padding: '8px' }}>CLASS</th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(7 107 173)', fontSize: '14px' }}>ECR No</th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(7 107 173)', width: '400px', fontSize: '14px' }}>TITLE</th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(7 107 173)', fontSize: '14px', padding: '8px' }}>SECTION</th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(7 107 173)', fontSize: '14px', padding: '8px' }}>ATTACHED FILE</th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(7 107 173)', width: '200px', fontSize: '14px', padding: '8px' }}>COMMENT</th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(7 107 173)', fontSize: '14px' }}>PRINT</th>
                            <th colSpan={4} rowSpan={2} style={{ color: 'white', backgroundColor: 'rgb(7 107 173)', fontSize: '14px' }}>CREATE</th>
                            <th colSpan={4} rowSpan={2} style={{ color: 'white', backgroundColor: 'rgb(7 107 173)', fontSize: '14px' }}>PU</th>
                            <th colSpan={4} rowSpan={2} style={{ color: 'white', backgroundColor: 'rgb(7 107 173)', fontSize: '14px' }}>DD</th>
                            <th colSpan={4} rowSpan={2} style={{ color: 'white', backgroundColor: 'rgb(7 107 173)', fontSize: '14px' }}>EN</th>
                            <th colSpan={4} rowSpan={2} style={{ color: 'white', backgroundColor: 'rgb(7 107 173)', fontSize: '14px' }}>SQC</th>
                            <th colSpan={4} rowSpan={2} style={{ color: 'white', backgroundColor: 'rgb(7 107 173)', fontSize: '14px' }}>QC</th>
                            <th colSpan={8} style={{ color: 'white', backgroundColor: 'rgb(7 107 173)', fontSize: '14px' }}>SENT TO DIL</th>
                            <th colSpan={4} rowSpan={2} style={{ color: 'white', backgroundColor: 'rgb(7 107 173)', fontSize: '14px' }}>QA</th>
                        </tr>

                        <tr colSpan={20} style={{ color: 'white', backgroundColor: 'rgb(7 107 173)', fontSize: '14px' }}>
                            {/* <th>Attached file</th>
                            <th>Comment</th>
                            <th>Print</th> */}
                            <th colSpan={4}>(DIL Design Section)</th>
                            <th colSpan={4}>(DIL Quality Control Section)</th>
                        </tr>


                        <tr style={{ color: 'white', backgroundColor: 'rgb(7 107 173)', fontSize: '14px' }}>
                            <th>Received</th>
                            <th>Issued</th>
                            <th>Checked</th>
                            <th>Approved</th>

                            <th>Received</th>
                            <th>Issued</th>
                            <th>Checked</th>
                            <th>Approved</th>

                            <th>Received</th>
                            <th>Issued</th>
                            <th>Checked</th>
                            <th>Approved</th>

                            <th>Received</th>
                            <th>Issued</th>
                            <th>Checked</th>
                            <th>Approved</th>

                            <th>Received</th>
                            <th>Issued</th>
                            <th>Checked</th>
                            <th>Approved</th>

                            <th>Received</th>
                            <th>Issued</th>
                            <th>Checked</th>
                            <th>Approved</th>

                            <th>Received</th>
                            <th>Issued</th>
                            <th>Checked</th>
                            <th>Approved</th>
                            <th>Received</th>
                            <th>Issued</th>
                            <th>Checked</th>
                            <th>Approved</th>

                            <th>Received</th>
                            <th>Issued</th>
                            <th>Checked</th>
                            <th>Approved</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getdata?.map((item, index) => {  // ข้อมูลใหญ่
                                let oCols = ['cre', 'pu', 'dd', 'en', 'sqc', 'qc', 'dil_dd', 'dil_qc', 'qa'];
                                let oApps = ['received', 'issued', 'check', 'approved'];
                                let oEcr = [];
                                oCols.map((items, idx) => { // Section
                                    let iECR = {
                                        key: items, app: []
                                    }
                                    oApps.map((iApp, idxx) => { // Step
                                        let name = item[`${items}${iApp}by`]; // by
                                        let date = item[`${items}${iApp}date`]; // date
                                        let status = item[`${items}${iApp}bit`]; //bit
                                        let hold = item[`${items}${iApp}SumDate`];
                                        let holdDate = item[`${items}${iApp}SumDate`]; //sumdate
                                        let namePending = item[`${items}${iApp}namepending`];

                                        console.log(name)
                                        if (holdDate > 0) {
                                            holdDate = 'Pending' + '  ' + item[`${items}${iApp}SumDate`] + '  ' + 'Day'; //sumdate
                                        }
                                        else {
                                            holdDate = ""
                                        }

                                        let color = 'rgb(254 253 239)';
                                        if (status == 'F') {
                                            if (items == 'cre') {
                                                color = 'rgb(44 255 171)';
                                            }
                                            else if (items == 'pu') {
                                                color = 'rgb(44 255 171)';
                                            }
                                            else if (items == 'dd') {
                                                color = 'rgb(44 255 171)';
                                            }
                                            else if (items == 'en') {
                                                color = 'rgb(44 255 171)';
                                            }
                                            else if (items == 'sqc') {
                                                color = 'rgb(44 255 171)';
                                            }
                                            else if (items == 'qc') {
                                                color = 'rgb(44 255 171)';
                                            }
                                            else if (items == 'dil_dd' || items == 'dil_qc') {
                                                color = 'rgb(44 255 171)';
                                            }
                                            else if (items == 'qa') {
                                                color = 'rgb(44 255 171)';
                                            }
                                        } else if (status == 'R') {
                                            color = 'red'
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

                                        let colorHoldDate = 'rgb(54 145 245)'

                                        if (hold >= 3) {
                                            colorHoldDate = 'red'
                                        }
                                        else {
                                            colorHoldDate = 'rgb(54 145 245)'
                                        }



                                        iECR.app.push({
                                            name: name,
                                            date: date,
                                            status: status,
                                            color: color,
                                            title: iApp,
                                            icon: icon,
                                            holdDate: holdDate,
                                            colorHoldDate: colorHoldDate,
                                            namePedning: namePending,
                                        });
                                    });
                                    oEcr.push(iECR);

                                });

                                var status = ''
                                sectionArray.filter((vSec, iSec) => {
                                    status = item[`${vSec.toLowerCase()}_status`] == 'U' ? (status == '' ? vSec : status) : status;
                                });


                                let targetDate = item.targetDate;
                                let AlertDuedate = item.targetDate;

                                console.log(targetDate)
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


                                let datealertDuedate = "";
                                if (AlertDuedate >= 1) {
                                    datealertDuedate = `OVER` + " " + AlertDuedate + " วัน";
                                }
                                else if (AlertDuedate == 0) {
                                    datealertDuedate = `DUEDATE` + " " + AlertDuedate + " วัน";
                                }
                                else if (AlertDuedate < -0) {
                                    datealertDuedate = `REMAIN` + " " + AlertDuedate + " วัน";
                                }


                                return <tr>
                                    <td style={{ fontSize: '16px', padding: '8px', backgroundColor: (targetDate ? colorTargetDate : 'red') }}><nobr>{item.dueDate}<br></br><p style={{ fontSize: '14px', color: '#fcd83e', marginBottom: '1px' }}>{datealertDuedate}</p></nobr></td>
                                    <td style={{ backgroundColor: (status != '' ? '#ffffa0' : 'rgb(72 229 23)') }}><p style={{ padding: '8px', marginBottom: '-1px', color: (status != '' ? 'red' : 'rgb(60 3 255)') }}>{(status != '' ? status : 'FINISH')}</p>
                                    </td>
                                    <td>
                                        <Link underline="hover">
                                            <center><FcFinePrint style={{ width: '35px', height: '45px' }} onClick={() => handleShowDetail(item.ecrno)} /></center>
                                        </Link>
                                    </td>
                                    <td style={{ fontSize: '14px', padding: '8px' }}>{item.notificationNo}</td>
                                    <td style={{ fontSize: '14px', padding: '8px' }}><nobr>{item.partNo}</nobr></td>
                                    <td style={{ fontSize: '14px', padding: '8px' }}>{item.strClass}</td>
                                    <td style={{ fontSize: '14px', padding: '8px' }}>{item.ecrno}</td>
                                    <td style={{ fontSize: '14px', padding: '8px', width: '400px' }}><nobr>{item.title}</nobr></td>
                                    <td style={{ fontSize: '14px', padding: '8px' }}>
                                        {
                                            showSection(item.section)
                                        }
                                    </td>
                                    <td>
                                        <FcDocument style={{
                                            width: '30px', height: '40px'
                                        }} onClick={() => {
                                            setEcrnoSelected(item)
                                            setOpenAttrFile(true);
                                        }} />
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row-reverse' }}>
                                            <span className='content'>{item.count}</span>
                                            <center>
                                                <FcSms style={{
                                                    width: '28px', height: '35px'
                                                }} onClick={() => {
                                                    setEcrnoSelected(item)
                                                    setOpenModalChat(true);
                                                }} />
                                            </center>
                                        </div>
                                    </td>

                                    <td>
                                        <Button style={{ backgroundColor: 'white', borderColor: 'white' }} onClick={() => PrintECR(item.ecrno)}> <FcPrint style={{
                                            width: '32px', height: '40px'
                                        }} />
                                        </Button>
                                        <Link id='linkprint' to={`/ECR/PrintPage/${item.ecrno}`} target="_blank">
                                        </Link>
                                    </td>
                                    {
                                        oEcr.map((vSec, iSec) => {
                                            return <>
                                                {
                                                    vSec.app.map((vApp, iApp) => {
                                                        return <td style={{ backgroundColor: vApp.color, width: '30px' }}>
                                                            {/* <div style={{ borderBottom: '1px solid black', fontWeight: 'bolder', height: '32px', width: '90px' }}>{vApp.title.substring(0, 1).toUpperCase()} {vApp.icon}</div> */}

                                                            <div style={{ fontSize: '11px ', height: '50px', justifyContent: 'center', alignItems: 'center', width: '90px', marginTop: '10px' }}>
                                                                <div>
                                                                    {vApp.name}
                                                                </div>
                                                                <div style={{ fontSize: '10px' }}>
                                                                    {vApp.date}
                                                                </div>
                                                                <div style={{ color: vApp.colorHoldDate, fontSize: '11px', fontWeight: '700' }}>  {vApp.holdDate}
                                                                </div>
                                                                <div style={{ color: 'rgb(101 93 192)' }}>  {vApp.namePedning}</div>
                                                            </div>
                                                        </td>
                                                    })
                                                }
                                            </>
                                        })
                                    }
                                </tr>
                            })
                        }
                    </tbody >
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
            refresh={loadPage}
            section={permission[0]?.grpRoleSect}
        />


        <FormModalDetail
            show={openModalDetail}
            close={setOpenModalDetail}
            ecrno={ecrnoSelected}
            refresh={loadPage}
            statusCreateAppBit={statusCreateAppBit[0]?.createapproved}
        />


        <Chat
            show={openModalChat}
            close={setOpenModalChat}
            item={ecrnoSelected}
        />
    </>
    )
}


export default Createform