import React from 'react'
import { useMutation } from 'react-query';

import { Button, Typography, TextField, Box, Stack, Alert, Dialog } from '@mui/material'

import { addUser } from '../api/usersApi';
import CreateCorona from './CreateCorona';

const CreateUser = () => {

    const [openCorona, setOpenCorona] = React.useState(false);

    const [fullName, setFullName] = React.useState("");
    const [ID, setID] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [birthDate, setBirthDate] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [mobilePhone, setMobilePhone] = React.useState("");

    const handleCloseUpdate = () => {
        setOpenCorona(false);
    };

    const newUserMutation = useMutation(newUserObj => {
        return addUser(newUserObj)
    }, {
        onSuccess: () => {
            setOpenCorona(true)
        },
    })

    return (
        <Box>
            <Dialog open={openCorona} onClose={handleCloseUpdate} fullWidth>
                <CreateCorona id={ID} />
            </Dialog>
            <Typography>משתמש חדש</Typography>
            <Stack spacing={2}>
                {newUserMutation.isSuccess && <Alert severity="success">משתמש נוסף בהצלחה!</Alert>}
                {newUserMutation.isError && <Alert severity="error">שגיאה בהוספת משתמש!</Alert>}
                <TextField required value={fullName} onChange={(e) => setFullName(e.target.value)} label="שם פרטי ומשפחה" variant="outlined" />
                <TextField required value={ID} onChange={(e) => setID(e.target.value)} label="תעודת זהות" variant="outlined" />
                <TextField required value={address} onChange={(e) => setAddress(e.target.value)} label="כתובת" variant="outlined" />
                <TextField required placeholder="yyyy-mm-dd" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} label="תאריך לידה" variant="outlined" />
                <TextField required value={phone} onChange={(e) => setPhone(e.target.value)} label="טלפון" variant="outlined" />
                <TextField required value={mobilePhone} onChange={(e) => setMobilePhone(e.target.value)} label="טלפון נייד" variant="outlined" />
                <Button variant='contained' fullWidth onClick={() => {
                    newUserMutation.mutate({
                        fullName,
                        ID,
                        address,
                        birthDate,
                        phone,
                        mobilePhone
                    })

                }}>הוספת משתמש</Button>
            </Stack>
        </Box>
    )
}

export default CreateUser