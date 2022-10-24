import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { Typography, Stack, Box } from '@mui/material';

import { getCorona } from '../api/coronaApi'

import { formatDateIL } from '../help';

const Corona = () => {

    const { id } = useParams();

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
            <Typography variant='h5'>חיסוני קורונה</Typography>
            {data && data.dateAndMaker?.map((dateMake, i) =>
                <Box key={i}>
                    <Typography variant='h5'>תאריך חיסון{i + 1}: {formatDateIL(dateMake.date)}</Typography>
                    <Typography variant='h5'>שם היצרן: {dateMake.maker}</Typography>
                </Box>
            )}
            {data?.datePositiveRes && <Typography variant='h5'>תאריך קבלת תוצאה חיובית: {formatDateIL(data?.datePositiveRes)}</Typography>}
            {data?.dateRecovery && <Typography variant='h5'>תאריך החלמה: {formatDateIL(data?.dateRecovery)}</Typography>}
        </Stack>


    )
}

export default Corona
