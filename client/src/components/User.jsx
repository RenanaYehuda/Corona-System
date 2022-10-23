import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useQuery } from 'react-query';


import { Typography, Stack, Grid, Alert, TextField, Button, Box, DialogActions, Dialog, DialogContent } from '@mui/material';

import { getUser, updateUser } from '../api/usersApi';


const User = () => {

    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [updateUserObj, setUpdateUserObj] = React.useState({});



    const { id } = useParams();

    const { data, status, refetch } = useQuery("user", () => getUser(id));

    const handleCloseUpdate = () => {
        setOpenUpdate(false);
    };

    const updateMutation = useMutation(updateObj => {
        console.log(updateObj.image)
        return updateUser(updateObj)
    }, {
        onSuccess: () => {
            refetch()
            setOpenUpdate(false)
        },
    })

    let navigate = useNavigate();


    if (status === 'error') {
        return <div>שגיאה</div>
    }

    if (status === 'loading') {
        return <div>נטען</div>
    }

    return (
        <Box>
            <Dialog open={openUpdate} onClose={handleCloseUpdate}>
                <div style={{ textAlign: 'center', AlignItems: 'center' }}>
                    <Typography>עדכון</Typography>
                </div>
                <DialogContent>
                    {updateMutation.isSuccess && <Alert severity="success">משתמש עודכן בהצלחה!</Alert>}
                    {updateMutation.isError && <Alert severity="error">שגיאה בעדכון משתמש!</Alert>}
                    <TextField value={updateUserObj.fullName} autoFocus margin="dense" id="nameUser" label="שם פרטי ומשפחה" type="string" fullWidth
                        variant="standard" onChange={(e) => setUpdateUserObj({ ...updateUserObj, fullName: e.target.value })} />
                    <TextField value={updateUserObj.address} autoFocus margin="dense" id="nameUser" label="כתובת" type="string" fullWidth
                        variant="standard" onChange={(e) => setUpdateUserObj({ ...updateUserObj, address: e.target.value })} />
                    <TextField value={updateUserObj.phone} autoFocus margin="dense" id="nameUser" label="טלפון" type="string" fullWidth
                        variant="standard" onChange={(e) => setUpdateUserObj({ ...updateUserObj, Phone: e.target.value })} />
                    <TextField value={updateUserObj.mobilePhone} autoFocus margin="dense" id="nameUser" label="טלפון נייד" type="string" fullWidth
                        variant="standard" onChange={(e) => setUpdateUserObj({ ...updateUserObj, mobilePhone: e.target.value })} />
                    <input type="file" onChange={(e) => setUpdateUserObj({ ...updateUserObj, image: URL.createObjectURL(e.target.files[0]) })} />

                </DialogContent>
                <DialogActions>
                    <Button variant='contained' size='medium' fullWidth onClick={() => {
                        updateMutation.mutate(updateUserObj)
                    }}>עדכון</Button>
                </DialogActions>
            </Dialog>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    <Stack direction='column' spacing={1}>
                        <Typography variant='h3' component='h1'>{data.fullName}</Typography>
                        <Typography variant='h5'>תז: {data.ID}</Typography>
                        <Typography variant='h5'>כתובת: {data.address}</Typography>
                        <Typography variant='h5'>תאריך לידה: {data.birthDate}</Typography>
                        <Typography variant='h5'>טלפון: {data.phone}</Typography>
                        <Typography variant='h5'>טלפון נייד: {data.mobilePhone}</Typography>

                        <Button onClick={() => navigate(`/corona/${data.ID}`)}>פרטי קורונה</Button>
                        <Button onClick={() => {
                            setUpdateUserObj(data)
                            setOpenUpdate(true)
                        }}>עדכון פרטים אישיים</Button>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img width={300} alt="פרופיל" src={data.image} />
                </Grid>
            </Grid>
        </Box>


    )
}

export default User