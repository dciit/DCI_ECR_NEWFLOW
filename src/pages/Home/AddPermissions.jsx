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
    const [txtEmpCode, settxtEmpCode] = useState('');


    useEffect(() => {

    }, [])


    const handleChangeSec = (event) => {
        setSelectSection(event.target.value);
    };

    const handleChangeStep = (event) => {
        setSelectStep(event.target.value);
    };

    const sectionArray = ['ADMIN', 'PU ', 'DD', 'EN', 'SQC', 'QC', 'DIL', 'QA']
    const stepArray = ['ADMIN', 'RECEIVED', 'ISSUED ', 'CHECK', 'APPROVED']


    //***************************FUNCTON INPUT DATA INSERT HEAD , DETAIL*************************** */
    const AddPermission = () => {
        if (txtEmpCode != "") {
            getDataSrvPermiss.postAddPermission({
                section: selectSection, step: selectStep, issued: empCode, empCode: txtEmpCode
            }).then((res) => {
                try {
                    // refresh();
                    alert("Add Permission สำเร็จ")
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
                    </div>
                </div>
            </div>
        </>
    )
}


export default AddPermissions