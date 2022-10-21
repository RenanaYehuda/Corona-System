import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';


import { Typography, Stack, Grid, Alert, TextField, Button, Box } from '@mui/material';

import { getUser, updateUser } from '../api/usersApi';
import { getCorona } from '../api/coronaApi'
const Corona = ({ id }) => {

    const { data, status, refetch } = useQuery("corona", () => getCorona(id));
    if (status === 'error') {
        return <div>שגיאה</div>
    }

    if (status === 'loading') {
        return <div>נטען</div>
    }
    if (status === 'success') {
        refetch()
    }
    return (

        <Stack direction='column' spacing={1}>
            <Typography variant='h4'>נתוני קורונה</Typography>
            <Typography variant='h4'>חיסוני קורונה</Typography>
            {data && data.dateAndMaker?.map((dateMake, i) =>
                <Box key={i}>
                    <Typography variant='h5'>תאריך חיסון: {dateMake.date}</Typography>
                    <Typography variant='h5'>שם היצרן: {dateMake.maker}</Typography>
                </Box>
            )}
            <Typography variant='h5'>תאריך קבלת תוצאה חיובית: {data?.datePositiveRes}</Typography>
            <Typography variant='h5'>תאריך החלמה: {data?.dateRecovery}</Typography>
        </Stack>


    )
}

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
        <Grid container rowSpacing={1}>
            <Grid item xs={12} md={6}>
                <Stack direction='column' spacing={1}>
                    <Typography variant='h3' component='h1'>{data.fullName}</Typography>
                    <Typography variant='h5'>תז: {data.ID}</Typography>
                    <Typography variant='h5'>כתובת: {data.address}</Typography>
                    <Typography variant='h5'>תאריך לידה: {data.birthDate}</Typography>
                    <Typography variant='h5'>טלפון: {data.phone}</Typography>
                    <Typography variant='h5'>טלפון נייד: {data.mobilePhone}</Typography>
                </Stack>

            </Grid>
            <Grid item xs={12} md={6}>
                <Corona id={data.ID} />
            </Grid>
        </Grid>


    )
}

export default User