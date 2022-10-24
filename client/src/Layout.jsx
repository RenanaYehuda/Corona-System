import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { IconButton, Box, Container } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {

    let navigate = useNavigate();
    return (
        <Box>
            <IconButton variant="contained" size='large' onClick={() => navigate('/')}>
                <HomeIcon size='large' />
            </IconButton>
            <Container sx={{ mt: 2 }}>
                <Outlet />
            </Container>
        </Box>
    )
}

export default Layout