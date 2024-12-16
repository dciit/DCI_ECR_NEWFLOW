import { useState, useEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import serviceTitle from '../service/getServiceHeader'
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
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





function FullTitle(props) {
    const { show, close, item } = props;


    useEffect(() => {
        if (show) {
            initFiles();
        }
    }, [show]);


    // ************SHOW TITLE************
    const [showTitle, setshowTitle] = useState([]);
    const initFiles = () => {
        serviceTitle.getFullTitle(item.ecrno).then((res) => {
            try {
              setshowTitle(res.data);
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    // ************END  SHOW TITLE ************



    return (
        <>
            <div>
                <BootstrapDialog
                    open={show}
                >
                    <Dialog
                        open={show}
                        fullWidth
                        maxWidth="lg"
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                    >
                        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
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
                                  {
                                    showTitle.map((item) =>{
                                      return <>
                                      <div style={{display: 'flex',alignItems: 'baseline'}}><h4 style={{backgroundColor: '#b9fb38e8'}}>TITLE : </h4>&nbsp;&nbsp;<p style={{fontSize: '16px'}}>{item.fulltitle}</p></div>
                                      </>
                                    })
                                  }
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

export default FullTitle