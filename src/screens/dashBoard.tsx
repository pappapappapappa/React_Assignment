import React, {useState} from 'react';
import {
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from '../components/header';
import EventRequests from '../components/EventRequests';
import EventManagementPage from '../components/EventName';

const GradientBox = styled(Box)(() => ({
    background: 'linear-gradient(to right, #000, #342156)',
    minHeight: '95%',
    height:'100%',
    color: 'white',
    // display: 'flex',
    width: '100vw',
    paddingBottom:'5%'
    // paddingHorizontal:5,
  }));

const DashBoard: React.FC = () => {
const [hide, setHide] = useState(true);
const handleChildData = (dataFromChild: boolean) => {
  setHide(dataFromChild);
};
return(
    <GradientBox>
        <Header/>
        <Box>
        {hide ? <EventRequests onSendData={handleChildData}/> : <EventManagementPage/>}
        </Box>
    </GradientBox>
)}
export default DashBoard;