import React from 'react'
import { useQuery } from 'react-query';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Typography, ButtonGroup, Button, Grid, TableRow, TableCell, Box, TableHead, Table, TableBody, TableContainer, Paper, IconButton, Alert, TextField, DialogActions, Dialog, DialogContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'

import { getUsers, deleteUser, updateUser } from '../api/usersApi';

function createData(fullName, ID, address, birthDate, phone, mobilePhone) {
    return { fullName, ID, address, birthDate, phone, mobilePhone };
}

const Home = () => {

    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [updateUserObj, setUpdateUserObj] = React.useState({});


    const { data, status, refetch } = useQuery("allUsers", () => getUsers());

    const handleClickOpenUpdate = () => {
        setOpenUpdate(true);
    };

    const handleCloseUpdate = () => {
        setOpenUpdate(false);
    };

    const deleteUserMutation = useMutation(obj => {
        return deleteUser(obj)
    }, {
        onSuccess: () => {
            refetch()
        },
    })

    let navigate = useNavigate();

    const updateMutation = useMutation(updateObj => {
        return updateUser(updateObj)
    }, {
        onSuccess: () => {
            refetch()
            setOpenUpdate(false)
        },
    })


    if (status === 'error') {
        return <div>שגיאה</div>
    }

    if (status === 'loading') {
        return <div>נטען</div>
    }



    return (
        <Box>
            <Typography variant="h1" component="h2">
                מערכת קורונה
            </Typography>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={() => navigate(`/create-user`)}>הוספת חבר</Button>
            </ButtonGroup>

            <Dialog open={openUpdate} onClose={handleCloseUpdate}>
                <div style={{ textAlign: 'center', AlignItems: 'center' }}>
                    <Typography>עדכון</Typography>
                </div>
                <DialogContent>
                    {updateMutation.isSuccess && <Alert severity="success">משתמש עודכן בהצלחה!</Alert>}
                    {updateMutation.isError && <Alert severity="error">שגיאה בעדכון משתמש!</Alert>}
                    <TextField value={updateUserObj.fullName} autoFocus margin="dense" id="nameUser" label="שם פרטי ומשפחה" type="string" fullWidth
                        variant="standard" onChange={(e) => setUpdateUserObj({ ...updateUserObj, fullName: e.target.value })} />
                    <TextField value={updateUserObj.ID} autoFocus margin="dense" id="nameUser" label="תעודת זהות" type="string" fullWidth
                        variant="standard" onChange={(e) => setUpdateUserObj({ ...updateUserObj, ID: e.target.value })} />
                    <TextField value={updateUserObj.address} autoFocus margin="dense" id="nameUser" label="כתובת" type="string" fullWidth
                        variant="standard" onChange={(e) => setUpdateUserObj({ ...updateUserObj, address: e.target.value })} />
                    <TextField value={updateUserObj.birthDate} autoFocus margin="dense" id="nameUser" label="תאריך לידה" type="string" fullWidth
                        variant="standard" onChange={(e) => setUpdateUserObj({ ...updateUserObj, birthDate: e.target.value })} />
                    <TextField value={updateUserObj.phone} autoFocus margin="dense" id="nameUser" label="טלפון" type="string" fullWidth
                        variant="standard" onChange={(e) => setUpdateUserObj({ ...updateUserObj, Phone: e.target.value })} />
                    <TextField value={updateUserObj.mobilePhone} autoFocus margin="dense" id="nameUser" label="טלפון נייד" type="string" fullWidth
                        variant="standard" onChange={(e) => setUpdateUserObj({ ...updateUserObj, mobilePhone: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' size='medium' fullWidth onClick={() => {
                        updateMutation.mutate(updateUserObj)
                    }}>עדכון</Button>
                </DialogActions>
            </Dialog>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">שם חבר</TableCell>
                            <TableCell align="left">מחיקת חבר</TableCell>
                            <TableCell align="left">עדכון חבר</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((user, i) =>
                            <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">
                                    <Button onClick={() => navigate(`/user/${user._id}`)}>
                                        {user.fullName}
                                    </Button>
                                </TableCell >
                                <TableCell align="left"><IconButton onClick={() => {
                                    deleteUserMutation.mutate(user._id)
                                }} ><DeleteIcon size='small' /></IconButton></TableCell>
                                <TableCell align="left"><Button align="left" variant='text' onClick={() => {
                                    setUpdateUserObj(user)
                                    setOpenUpdate(true)
                                }}>עדכן</Button></TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </TableContainer>


        </Box>
    )
}

export default Home