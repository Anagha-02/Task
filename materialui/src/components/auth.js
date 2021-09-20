import React, { useState } from 'react';
import {Avatar, Button, CssBaseline, TextField,  Link, Grid , Box} from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LockOutlined } from '@mui/icons-material';
import LoginSucess from './loginSucess';

const theme = createTheme();

export default function SignIn() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');
    const [messsage, setMessage]  = useState('');

  const handleSubmit = (event) => {
        event.preventDefault();

        let requestBody = {
            username: `${username}`,
            password: `${password}`
        }

        fetch('http://localhost:9000/users/login', {
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
                if (resData.status === "error") {
                    setMessage(resData.error);
                    setUserId(0);
                }
                else if (resData.status === "ok") {
                    setMessage(resData.username);
                    setUserId(resData.id);
                }
            })
            .catch(err => {
                console.log(err);
            });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box> 
                <LoginSucess
                    userId= {userId}
                    message={messsage}
                />
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField variant="outlined" label="username" type="text" onChange={(e) => setUsername(e.target.value)}
                    required margin="normal" fullWidth autoFocus
            />
            <TextField variant="outlined" label="Password" type="password" onChange={(e) => setPassword(e.target.value)} required
              margin="normal"
              fullWidth
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container>
              <Grid item alignSelf="end">
                <Link href="/signUp" variant="body2">
                  {"Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}