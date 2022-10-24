import React from 'react'
import { useMutation } from 'react-query';

import { Button, Typography, TextField, Box, Stack, Alert } from '@mui/material'


import { addCorona } from '../api/coronaApi';

const CreateCorona = ({ id }) => {


    const [dateOfVaccination, setDateOfVaccination] = React.useState();
    const [maker, setMaker] = React.useState("");
    const [dateOfVaccination1, setDateOfVaccination1] = React.useState();
    const [maker1, setMaker1] = React.useState("");
    const [dateOfVaccination2, setDateOfVaccination2] = React.useState();
    const [maker2, setMaker2] = React.useState("");
    const [dateOfVaccination3, setDateOfVaccination3] = React.useState();
    const [maker3, setMaker3] = React.useState("");
    const [datePositiveRes, setDatePositiveRes] = React.useState("");
    const [dateRecovery, setDateRecovery] = React.useState("");



    const newCoronaMutation = useMutation(newCoronaObj => {
        return addCorona(newCoronaObj)
    }, {
        onSuccess: () => {
            window.location.replace('/')
        },
    })

    const getDateOfVac = () => {
        if (dateOfVaccination1 && dateOfVaccination2 && dateOfVaccination3) {
            return [

                { date: dateOfVaccination, maker: maker },
                { date: dateOfVaccination1, maker: maker1 },
                { date: dateOfVaccination2, maker: maker2 },
                { date: dateOfVaccination3, maker: maker3 }
            ]
        }
        else if (dateOfVaccination1 && dateOfVaccination2) {
            return [

                { date: dateOfVaccination, maker: maker },
                { date: dateOfVaccination1, maker: maker1 },
                { date: dateOfVaccination2, maker: maker2 },
            ]
        }
        else if (dateOfVaccination1) {
            return [

                { date: dateOfVaccination, maker: maker },
                { date: dateOfVaccination1, maker: maker1 },
            ]
        }

        else {
            return [{ date: dateOfVaccination, maker: maker }]
        }

    }
    return (
        <Box>
            <Typography>פרטי קורונה</Typography>
            <Stack spacing={2}>
                {newCoronaMutation.isSuccess && <Alert severity="success">פרטי קורונה נוספו בהצלחה!</Alert>}
                {newCoronaMutation.isError && <Alert severity="error">שגיאה בהוספת פרטי קורונה!</Alert>}
                <TextField required defaultValue={id} InputProps={{ readOnly: true, }} label="תעודת זהות" variant="outlined" />
                <Typography>חיסון ראשון</Typography>
                <TextField required placeholder="yyyy-mm-dd" value={dateOfVaccination} onChange={(e) => setDateOfVaccination(e.target.value)} label="תאריך קבלת חיסון" variant="outlined" />
                <TextField required placeholder="פייזר/מודרנה/אסטרהזניקה/נובהווקס" value={maker} onChange={(e) => setMaker(e.target.value)} label="יצרן הקורונה" variant="outlined" />
                <Typography>חיסון שני</Typography>
                <TextField placeholder="yyyy-mm-dd" value={dateOfVaccination1} onChange={(e) => setDateOfVaccination1(e.target.value)} label="תאריך קבלת חיסון" variant="outlined" />
                <TextField placeholder="פייזר/מודרנה/אסטרהזניקה/נובהווקס" value={maker1} onChange={(e) => setMaker1(e.target.value)} label="יצרן הקורונה" variant="outlined" />
                <Typography>חיסון שלישי</Typography>
                <TextField placeholder="yyyy-mm-dd" value={dateOfVaccination2} onChange={(e) => setDateOfVaccination2(e.target.value)} label="תאריך קבלת חיסון" variant="outlined" />
                <TextField placeholder="פייזר/מודרנה/אסטרהזניקה/נובהווקס" value={maker2} onChange={(e) => setMaker2(e.target.value)} label="יצרן הקורונה" variant="outlined" />
                <Typography>חיסון רביעי</Typography>
                <TextField placeholder="yyyy-mm-dd" value={dateOfVaccination3} onChange={(e) => setDateOfVaccination3(e.target.value)} label="תאריך קבלת חיסון" variant="outlined" />
                <TextField placeholder="פייזר/מודרנה/אסטרהזניקה/נובהווקס" value={maker3} onChange={(e) => setMaker3(e.target.value)} label="יצרן הקורונה" variant="outlined" />
                <TextField placeholder="yyyy-mm-dd" value={datePositiveRes} onChange={(e) => setDatePositiveRes(e.target.value)} label="תאריך קבלת תוצאה חיובית" variant="outlined" />
                <TextField placeholder="yyyy-mm-dd" value={dateRecovery} onChange={(e) => setDateRecovery(e.target.value)} label="תאריך קבלת תוצאה שלילית" variant="outlined" />
                <Button variant='contained' onClick={() => {
                    newCoronaMutation.mutate({
                        ID: id,
                        dateAndMaker: getDateOfVac(),
                        datePositiveRes: datePositiveRes,
                        dateRecovery: dateRecovery
                    })
                }}>הוספת פרטי קורונה</Button>
            </Stack>
        </Box>
    )
}

export default CreateCorona
