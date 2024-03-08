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
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    // ************END  SHOW FILE ************




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
                                            <th>Request From Section</th>
                                            <th>Request To Section</th>
                                            <th>Remark</th>
                                            <th>Remark By</th>
                                            <th>Date Time</th>
                                        </tr>
                                    </thead>
                                    <tbody> {
                                        showChat?.map((item, index) => {
                                            return <tr key={item.ecrno}>
                                                <td align="center" style={{ textAlign: 'center' }}>{item.section}</td>
                                                <td align="center" style={{ textAlign: 'center' }}>{item.tosection}</td>
                                                <td align="center" style={{ color: 'red' }}>{item.remark}</td>
                                                <td align="center" style={{ textAlign: 'right' }}>{item.remarkby}</td>
                                                <td align="center" style={{ textAlign: 'right' }}>{item.remarkdate}</td>
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

                {/* <Modal
                    {...props}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Remark</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table className='customers'>
                            <thead>
                                <tr>
                                    <th>Section</th>
                                    <th>Remark</th>
                                    <th>Remark By</th>
                                    <th>Date Time</th>
                                </tr>
                            </thead>
                            <tbody> {
                                showChat?.map((item, index) => {
                                    return <tr key={item.ecrno}>
                                        <td align="center" style={{ textAlign: 'center' }}>{item.section}</td>
                                        <td align="center" style={{ color: 'red' }}>{item.remark}</td>
                                        <td align="center" style={{ textAlign: 'right' }}>{item.remarkby}</td>
                                        <td align="center" style={{ textAlign: 'right' }}>{item.remarkdate}</td>
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal> */}
            </div>
        </>
    )
}

export default Chat