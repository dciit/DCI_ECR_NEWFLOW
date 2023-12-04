import React, { useEffect, useRef, useState } from 'react'
import getDataSrvHD from '../../service/getServiceHeader.js'
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
    const [selectSection, setSelectSection] = useState(permission[0]?.grpRoleSect);

    const [ECRNo, setECRNO] = useState('');
    const [Title, setTitle] = useState('');
    const [Model, setModel] = useState('');
    const [PartName, setPartName] = useState('');
    const [DrawingNo, setDrawingNo] = useState('');
    const [BRNo, setBRNO] = useState('');


    const IconCheck = (val) => {
        var icon = '';
        if (val == 'U') {
            icon = <IoHourglassOutline style={{ color: "rgb(237 180 34)", fontSize: "30px" }} />
        } else if (val == 'F' || val != '') {
            icon = <IoShieldCheckmark style={{ color: "#11c045", fontSize: "30px" }} />
        } if (val == 'R') {
            icon = <IoArrowBackCircleSharp style={{ color: "rgb(248 6 23)", fontSize: "33px" }} />
        }
        return icon;
    }

    const PrintECR = (ecrno) => {
        // let link = document.getElementById('linkprint');
        // let href = useHref('./ECR/home');
        // console.log(href)
        // window.open(href, '_blank');
        //  navigate(`/ECR/Print/${ecrno}`);
        // window.open(`/ECR/PrintPage/${ecrno}`, "_blank")
        navigate(`/ECR/PrintPage/${ecrno}`,
        );
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
        getDataSrvHD.getECRListLoad(selectSection).then((res) => {
            try {
                setGetdata(res.data)
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
        // getDataSrvHD.getECRList(DocNo, selectSection).then((res) => {
        //     try {
        //         setGetdata(res.data)
        //     }
        //     catch (error) {
        //         console.log(error);
        //         return error;
        //     }
        // });
    }


    //// **************DAILOG DETAIL  *************************
    const handleCloseDetail = () => setShowDetail(false);


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
    const grpSection = (val) => {
        var varGrpSection = '';

        if (val == 'ADMIN') {
            varGrpSection = "CREATE"
        }
        else {
            varGrpSection = permission[0]?.grpRoleSect;
        }
        return varGrpSection;
    }

    const [ddlStatus, setddlStatus] = useState(grpSection(permission[0]?.grpRoleSect));


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
            varGrp = "0"
        }
        else if (val == 'PU') {
            varGrp = "1"
        }
        else if (val == 'DD') {
            varGrp = "2"
        }
        else if (val == 'EN') {
            varGrp = "3"
        }
        else if (val == 'SQC') {
            varGrp = "4"
        }
        else if (val == 'QC') {
            varGrp = "5"
        }
        else if (val == 'DIL') {
            varGrp = "6"
        }
        else if (val == 'QA') {
            varGrp = "7"
        }
        else {
            varGrp = '999'
        }
        return varGrp;
    }


    const [indexddlStatus, setindexddlStatus] = useState(grp(ddlStatus));
    const [buffIndexSection, setBuffIndexSection] = useState(grp(ddlStatus));
    const handleChange = (event) => {
        setSelectSection(event.target.value);
    };
    //****************************END ddl Status ************ */



    //**************************** BUTTON SEARCH ************ */
    // ส่ง DocNo กับ Status ไป API
    const [DocNo, setDocNo] = useState(('%'));
    const getSearch = (event) => {
        getDataSrvHD.postECRList({ section: selectSection, ecrno: ECRNo, title: Title, model: Model, partName: PartName, drawingNo: DrawingNo, brno: BRNo }).then((res) => {
            try {
                setGetdata(res.data)
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });

        // getDataSrvHD.getECRList(DocNo, selectSection).then((res) => {
        //     try {
        //         setGetdata(res.data)
        //     }
        //     catch (error) {
        //         console.log(error);
        //         return error;
        //     }
        // });
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
    const stepArrat = ['receive', "issue", 'check', 'approve'];
    return (<>
        <div className='stylePagee'>
            <div class="card ">
                <h5 class="card-header bg-info text-white border-0">สร้างเอกสาร ECR</h5>  {/* 😉🤣😍😒😁🤞👏💋🌹🎂✔🤳💖😢😎🎶🤳💕 */}
                <div class="card-body">
                    <div class="row mb-3">
                        {/* <div class="col-1">Search :</div>
                        <div class="col-2">
                            <input type="text" class="form-control" onChange={(event) => handleChangeSearch(event.target.value)} />
                        </div> */}
                        <label for="colFormLabelSm" class="col-sm-1 col-form-label col-form-label-sm">Section :</label>
                        <div class="col-sm-2">
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small-label">Status</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    // value={buffIndexSection != '999' ? sectionArrayAll[buffIndexSection] : 'ALL'}
                                    value={selectSection}
                                    label="Status"
                                    onChange={handleChange}>
                                    {
                                        sectionArrayAll.map((item, index) =>
                                            <MenuItem value={item}>{item}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <div class="col-1">

                        </div>
                        <div class="col-4">
                        </div>

                        <div class="col-2">
                        </div>
                    </div>


                    <div class="row mb-3">
                        <label for="colFormLabelSm" class="col-sm-1 col-form-label col-form-label-sm">ECR No :</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control form-control-sm" id="colFormLabelSm" onChange={(event) => setECRNO(event.target.value)} />
                        </div>

                        <label for="colFormLabelSm" class="col-sm-1 col-form-label col-form-label-sm">Title :</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control form-control-sm" id="colFormLabelSm" onChange={(event) => setTitle(event.target.value)} />
                        </div>

                        <div class="col-sm-6">
                        </div>
                    </div>


                    <div class="row mb-3">
                        <label for="colFormLabelSm" class="col-sm-1 col-form-label col-form-label-sm">Model</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control form-control-sm" id="colFormLabelSm" onChange={(event) => setModel(event.target.value)} />
                        </div>

                        <label for="colFormLabelSm" class="col-sm-1 col-form-label col-form-label-sm">Part Name :</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control form-control-sm" id="colFormLabelSm" onChange={(event) => setPartName(event.target.value)} />
                        </div>
                        <div class="col-sm-9">
                        </div>
                    </div>


                    <div class="row mb-3">
                        <label for="colFormLabelSm" class="col-sm-1 col-form-label col-form-label-sm">Drawing No :</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control form-control-sm" id="colFormLabelSm" onChange={(event) => setDrawingNo(event.target.value)} />
                        </div>

                        <label for="colFormLabelSm" class="col-sm-1 col-form-label col-form-label-sm">BR No :</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control form-control-sm" id="colFormLabelSm" onChange={(event) => setBRNO(event.target.value)} />
                        </div>

                        <div class="col-sm-9">
                        </div>
                    </div>


                    <div class="row mb-3">
                        <div class="col-sm-2">

                        </div>

                        <div class="col-sm-1">
                            <button type="submit" class="btn btn-primary mb-2" onClick={getSearch}>Search</button>
                        </div>

                        <div class="col-sm-2">
                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0001" && item.rolE_VIEW == "True"
                                }).length ? <Button variant="primary" onClick={handleShow} >สร้างเอกสาร ECR ใหม่</Button>
                                    :
                                    ""
                            }
                        </div>

                        <div class="col-sm-9">
                        </div>
                    </div>


                </div>
            </div>
            <br></br>

            <div class="row">
                <div class="col-2">
                    จำนวนเอกสาร = <span style={{ color: 'blue' }}>{getdata[0]?.summary}</span>
                </div>
                <div class="col-4"></div>
                <div class="col-3"></div>
                <div class="col-3">
                    <span><b>R</b> = Receive</span> &nbsp;&nbsp;&nbsp;
                    <span><b>I</b> = Issued</span> &nbsp;&nbsp;&nbsp;
                    <span><b>C</b> = Checked</span> &nbsp;&nbsp;&nbsp;
                    <span><b>A</b> = Approved</span>
                </div>
            </div>
            <br></br>
            <div style={{ overflowX: 'auto' }}>
                <table className='tableCreateform'>
                    <thead>
                        <tr>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)', width: '6%' }}>On Process</th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}></th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>DocNo</th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)', width: '200px' }}>Title</th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>Section</th>
                            <th colSpan={3} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>Detail</th>
                            <th colSpan={4} rowSpan={2} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>CREATE</th>
                            <th colSpan={4} rowSpan={2} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>PU</th>
                            <th colSpan={4} rowSpan={2} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>DD</th>
                            <th colSpan={4} rowSpan={2} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>EN</th>
                            <th colSpan={4} rowSpan={2} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>SQC</th>
                            <th colSpan={4} rowSpan={2} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>QC</th>
                            <th colSpan={8} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>DIL</th>
                            <th colSpan={4} rowSpan={2} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>QA</th>
                        </tr>

                        <tr colSpan={20} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>
                            <th>File</th>
                            <th>Remark</th>
                            <th>Print</th>
                            <th colSpan={4}>(DIL Design Section)</th>
                            <th colSpan={4}>(DIL Quality Control Section)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getdata?.map((item, index) => {
                                let oCols = ['cre', 'pu', 'dd', 'en', 'sqc', 'qc', 'dil_dd', 'dil_qc', 'qa'];
                                let oApps = ['received', 'issued', 'check', 'approved'];
                                let oEcr = [];
                                oCols.map((items, idx) => {
                                    let iECR = {
                                        key: items, app: []
                                    }
                                    oApps.map((iApp, idxx) => {
                                        let name = item[`${items}${iApp}by`]; // by
                                        let date = item[`${items}${iApp}date`]; // date
                                        let status = item[`${items}${iApp}bit`]; //bit
                                        let hold = item[`${items}${iApp}SumDate`];
                                        let holdDate = item[`${items}${iApp}SumDate`]; //sumdate
                                        if (holdDate > 0) {
                                            holdDate = 'Pending' + '  ' + item[`${items}${iApp}SumDate`] + '  ' + 'Day'; //sumdate
                                        }
                                        else {
                                            holdDate = ""
                                        }

                                        let color = 'rgb(254 253 239)';
                                        if (status == 'F') {
                                            if (items == 'cre') {
                                                color = 'rgb(193 231 216)';
                                            }
                                            else if (items == 'pu') {
                                                color = 'rgb(155 246 210)';
                                            }
                                            else if (items == 'dd') {
                                                color = 'rgb(110 247 193)';
                                            }
                                            else if (items == 'en') {
                                                color = 'rgb(44 255 171)';
                                            }
                                            else if (items == 'sqc') {
                                                color = 'rgb(165 244 184)';
                                            }
                                            else if (items == 'qc') {
                                                color = 'rgb(178 251 166)';
                                            }
                                            else if (items == 'dil_dd' || items == 'dil_qc') {
                                                color = 'rgb(198 246 190)';
                                            }
                                            else if (items == 'qa') {
                                                color = '#CCFFCC';
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
                                                // icon = <IoArrowDown style={{ color: "rgb(28 3 217)" }} />
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
                                            colorHoldDate: colorHoldDate
                                        });
                                    });
                                    oEcr.push(iECR);

                                });

                                var status = ''
                                sectionArray.filter((vSec, iSec) => {
                                    status = item[`${vSec.toLowerCase()}_status`] == 'U' ? (status == '' ? vSec : status) : status;
                                });



                                return <tr>
                                    <td style={{ backgroundColor: (status != '' ? 'rgb(255 252 106)' : 'rgb(72 229 23)') }}><p style={{ color: (status != '' ? 'red' : 'rgb(60 3 255)') }}>{(status != '' ? status : 'FINISH')}</p>
                                    </td>
                                    {/* <td><center><Button variant="primary" onClick={() => handleShowDetail(item.ecrno)} >Report</Button></center> */}
                                    <td>
                                        <Link underline="hover">
                                            <center><FcFinePrint style={{ width: '35px', height: '45px' }} onClick={() => handleShowDetail(item.ecrno)} /></center>
                                        </Link>
                                    </td>
                                    <td style={{ fontSize: '12px' }}>{item.ecrno}</td>
                                    <td style={{ fontSize: '12px' }}>{item.title}</td>
                                    <td style={{ fontSize: '12px' }}>
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
                                        }} /></Button>
                                        <Link id='linkprint' to={`/ECR/PrintPage/${item.ecrno}`} target="_blank">
                                        </Link>
                                    </td>
                                    {
                                        oEcr.map((vSec, iSec) => {
                                            return <>
                                                {
                                                    vSec.app.map((vApp, iApp) => {
                                                        return <td style={{ backgroundColor: vApp.color }}>
                                                            <div style={{ borderBottom: '1px solid black', fontWeight: 'bolder', height: '32px', width: '90px' }}>{vApp.title.substring(0, 1).toUpperCase()} {vApp.icon}</div>

                                                            <div style={{ fontSize: '11px ', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
                                                                <br></br>
                                                                <div>
                                                                    {vApp.name}
                                                                </div>
                                                                <div style={{ fontSize: '10px' }}>
                                                                    {vApp.date}
                                                                </div>
                                                                <div style={{ color: vApp.colorHoldDate, fontSize: '10px', fontWeight: '700' }}>  {vApp.holdDate}</div></div>

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
            // onHide={setOpenAttrFile}
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
            // section={permission[0]?.grpRoleSect}
            // position={permission[0]?.grpRole}
            // step={permission[0]?.grpRole}
            statusCreateAppBit={statusCreateAppBit[0]?.createapproved}
        />


        <Chat
            show={openModalChat}
            // onHide={() => setOpenModalChat(false)}
            close={setOpenModalChat}
            item={ecrnoSelected}
        />
    </>
    )
}


export default Createform