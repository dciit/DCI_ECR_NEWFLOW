import React, { useEffect, useState } from 'react'
import getDataSrvPermiss from '../../service/getPermisson.js'
import './AddPermissions.css'
import Button from 'react-bootstrap/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie';
import Form from 'react-bootstrap/Form';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


function AddPermissions() {
    const empCode = Cookies.get('code')
    const permission = useSelector((state) => state.reducer.permission);
    const [selectSection, setSelectSection] = useState(permission[0]?.grpRoleSect);
    const [selectStep, setSelectStep] = useState('ADMIN');
    const [txtEmpCode, settxtEmpCode] = useState('%');
    const [data, setData] = useState([]);


    useEffect(() => {
        loadPage();
    }, [])


    const handleChangeSec = (event) => {
        setSelectSection(event.target.value);
    };

    const handleChangeStep = (event) => {
        setSelectStep(event.target.value);
    };

    const sectionArray = ['ADMIN', 'CREATE', 'PU', 'DD', 'EN', 'SQC', 'QC', 'DIL', 'QA']
    const stepArray = ['ADMIN', 'CREATE', 'RECEIVED', 'ISSUED ', 'CHECK', 'APPROVED']


    function loadPage() {
        getDataSrvPermiss.getShowEmployee().then((res) => {
            try {
                setData(res.data)
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }




    //***************************FUNCTON INPUT DATA INSERT HEAD , DETAIL*************************** */
    const AddPermission = () => {
        if (txtEmpCode != "") {
            getDataSrvPermiss.postAddPermission({
                section: selectSection, step: selectStep, issued: empCode, empCode: txtEmpCode
            }).then((res) => {
                try {
                    // refresh();
                    // alert("Add Permission สำเร็จ")
                    handelSearch();
                }
                catch (error) {
                    // alert("มีสิทธิในระบบแล้ว");
                    console.log(error);
                    return error;
                }
            });
        }
        else {
            alert("กรุณากรอก รหัสพนักงาน");
        }
    };
    //***************************END FUNCTON INPUT DATA*************************** */

    const handelSearch = (event) => {
        getDataSrvPermiss.getSearchEmployee(txtEmpCode).then((res) => {
            try {
                setData(res.data)
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }


    const handelDelete = (code, grpCode) => {
        getDataSrvPermiss.getDeletePermission(code, grpCode).then((res) => {
            try {
                handelSearch();
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }



    return (
        <>
            <div className='pagePermission'>
                <div class="card ">
                    <h5 class="card-header bg-primary text-white border-0">Add Permissions</h5>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-2">
                                <TextField id="outlined-basic" label="EmpCode" variant="outlined" onChange={(event) => settxtEmpCode(event.target.value)} />
                            </div>
                            <div class="col-2">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Section</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectSection}
                                        label="Section"
                                        onChange={handleChangeSec}>
                                        {
                                            sectionArray.map((item, index) =>
                                                <MenuItem value={item}>{item}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <div class="col-2">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Step</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectStep}
                                        label="Step"
                                        onChange={handleChangeStep}>
                                        {
                                            stepArray.map((item, index) =>
                                                <MenuItem value={item}>{item}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <div class="col-6">
                                <Button autoFocus variant="success" onClick={AddPermission}>Save</Button>
                            </div>
                        </div>

                        <br></br>
                        <div class="row">
                            <div class="col-1">
                                <Button autoFocus variant="primary" onClick={handelSearch}>Search</Button>
                            </div>

                            <div class="col-11">
                            </div>
                        </div>

                        <br></br>  <br></br>
                        <table className='tablePermiss'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Code</th>
                                    <th>Full Name</th>
                                    <th>Section</th>
                                    <th>Step</th>
                                    <th>Position</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.map((item, index) => {
                                        return <tr key={item.ecrno}>
                                            <td align="center" style={{ textAlign: 'center' }}>{item.no}</td>
                                            <td align="center" style={{ textAlign: 'center' }}>{item.code}</td>
                                            <td align="center" style={{ textAlign: 'left' }}>{item.fullName}</td>
                                            <td align="center" style={{ textAlign: 'center' }}>{item.section}</td>
                                            <td align="center" style={{ textAlign: 'center' }}>{item.step}</td>
                                            <td align="center" style={{ textAlign: 'center' }}>{item.position}</td>
                                            <td align="center" style={{ textAlign: 'center' }}>  <Button variant="danger" onClick={() => handelDelete(item.code, item.grpCode)}>
                                                ลบ
                                            </Button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}


export default AddPermissions