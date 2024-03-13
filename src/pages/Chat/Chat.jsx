import { useState, useEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import getChat from '../../service/getServiceChat.js'
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import './Chat.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2'



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));




const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function Chat(props) {
    const { show, close, item } = props;
    const empCode = Cookies.get('code')

    useEffect(() => {
        if (show) {
            initFiles();
        }
    }, [show]);


    // ************SHOW FILE************
    const [showChat, setShowChat] = useState([]);
    const initFiles = () => {
        getChat.getChat(item.ecrno).then((res) => {
            try {
                setShowChat(res.data);
                console.log(res.data)
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    // ************END  SHOW FILE ************

    const postConfirmChat = (ecrno, type, section, tosection, code) => {
        getChat.postConfirmChat({ ecrno: ecrno, type: type, section: section, tosection: tosection, issued: empCode, code: code }).then((res) => {
            try {
                initFiles();
                Swal.fire({
                    icon: "success",
                    title: "Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                close(false);
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }



    return (
        <>
            <div>
                <BootstrapDialog
                    open={show}
                >
                    <Dialog
                        open={show}
                        fullWidth
                        maxWidth="md"
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                    >
                        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                            <b><h1>Remark</h1></b>
                            <center>ECR NO : {item.ecrno}</center>
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
                                <table className='customers'>
                                    <thead>
                                        <tr>
                                            <th>Status</th>
                                            <th>From</th>
                                            <th>To</th>
                                            <th>Remark</th>
                                            <th>Remark By</th>
                                            <th>Date Time</th>
                                            <th>#</th>
                                        </tr>
                                    </thead>
                                    <tbody> {
                                        showChat?.map((item, index) => {
                                            return <tr key={item.ecrno}>
                                                <td align="center" style={{ textAlign: 'center' }}>{item.type}</td>
                                                <td align="center" style={{ textAlign: 'center' }}>{item.section}</td>
                                                <td align="center" style={{ textAlign: 'center' }}>{item.tosection}</td>
                                                <td align="center" style={{ color: 'red' }}>{item.remark}</td>
                                                <td align="center" style={{ textAlign: 'right' }}>{item.remarkby}</td>
                                                <td align="center" style={{ textAlign: 'right', width: '21%' }}>{item.remarkdate}</td>
                                                <td>
                                                    {
                                                        (item.type == "HOLD" && item.active == "1" ? <Button variant="success" onClick={() => postConfirmChat(item.ecrno, item.type, item.section, item.tosection, item.code)}>Confirm</Button> : "")
                                                    }
                                                </td>
                                            </tr>
                                        })
                                    }
                                    </tbody>
                                </table>
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

export default Chat