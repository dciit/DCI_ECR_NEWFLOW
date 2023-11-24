import React, { useEffect, useState } from 'react'
import getDataSrvHD from '../../service/getServiceHeader.js'
import './AddPermissions.css'
import Button from 'react-bootstrap/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




function AddPermissions() {




    return (
        <>
            <div className='pagePermission'>
                <div class="card ">
                    <h5 class="card-header bg-primary text-white border-0">Add Permissions</h5>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-2">
                                {/* <input type="text" class="form-control" onChange={(event) => setDocNo(event.target.value)} /> */}
                                Emp Code :  <input type="text" class="form-control" />
                            </div>
                            <div class="col-2">
                                Name : <input type="text" class="form-control" />
                            </div>
                            <div class="col-2">
                                SurName : <input type="text" class="form-control" />
                            </div>
                            <div class="col-2">
                                Positon : <input type="text" class="form-control" />
                            </div>
                            <div class="col-2">
                                Group : <input type="text" class="form-control" />
                            </div>
                            {/* <div class="col-6">
                            </div> */}
                        </div>
                    </div>
                    <div class="col-12 offset-11" >
                        <button type="submit" class="btn btn-success mb-2" >Add</button>
                    </div>
                </div>
            </div>




        </>
    )
}


export default AddPermissions