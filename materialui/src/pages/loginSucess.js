import { Typography } from '@mui/material';
import { Redirect } from 'react-router';
import '../App.css';
import LoginHomePage from './loginHome';

function LoginSucess({ userId, message }) {
    if ((userId === 0 || userId === null || userId === '') && (message === 0 || message === null || message === '')) {
        return (
            <Typography />
        );
    }
    else if (userId === 0 || userId === null || userId === '') {
        return (
            <Typography className="errorMessage">
                Login was not sucessful. {message}
            </Typography>
        );
    }
    else {
        localStorage.setItem('user','login');
        return (
            <Redirect to="/logHome"> <LoginHomePage /> </Redirect>
        )
    }
}

export default LoginSucess;