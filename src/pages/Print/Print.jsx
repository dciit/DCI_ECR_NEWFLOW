import React, { useRef, useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import './Print.css';
import getREPORT from '../../service/getReport.js'
import { useParams } from 'react-router-dom';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
// const styles = StyleSheet.create({
//     page: {
//         flexDirection: 'row',
//         backgroundColor: '#E4E4E4'
//     },
//     section: {
//         margin: 10,
//         padding: 10,
//         flexGrow: 1
//     }
// });

function Print() {

    useEffect(() => {
        getTestParameter();
        // setTimeout(() => {
        //     var printContents = document.getElementById('AAA').innerHTML;
        //     var originalContents = document.body.innerHTML;

        //     // document.body.innerHTML = printContents;
        //     console.log(printContents)
        //     window.print();
        // }, 500);

    }, [])

    const { ecrno } = useParams()
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: ecrno,
        // onAfterPrint: () => alert('Print success')
    });




    //*************************** FUNCTON TEST*************************** */
    const [dataModaldt, setDataModaldt] = useState([]);
    const [cbItemPU, setcbItemPU] = useState([]);
    const [cbItemDD, setcbItemDD] = useState([]);
    const [cbModel, setcbModel] = useState([]);
    const [cbLine, setcbLine] = useState([]);
    const [cbForDD, setcbForDD] = useState([]);
    const [cbSecQC, setcbSecQC] = useState([]);
    const [cbSecDD, setcbSecDD] = useState([]);
    const [cbChCustomer, setcbChCustomer] = useState([]);
    const [cbCustomer, setcbCustomer] = useState([]);
    const [cbdistribution, setcbdistribution] = useState([]);
    const getTestParameter = () => {
        getREPORT.getReportECR(ecrno).then((res) => {
            try {
                // console.log(res)
                if (Object.keys(res.data).length) {
                    setDataModaldt(res.data.detail)
                    setcbItemPU(res.data.pu);
                    setcbItemDD(res.data.dd);
                    setcbModel(res.data.model);
                    setcbLine(res.data.line);
                    setcbForDD(res.data.forDD);
                    setcbSecDD(res.data.itemSecDD);
                    setcbSecQC(res.data.itemSecQC);
                    setcbChCustomer(res.data.chChangesQA);
                    setcbCustomer(res.data.customer);
                    setcbdistribution(res.data.distribution);
                }
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    };
    //***************************END FUNCTON TEST*************************** */

    return (
        // <PDFViewer>
        //     <Document>
        //         <Page size="A4" style={styles.page}>
        //             <View style={styles.section}>
        //                 <Text>Section #1</Text>
        //             </View>
        //         </Page>
        //     </Document>
        // </PDFViewer>

        <div>
            <div>
                {
                    dataModaldt[0]?.qA_ApprovedBit == "F" ? <Button variant="success" onClick={handlePrint} style={{ position: 'absolute', left: '266px', top: '125px' }}>Print</Button> : ""
                }
            </div>


            <div ref={componentRef} style={{ width: '90%', height: window.innerHeight }}>
                <br></br>
                <div id="AAA" style={{ paddingLeft: '3pc' }}>
                    <br></br><br></br>
                    <div class="row">
                        <div class="col-md-4"><p style={{ marginTop: '-1pc', fontSize: '10px' }}>Safety First (Zero Accident) 5S (Seiri,Seiton,Seiso,Seiketsu,Shitsuke)</p></div>
                        <div class="col-md-6"><p style={{ fontSize: '18px' }}>ENGINEERING CHANGE REQUEST (1/2)</p></div>
                        <div class="col-md-2"><p style={{ fontSize: '13px' }}>ECR NO. <ins>{dataModaldt[0]?.ecR_NO}</ins></p></div>
                        <p id="title" className='title' style={{ fontSize: '16px' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TITLE : <ins>{dataModaldt[0]?.title}</ins></p>
                    </div>
                    <p className='title'>1. CHANGE OUTLINE</p>


                    <div class="row">
                        <div class="col-md-10">
                            <table style={{ width: '100%' }}>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '13px' }} colspan="2"><center>CHANGE REQUEST ITEM</center></td>
                                    <td style={{ border: '1px solid black', fontSize: '13px' }} rowspan="2"><center>Model / Process Concern</center></td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '12px' }}><center>1 PU</center></td>
                                    <td style={{ border: '1px solid black', fontSize: '12px' }} ><center>2 DD</center></td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', paddingLeft: '6px' }} rowspan="2">
                                        {
                                            cbItemPU.map((item, index) => {
                                                var isChecked = dataModaldt[0]?.item.split(',').includes(item?.dict_Code);
                                                return <div key={item?.dict_Code} style={{ display: 'flex' }} > <div className='checkbox-container'><input defaultChecked={isChecked} type="checkbox" value={item} onChange={(event) => handleCheckBoxPUEdit(index, event.target.checked)} /> </div>   <div style={{ display: 'none' }}> {item?.dict_Code} </div> <div style={{ marginLeft: '13px', fontSize: '12px' }}>{item?.dict_Desc}</div> <br></br></div>
                                            })
                                        }
                                        <p style={{ marginLeft: '1.8pc', fontSize: '12px' }}>Other :<ins>{dataModaldt[0]?.itemPU_Other}</ins></p>
                                    </td>
                                    <td style={{ border: '1px solid black', paddingLeft: '6px' }} rowspan="2">
                                        {
                                            cbItemDD.map((item, index) => {
                                                var isChecked = dataModaldt[0]?.item.split(',').includes(item?.dict_Code);
                                                return <div key={item?.dict_Code} style={{ display: 'flex' }} > <input defaultChecked={isChecked} type="checkbox" value={item} onChange={(event) => handleCheckBoxPUEdit(index, event.target.checked)} />    <div style={{ display: 'none' }}> {item?.dict_Code} </div> <div style={{ marginLeft: '13px', fontSize: '12px' }}>{item?.dict_Desc}</div> <br></br></div>
                                            })
                                        }

                                        <p style={{ fontSize: '12px' }}>Notification No : <ins>{dataModaldt[0]?.notification_No}</ins></p>
                                        <p style={{ fontSize: '12px' }}>DR No : <ins>{dataModaldt[0]?.dR_No}</ins></p>
                                        <p style={{ fontSize: '12px' }}>Other :<ins>{dataModaldt[0]?.itemDD_Other}</ins></p>
                                    </td>
                                    <td style={{ border: '1px solid black' }} >
                                        <div style={{ display: 'flex' }}>
                                            {
                                                cbModel.map((item, index) => {
                                                    var isChecked = dataModaldt[0]?.model.split(',').includes(item?.req_MODELCODE);
                                                    return <div key={item?.req_MODELCODE} style={{ display: 'flex', marginLeft: '0.3pc' }} > <input defaultChecked={isChecked} type="checkbox" value={item} onChange={(event) => handleCheckBoxPUEdit(index, event.target.checked)} />    <div style={{ display: 'none' }}> {item?.req_MODELCODE} </div> <div style={{ marginLeft: '4px', fontSize: '12px' }}>{item?.req_MODELNAME}</div> <br></br></div>
                                                })
                                            }
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', paddingLeft: '6px' }} >
                                        <div style={{ marginTop: '-1.5pc' }}>
                                            {
                                                cbLine.map((item, index) => {
                                                    var isChecked = dataModaldt[0]?.line.split(',').includes(item?.req_LINECODE);
                                                    return <div key={item?.req_LINECODE} style={{ display: 'flex' }} > <input defaultChecked={isChecked} type="checkbox" value={item} onChange={(event) => handleCheckBoxPUEdit(index, event.target.checked)} />    <div style={{ display: 'none' }}> {item?.req_LINECODE} </div> <div style={{ marginLeft: '13px', fontSize: '12px' }}>{item?.req_LINENAME}</div> <br></br></div>
                                                })
                                            }
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-md-2" style={{ padding: '0' }}>
                            <table id='SignRequest' style={{ width: '90%', marginLeft: '-8px' }}>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }} colspan="3">Request Section : PU/DD</td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }} colspan="3">Date : {dataModaldt[0]?.create_IssuedDate}</td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Approved (AGM up)</b></center></td>
                                    <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Checked</b></center></td>
                                    <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Issued</b></center></td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.create_ApprovedBy}<br></br>{dataModaldt[0]?.create_ApprovedDate}</center></td>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.create_CheckBy}<br></br>{dataModaldt[0]?.create_CheckDate}</center></td>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.createBy}<br></br>{dataModaldt[0]?.create_IssuedDate}</center></td>
                                </tr>
                            </table>
                        </div>
                    </div>



                    <div class="row" style={{ marginTop: '-1pc' }}>
                        <div class="col-md-10"></div>
                        <div class="col-md-2" className='styleForDD'>
                            <p style={{ fontSize: '11px', margin: '0' }}>FOR DD SECTION</p>
                            {
                                cbForDD.map((item, index) => {
                                    var isChecked = dataModaldt[0]?.for_DDSection.split(',').includes(item?.req_FORCODE);
                                    return <div key={item?.req_FORCODE} style={{ display: 'flex' }} > <input defaultChecked={isChecked} type="checkbox" value={item} onChange={(event) => handleCheckBoxPUEdit(index, event.target.checked)} />    <div style={{ display: 'none' }}> {item?.req_FORCODE} </div> <div style={{ marginLeft: '13px', fontSize: '11px' }}>{item?.req_FORNAME}</div> <br></br></div>
                                })
                            }
                        </div>
                    </div>


                    <br></br>

                    <div class="row" >
                        <div class="col-md-10" >
                            <table style={{ width: '100%' }}>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '13px' }}><center>PART NO. (DRAWING)</center></td>
                                    <td style={{ border: '1px solid black', fontSize: '13px' }}><center>PART NAME</center></td>
                                    <td style={{ border: '1px solid black', fontSize: '13px' }}><center>REMARK</center></td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '12px', width: '4pc' }}><center><b>{dataModaldt[0]?.part_No}</b></center></td>
                                    <td style={{ border: '1px solid black', fontSize: '12px', width: '4pc' }}><center><b>{dataModaldt[0]?.part_Name}</b></center></td>
                                    <td style={{ border: '1px solid black', fontSize: '12px', width: '4pc' }}><center><b>{dataModaldt[0]?.REMARK}</b></center></td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-md-2">
                        </div>
                    </div>



                    <div class="row" style={{ marginTop: '10px' }}>
                        <div class="col-md-10" style={{ fontSize: '14px' }}>
                            <div style={{ width: '100%', padding: '10px', border: '1px solid black', margin: '0' }}>
                                <p style={{ marginTop: '-7px' }}>วัตถุประสงค์5555, วิธีการ, ข้อมูลการส่งมอบ  (Purpose, Method & Delivery Schedule) :</p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<ins>{dataModaldt[0]?.method_Remark}</ins>
                                <br></br><br></br><br></br>
                                <p> Purpose :</p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Due Date(Target) : <ins>{dataModaldt[0]?.dueDate_Target}</ins>
                            </div>
                        </div>
                        <div class="col-md-2">
                        </div>
                    </div>




                    <p style={{ fontSize: '12px', margin: '0px' }}>2. QUALITY CHECK CONTENT  (DCI) and Other</p>
                    <div class="row">
                        <div class="col-md-10" style={{ fontSize: '12px' }}>
                            <div style={{ width: '100%', padding: '10px', border: '1px solid black', margin: '0' }}>
                                <p style={{ marginTop: '-7px' }}><ins>2.1  PU Section : Effect Parts stock control & Supplier (เฉพาะในกรณี ❷ เท่านั้น)</ins></p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<ins>{dataModaldt[0]?.pU_Remark}</ins>
                            </div>
                        </div>
                        <div class="col-md-2" style={{ padding: '0', marginTop: '-26px' }}>
                            <table id='SignPU' style={{ width: '90%', marginLeft: '-8px' }}>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }} colspan="3">Accepted Section : PU</td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }} colspan="3">Date : {dataModaldt[0]?.pU_IssuedDate}</td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Approved (AGM up)</b></center></td>
                                    <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Checked</b></center></td>
                                    <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Issued</b></center></td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.pU_ApprovedBy}<br></br>{dataModaldt[0]?.pU_ApprovedDate}</center></td>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.pU_CheckBy}<br></br>{dataModaldt[0]?.pU_CheckDate}</center></td>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.pU_IssuedBy}<br></br>{dataModaldt[0]?.pU_IssuedDate}</center></td>
                                </tr>
                            </table>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-md-10"  >
                            <div style={{ width: '100%', padding: '10px', border: '1px solid black', margin: '0' }}>
                                <div class="row">
                                    <div class="col-md-10" style={{ fontSize: '12px' }}>
                                        <div >
                                            <p style={{ marginTop: '-7px' }}>หัวข้อการตรวจเช็คคุณภาพ และผล (Quality Check Item and Result) :</p>
                                            <ins>2.2  Design Development</ins> :  1).ประเมินคุณสมบัติของ Part ( Mechanical , Chemical )<br></br>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2). Dimension  3). Durability , Realibility<br></br>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4). BOM System
                                            {
                                                cbSecDD.map((item, index) => {
                                                    var isChecked = dataModaldt[0]?.dD_Remark1.split(',').includes(item?.req_ITEMDESIGNCODE);
                                                    return <div key={item?.req_ITEMDESIGNCODE} style={{ display: 'flex' }} > <input defaultChecked={isChecked} type="checkbox" value={item} onChange={(event) => handleCheckBoxPUEdit(index, event.target.checked)} />    <div style={{ display: 'none' }}> {item?.req_ITEMDESIGNCODE} </div> <div style={{ marginLeft: '13px', fontSize: '12px' }}>{item?.req_ITEMDESIGNNAME}</div> <br></br></div>
                                                })
                                            }

                                        </div>
                                    </div>
                                    <div class="col-md-2" style={{ width: '100%', padding: '10px', border: '1px solid black', marginLeft: '-10px', fontSize: '12px' }} >
                                        ดำเนินการข้อ 2.1 เฉพาะ <br></br>
                                        ในกรณี 1 : ข้อ 2  , ข้อ 3 <br></br>
                                        ในกรณี 2 : ข้อ 1  , ข้อ 2
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br></br><br></br><br></br><br></br>
                        <div class="col-md-2" style={{ marginTop: '15px', padding: '0' }}>
                            <table id='SignDD' style={{ width: '90%', marginLeft: '-8px' }}>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }} colspan="3">Accepted Section : DD</td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }} colspan="3">Date : {dataModaldt[0]?.dD_IssuedDate}</td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Approved (AGM up)</b></center></td>
                                    <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Checked</b></center></td>
                                    <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Issued</b></center></td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.dD_ApprovedBy}<br></br>{dataModaldt[0]?.dD_ApprovedDate}</center></td>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.dD_CheckBy}<br></br>{dataModaldt[0]?.dD_CheckDate}</center></td>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.dD_IssuedBy}<br></br>{dataModaldt[0]?.dD_IssuedDate}</center></td>
                                </tr>
                            </table>
                        </div>
                    </div>




                    <div class="row" style={{ marginTop: '6px' }}>
                        <div class="col-md-10" style={{ fontSize: '12px' }}>
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '100%', padding: '10px', border: '1px solid black', margin: '0', fontSize: '12px' }}>
                                    <ins>2.3  Engineer Section : Procesee effect , Tool life  , MQ,PC</ins><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{dataModaldt[0]?.eN_Remark}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2" style={{ padding: '0', marginTop: '-19px' }}>
                            <table id='SignEN' style={{ width: '90%', marginLeft: '-8px' }}>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }} colspan="3">Accepted Section : EN</td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }} colspan="3">Date : {dataModaldt[0]?.eN_IssuedDate}</td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Approved (AGM up)</b></center></td>
                                    <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Checked</b></center></td>
                                    <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Issued</b></center></td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.eN_ApprovedBy}<br></br>{dataModaldt[0]?.eN_ApprovedDate}</center></td>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.eN_CheckBy}<br></br>{dataModaldt[0]?.eN_CheckDate}</center></td>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.eN_IssuedBy}<br></br>{dataModaldt[0]?.eN_IssuedDate}</center></td>
                                </tr>
                            </table>
                        </div>
                    </div>



                    <div class="row">
                        <div class="col-md-10" style={{ fontSize: '12px' }}>
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '100%', padding: '10px', border: '1px solid black', margin: '0', fontSize: '12px' }}>
                                    <ins>2.4  SQC  : Quality part (PAS) / Process audit</ins><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{dataModaldt[0]?.sqC_Remark}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2" style={{ marginTop: '1pc', padding: '0' }}>
                            <table id='SignSQC' style={{ width: '90%', marginLeft: '-8px' }}>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }} colspan="3">Accepted Section : SQC</td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }} colspan="3">Date : {dataModaldt[0]?.sqC_IssuedDate}</td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Approved (AGM up)</b></center></td>
                                    <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Checked</b></center></td>
                                    <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Issued</b></center></td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.sqC_ApprovedBy}<br></br>{dataModaldt[0]?.sqC_ApprovedDate}</center></td>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.sqC_CheckBy}<br></br>{dataModaldt[0]?.sqC_CheckDate}</center></td>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.sqC_IssuedBy}<br></br>{dataModaldt[0]?.sqC_IssuedDate}</center></td>
                                </tr>
                            </table>
                        </div>
                    </div>




                    <div class="row">
                        <div class="col-md-10" style={{ marginTop: '-37px' }}>
                            <div>
                                <div style={{ width: '100%', padding: '10px', border: '1px solid black', margin: '0', fontSize: '12px' }}>
                                    <div class="row">
                                        <div class="col-md-7" style={{ fontSize: '12px' }}>
                                            <div >
                                                <ins>2.5  QCD : ( Total Judgement )</ins><br></br>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{dataModaldt[0]?.qC_Remark1}

                                            </div>
                                        </div>

                                        <div class="col-md-5" style={{ border: '1px solid black', marginLeft: '-11px' }}>
                                            <ins>การเตรียมการควบคุมในการผลิต</ins><br></br>
                                            <div class="row">
                                                <div class="col-md-12" >
                                                    {
                                                        cbSecQC.slice(0, 6).map((item, index) => {
                                                            var isChecked = dataModaldt[0]?.qC_Remark2.split(',').includes(item?.req_ITEMQCCODE);
                                                            return <div key={item?.req_ITEMQCCODE} style={{ display: 'flex' }} >
                                                                <input defaultChecked={isChecked} type="checkbox" value={item} onChange={(event) => handleCheckBoxPUEdit(index, event.target.checked)} />    <div style={{ display: 'none' }}> {item?.req_ITEMQCCODE} </div> <div style={{ marginLeft: '13px', fontSize: '12px' }}>{item?.req_ITEMQCNAME}</div> <br></br></div>
                                                        })
                                                    }


                                                    <div key={cbSecQC[6]?.req_ITEMQCCODE} style={{ display: 'flex' }} >
                                                        {
                                                            <><input defaultChecked={dataModaldt[0]?.qC_Remark2.split(',').includes("QCD07")} type="checkbox" /><div style={{ display: 'none' }}> {cbSecQC[6]?.req_ITEMQCCODE} </div> <div style={{ marginLeft: '13px', fontSize: '12px' }}></div>
                                                                7) Process :
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input defaultChecked={dataModaldt[0]?.qC_Remark2.split(',').includes(cbSecQC[7]?.req_ITEMQCCODE)} type="radio" name={'matrerial'} />
                                                                Mix Matreial
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input defaultChecked={dataModaldt[0]?.qC_Remark2.split(',').includes(cbSecQC[8]?.req_ITEMQCCODE)} type="radio" name={'matrerial'} /> Can not mix </>
                                                        }
                                                    </div >

                                                    <div key={cbSecQC[7]?.req_ITEMQCCODE} style={{ display: 'flex' }} >
                                                        {
                                                            <> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Customer :
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input defaultChecked={dataModaldt[0]?.qC_Remark2.split(',').includes(cbSecQC[9]?.req_ITEMQCCODE)} type="radio" name={'pallet'} />
                                                                Mix Pallet
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input defaultChecked={dataModaldt[0]?.qC_Remark2.split(',').includes(cbSecQC[10]?.req_ITEMQCCODE)} type="radio" name={'pallet'} /> Can not mix
                                                            </>
                                                        }
                                                    </div >



                                                    {
                                                        cbSecQC.slice(10, 11).map((item, index) => {
                                                            var isChecked = dataModaldt[0]?.qC_Remark2.split(',').includes(item?.req_ITEMQCCODE);
                                                            return <div key={item?.req_ITEMQCCODE} style={{ display: 'flex' }} > <input defaultChecked={isChecked} type="checkbox" value={item} onChange={(event) => handleCheckBoxPUEdit(index, event.target.checked)} />    <div style={{ display: 'none' }}> {item?.req_ITEMQCCODE} </div> <div style={{ marginLeft: '13px', fontSize: '12px' }}>{item?.req_ITEMQCNAME}</div> <br></br></div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2" style={{ marginTop: '3pc', padding: '0' }}>
                            <table id='SignQC' style={{ width: '90%', marginLeft: '-8px' }}>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }} colspan="3">Accepted Section : QC</td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }} colspan="3">Date : {dataModaldt[0]?.qC_IssuedDate}</td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Approved (AGM up)</b></center></td>
                                    <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Checked</b></center></td>
                                    <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Issued</b></center></td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.qC_ApprovedBy}<br></br>{dataModaldt[0]?.qC_ApprovedDate}</center></td>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.qC_CheckBy}<br></br>{dataModaldt[0]?.qC_CheckDate}</center></td>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.qC_IssuedBy}<br></br>{dataModaldt[0]?.qC_IssuedDate}</center></td>
                                </tr>
                            </table>
                        </div>
                    </div>



                    <p style={{ fontSize: '12px', margin: '0px' }}>3. JUDGEMENT (DIL Design Section)</p>
                    <div class="row">
                        <div class="col-md-10"  >
                            <div>
                                <div style={{ width: '100%', padding: '10px', border: '1px solid black', margin: '0', fontSize: '12px' }}>
                                    <div class="row">
                                        <div class="col-md-12" style={{ fontSize: '12px' }}>
                                            <div >
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{dataModaldt[0]?.diL_RemarkDD}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2" style={{ marginTop: '-27px', padding: '0' }}>
                            <table id='SignDIL' style={{ width: '90%', marginLeft: '-8px' }}>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }} colspan="3">Accepted Section : DIL</td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }} colspan="3">Date : {dataModaldt[0]?.sqC_IssuedDate}</td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Approved (AGM up)</b></center></td>
                                    <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Checked</b></center></td>
                                    <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Issued</b></center></td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.sqC_ApprovedBy}<br></br>{dataModaldt[0]?.sqC_ApprovedDate}</center></td>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.sqC_CheckBy}<br></br>{dataModaldt[0]?.sqC_CheckDate}</center></td>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.sqC_IssuedBy}<br></br>{dataModaldt[0]?.sqC_IssuedDate}</center></td>
                                </tr>
                            </table>
                        </div>
                    </div>



                    <p style={{ fontSize: '12px', margin: '0px' }}>4. JUDGEMENT (DIL Quality ControlSection) [Incase necessary]</p>
                    <div class="row" style={{ marginTop: '6px' }}>
                        <div class="col-md-10" style={{ fontSize: '12px' }}>
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '100%', padding: '10px', border: '1px solid black', margin: '0', fontSize: '12px' }}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{dataModaldt[0]?.diL_RemarkQC}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2" style={{ padding: '0' }}>
                            <table id='SignDIL2' style={{ width: '90%', marginLeft: '-8px' }}>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }} colspan="3">Accepted Section : DIL</td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }} colspan="3">Date : {dataModaldt[0]?.sqC_IssuedDate}</td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Approved (AGM up)</b></center></td>
                                    <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Checked</b></center></td>
                                    <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Issued</b></center></td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.sqC_ApprovedBy}<br></br>{dataModaldt[0]?.sqC_ApprovedDate}</center></td>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.sqC_CheckBy}<br></br>{dataModaldt[0]?.sqC_CheckDate}</center></td>
                                    <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.sqC_IssuedBy}<br></br>{dataModaldt[0]?.sqC_IssuedDate}</center></td>
                                </tr>
                            </table>
                        </div>
                    </div>





                    <p style={{ fontSize: '12px', margin: '0px' }}>5.CUSTOMER INFORMATION</p>
                    <div class="row">
                        <div class="col-md-10" style={{ fontSize: '12px' }}>
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '100%', padding: '10px', border: '1px solid black', margin: '0' }}>
                                    <div style={{ display: 'flex' }}>
                                        1.การแจ้งลูกค้าข้อมูลการเปลี่ยนแปลง (QA / LG )<br></br>
                                        {
                                            cbChCustomer.map((item, index) => {
                                                var isChecked = dataModaldt[0]?.qA_ChangeCustomer.split(',').includes(item?.req_QACHECKCODE);
                                                return <div key={item?.req_QACHECKCODE} style={{ display: 'flex' }} >
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input defaultChecked={isChecked} type="checkbox" value={item} onChange={(event) => handleCheckBoxPUEdit(index, event.target.checked)} />    <div style={{ display: 'none' }}> {item?.req_QACHECKCODE} </div> <div style={{ marginLeft: '13px', fontSize: '11px' }}>{item?.req_QACHECKNAME}</div> <br></br></div>
                                            })
                                        }
                                    </div>
                                    <div class="row" style={{ display: 'flex' }}>
                                        <div class="col-md-2">
                                            ชื่อลูกค้าที่แจ้ง :
                                        </div>
                                        <div class="col-md-10" style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                            {
                                                cbCustomer.map((item, index) => {
                                                    var isChecked = dataModaldt[0]?.qA_CustomerName.split(',').includes(item?.req_QACUSTOMERCODE);
                                                    return <div key={item?.req_QACUSTOMERCODE} style={{ display: 'flex' }} >
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input defaultChecked={isChecked} type="checkbox" value={item} onChange={(event) => handleCheckBoxPUEdit(index, event.target.checked)} />    <div style={{ display: 'none' }}> {item?.req_QACUSTOMERCODE} </div> <div style={{ marginLeft: '13px', fontSize: '11px' }}>{item?.req_QACUSTOMERNAME}</div> <br></br></div>
                                                })
                                            }
                                            {dataModaldt[0]?.qA_OtherCustomer}
                                        </div>
                                    </div >

                                    <br></br>
                                    <div style={{ display: 'flex' }}>
                                        <p>วันที่แจ้ง : {dataModaldt[0]?.qA_InformationDate}</p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <p>Information by : {dataModaldt[0]?.qA_InformatonBy}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2" style={{ padding: '0' }}>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <table id='SignQA' style={{ width: '90%', marginLeft: '-8px' }}>
                                        <tr style={{ border: '1px solid black' }}>
                                            <td style={{ border: '1px solid black', fontSize: '10px' }} colspan="3">Accepted Section : QA</td>
                                        </tr>
                                        <tr style={{ border: '1px solid black' }}>
                                            <td style={{ border: '1px solid black', fontSize: '10px' }} colspan="3">Date : {dataModaldt[0]?.qA_IssuedDate}</td>
                                        </tr>
                                        <tr style={{ border: '1px solid black' }}>
                                            <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Approved (AGM up)</b></center></td>
                                            <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Checked</b></center></td>
                                            <td style={{ border: '1px solid black', fontSize: '8px', width: '4pc' }}><center><b>Issued</b></center></td>
                                        </tr>
                                        <tr style={{ border: '1px solid black' }}>
                                            <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.qA_ApprovedBy}<br></br>{dataModaldt[0]?.qA_ApprovedDate}</center></td>
                                            <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.qA_CheckBy}<br></br>{dataModaldt[0]?.qA_CheckDate}</center></td>
                                            <td style={{ border: '1px solid black', fontSize: '10px' }}><center>{dataModaldt[0]?.qA_IssuedBy}<br></br>{dataModaldt[0]?.qA_IssuedDate}</center></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>


                    <p style={{ fontSize: '12px' }}><ins>Set Meeting :</ins> กรณี ❶ : PU   กรณี ❷ : DD</p>
                    <div class="row">
                        <div class="col-md-10" style={{ display: 'flex' }}>
                            <div class="col-md-1">
                                <p style={{ fontSize: '11px' }}>DISTRIBUTION</p>
                            </div>
                            <div class="col-md-11" style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                {
                                    cbdistribution.map((item, index) => {
                                        var isChecked = dataModaldt[0]?.distribution.split(',').includes(item?.req_DISTRIBUTIONCODE);
                                        return <div key={item?.req_DISTRIBUTIONCODE} style={{ display: 'flex' }} >
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input defaultChecked={isChecked} type="checkbox" value={item} onChange={(event) => handleCheckBoxPUEdit(index, event.target.checked)} />    <div style={{ display: 'none' }}> {item?.req_DISTRIBUTIONCODE} </div> <div style={{ marginLeft: '13px', fontSize: '11px' }}>{item?.req_DISTRIBUTIONNAME}</div> <br></br></div>
                                    })
                                }
                            </div>
                        </div>
                        <div class="col-md-2" style={{ padding: '0' }}>
                        </div>
                    </div>




                    <div>
                        <div class="row" style={{ marginTop: '9px' }}>
                            <div class="col-md-10">
                                <p style={{ fontSize: '10px', marginTop: '13px' }}>FM-QC-012-15-3(18/08/2021)</p>
                            </div>
                            <div class="col-md-2">
                                <p className='p'>ECR (2/2) For DCI</p>
                                <p className='pDaikin'>DAIKIN COMPRESSOR INDUSTRIES LTD.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}


export default Print