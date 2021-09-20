import React, { useState } from 'react';
import { Button, CssBaseline, TextField, Box, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RegistrationSucess from './registrationSucess';

const theme = createTheme();
/*
function saveToLocalStorage(type) {
  var storage;
  try {
    storage = window['localStorage'];
    var x = type;
    storage.setItem('user', x);
    return true;
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}
*/
function Registration() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');
  const [messsage, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (confirmPassword !== password) {
      setStatus("error");
      setMessage("Passwords do not match");
      return;
    }

    let requestBody = {
      username: `${username}`,
      password: `${password}`
    }

    fetch('http://localhost:9000/users/register', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        setStatus(resData.status);
        setMessage(resData.error);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">

        <CssBaseline />

        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >

          <Box sx={{ mb: 1 }}>
            <Typography className="sucessMessage" component="body" variant="h4">
              Welcome User
            </Typography>
          </Box>

          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>

            <TextField variant="outlined" label="Username" type="text" onChange={(e) => setUsername(e.target.value)}
              required margin="normal" fullWidth autoFocus />

            <TextField variant="outlined" label="Password" type="password" onChange={(e) => setPassword(e.target.value)} required
              margin="normal" fullWidth />

            <TextField variant="outlined" label="Confirm Password" type="password" onChange={(e) => setConfirmPassword(e.target.value)}
              required margin="normal" fullWidth />

            <Box>
              <RegistrationSucess
                username={username}
                message={messsage}
                status={status}
              />
            </Box>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
              Submit
            </Button>

            <Button type="submit" fullWidth variant="contained" href="/login" >
              Login
            </Button>

          </Box>

        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Registration;