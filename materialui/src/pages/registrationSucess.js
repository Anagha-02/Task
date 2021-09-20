import { Typography } from '@mui/material';
import { Redirect } from 'react-router';
import '../App.css';
import RegistrationHomePage from './registrationHome';


function RegistrationSucess({ username, message, status }) {
    if ((username === 0 || username === null || username === '') || (message === 0 || message === null || message === '')) {
        return (
            <Typography />
        );
    }
    else if (status === "error") {
        return (
            <Typography className="errorMessage">
                Registration was not sucessful. {message}
            </Typography>
        );
    }
    else {
        localStorage.setItem('user','register');
        return (
            <Typography className="sucessMessage">
                <Redirect to="/regHome"> <RegistrationHomePage /> </Redirect>
            </Typography>

        );
    }
}

export default RegistrationSucess;