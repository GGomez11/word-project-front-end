import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useState } from 'react'
import { AppBar } from '@material-ui/core';
import '../css/GetStartedModal.css'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SignInForm from './Login/SignInForm';
import RegisterForm from './Login/RegisterForm';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function GetStartedModal({setIsLoggedIn}) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <div >
            <AppBar position='static'>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                    <Tab label="Register" {...a11yProps(0)} />
                    <Tab label="Sign In" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <RegisterForm />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SignInForm setIsLoggedIn={setIsLoggedIn}/>
            </TabPanel>
        </div>
    )
}
export default GetStartedModal