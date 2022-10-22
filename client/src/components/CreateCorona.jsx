import React from 'react'
import { useMutation } from 'react-query';

import { Button, Typography, TextField, Box, Stack, Alert } from '@mui/material'

import { addCorona } from '../api/coronaApi';

const CreateCorona = () => {

    const [ID, setID] = React.useState("");
    const [dateOfVaccination, setDateOfVaccination] = React.useState("");
    const [maker, setMaker] = React.useState("");
    const [datePositiveRes, setDatePositiveRes] = React.useState("");

    const newCoronaMutation = useMutation(newCoronaObj => {
        return addCorona(newCoronaObj)
    })

    return (
        <Box>
            <Typography>פרטי קורונה</Typography>
            <Stack spacing={2}>
                {newCoronaMutation.isSuccess && <Alert severity="success">פרטי קורונה נוספו בהצלחה!</Alert>}
                {newCoronaMutation.isError && <Alert severity="error">שגיאה בהוספת פרטי קורונה!</Alert>}
                <TextField required value={ID} onChange={(e) => setID(e.target.value)} label="תעודת זהות" variant="outlined" />
                <TextField placeholder="yyyy-mm-dd" value={dateOfVaccination} onChange={(e) => setDateOfVaccination(e.target.value)} label="תאריך קבלת חיסון" variant="outlined" />
                <TextField placeholder="פייזר/מודרנה/אסטרהזניקה/נובהווקס" value={maker} onChange={(e) => setMaker(e.target.value)} label="יצרן הקורונה" variant="outlined" />
                <TextField placeholder="yyyy-mm-dd" value={datePositiveRes} onChange={(e) => setDatePositiveRes(e.target.value)} label="תאריך קבלת תוצאה חיובית" variant="outlined" />
                <Button variant='contained' onClick={() => {
                    newCoronaMutation.mutate({
                        ID,
                        dateAndMaker: [{ date: dateOfVaccination, maker: maker }],
                        datePositiveRes
                    })
                }}>הוספת פרטי קורונה</Button>
            </Stack>
        </Box>
    )
}

export default CreateCorona
