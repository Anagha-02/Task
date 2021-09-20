import { Container, ThemeProvider, createTheme, Typography, CssBaseline, Link, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { Component } from 'react';
import { Redirect } from 'react-router';

import '../App.css';

const theme = createTheme();

class RegistrationHomePage extends Component {
    render() {
        if (localStorage.getItem('user') === "register") {

            return (
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />

                        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                            <Typography variant="h3" margin="normal">
                                Welcome!
                            </Typography>

                            <Typography component="body" variant="h5" margin="normal">
                                Registration was sucessful
                            </Typography>

                            <Grid container justifyContent="center">
                                <Grid item>
                                    <Link href="/login"> Login? </Link>
                                </Grid>
                            </Grid>

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

export default RegistrationHomePage;