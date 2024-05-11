import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { FcOnlineSupport, FcPhone, FcAddressBook } from "react-icons/fc";

function Contact() {
    const theme = useTheme();

    return (
        <>
            <div class="container">
                <br></br><br></br><br></br>
                <div class="row">
                    <Card sx={{ display: 'flex' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div">
                                    <p>มีปัญหาเกี่ยวกับการใช้งานระบบ ติดต่อ(IT)</p>
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    <FcOnlineSupport size="30px" />&nbsp;&nbsp;&nbsp;: PANNITA INMOON (Nan)<br></br>
                                    <FcPhone size="30px" className='gelatine' />  &nbsp;&nbsp;&nbsp;: 250 <br></br>
                                    <FcAddressBook size="30px" /> &nbsp;&nbsp;&nbsp;: pannita.i@dci.daikin.co.jp
                                </Typography>
                            </CardContent>
                        </Box>
                        <CardMedia style={{ borderRadius: '25px' }}
                            component="img"
                            sx={{ width: 120 }}
                            image="http://dcidmc.dci.daikin.co.jp/PICTURE/41179.jpg"
                            alt="Live from space album cover"
                        />
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Contact