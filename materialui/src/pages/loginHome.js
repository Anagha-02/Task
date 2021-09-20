import { Container, ThemeProvider, createTheme, Typography, CssBaseline, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { Component } from 'react';
import { Redirect } from 'react-router';

import '../App.css';

const theme = createTheme();

function removeFromLocalStorage() {
  var storage;
  try {
    storage = window['localStorage'];
    storage.clear();
    return true;
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

class LoginHomePage extends Component {
  render() {
    if (localStorage.getItem('user') === "login") {
      return (
        <ThemeProvider theme={theme}>
           <Box sx={{ margin: 4, alignItems: 'right', justifyItems: 'right' }} >
          <Button type="submit" variant="contained" href="/login" onClick={() => removeFromLocalStorage()} >
              Logout
            </Button>
          </Box>
          <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Box sx={{ margin: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >

              <Typography variant="h3" margin="normal">
                Welcome!
              </Typography>

              <Typography component="body" variant="h5" margin="normal">
                This is Dashboard.
              </Typography>

            </Box>

          </Container>
        </ThemeProvider>
      );
    }
    else {
      return <Redirect to="/login" />
    }
  }
}

export default LoginHomePage;
