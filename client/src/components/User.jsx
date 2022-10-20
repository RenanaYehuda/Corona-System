import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useMutation } from 'react-query';

import { Typography, Stack, Grid, Alert, TextField, Button } from '@mui/material';

import { getUser, updateUser } from '../api/usersApi';

const User = () => {

    const { id } = useParams();
    const { data, status } = useQuery("user", () => getUser(id));

    if (status === 'error') {
        return <div>שגיאה</div>
    }

    if (status === 'loading') {
        return <div>נטען</div>
    }

    return (

        <Grid item xs={12} md={6} >
            <Stack direction='column' spacing={4}>
                <Typography variant='h3' component='h1'>{data.fullName}</Typography>
                <Typography variant='h5'>תז: {data.ID}</Typography>
                <Typography variant='h5'>כתובת: {data.address}</Typography>
                <Typography variant='h5'>תאריך לידה: {data.birthDate}</Typography>
                <Typography variant='h5'>טלפון: {data.phone}</Typography>
                <Typography variant='h5'>טלפון נייד: {data.mobilePhone}</Typography>
            </Stack>
        </Grid>


    )
}

export default User